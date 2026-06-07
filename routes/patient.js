const express = require("express");
const { requireRole } = require("../controllers/auth/auth");
const {
  profile,
  book,
  cancel,
  fm_switch,
  fm_add,
  fm_del,
  renderPatientPage,
} = require("../controllers/patient.controller");
const multer = require("multer");
const path = require("path");
const { Patient } = require("../models");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/profile", requireRole("patient"), profile);
router.post("/appointments/book", requireRole("patient"), book);
router.post("/appointments/:id/cancel", requireRole("patient"), cancel);
router.post("/family/switch", requireRole("patient"), fm_switch);
router.post("/family/add", requireRole("patient"), fm_add);
router.post("/family/:id/delete", requireRole("patient"), fm_del);
router.get("/dashboard", requireRole("patient"), (req, res) =>
  renderPatientPage(req, res, "dashboard"),
);
router.get("/appointments", requireRole("patient"), (req, res) =>
  renderPatientPage(req, res, "appointments"),
);
router.get("/records", requireRole("patient"), (req, res) =>
  renderPatientPage(req, res, "records"),
);
router.get("/medical-history", requireRole("patient"), (req, res) => {
  if (req.query.member && req.query.member !== "self") {
    return res.redirect("/patient/medical-history");
  }
  renderPatientPage(req, res, "medical-history");
});
router.get("/family", requireRole("patient"), (req, res) =>
  renderPatientPage(req, res, "family"),
);
router.get("/doctors", requireRole("patient"), (req, res) =>
  renderPatientPage(req, res, "doctors"),
);
router.get("/notifications", requireRole("patient"), (req, res) =>
  renderPatientPage(req, res, "notifications"),
);
router.get("/profile", requireRole("patient"), (req, res) =>
  renderPatientPage(req, res, "profile"),
);
router.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
  const patientId = req.session.user.id;
  await Patient.findOneAndUpdate(
    { user: patientId },
    {
      avatar: `/uploads/avatars/${req.file.filename}`,
    },
    { upsert: true },
  );

  res.redirect("/patient/profile");
});

module.exports = router;
