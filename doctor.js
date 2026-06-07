const express = require('express');
const { requireRole } = require('../controllers/auth/auth');
const {
accept,
reject,
cancel,
reschedule,
ap_notes,
pt_notes,
schedule,
sch_block,
block_del,
profile,
history,
condition,
renderDoctorPage
} = require('../controllers/doctor.controller');
const multer = require("multer");
const path = require("path");
const { Doctor } = require("../models")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/avatars");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });


const router = express.Router();

router.post('/appointments/:id/accept', requireRole('doctor'), accept);
router.post('/appointments/:id/reject', requireRole('doctor'), reject);
router.post('/appointments/:id/cancel', requireRole('doctor'), cancel);
router.post('/appointments/:id/reschedule', requireRole('doctor'),reschedule);
router.post('/appointments/:id/notes', requireRole('doctor'), ap_notes);
router.post('/patients/:patientId/notes', requireRole('doctor'), pt_notes);
router.post('/schedule', requireRole('doctor'), schedule);
router.post('/schedule/block', requireRole('doctor'), sch_block);
router.post('/schedule/block/:index/delete', requireRole('doctor'), block_del);
router.post('/profile', requireRole('doctor'), profile);
router.post('/patients/:patientId/history', requireRole('doctor'), history);
router.post('/patients/:patientId/condition', requireRole('doctor'), condition);
router.get('/dashboard', requireRole('doctor'), (req, res) => renderDoctorPage(req, res, 'dashboard'));
router.get('/appointments', requireRole('doctor'), (req, res) => renderDoctorPage(req, res, 'appointments'));
router.get('/schedule', requireRole('doctor'), (req, res) => renderDoctorPage(req, res, 'schedule'));
router.get('/patients', requireRole('doctor'), (req, res) => renderDoctorPage(req, res, 'patients'));
router.get('/earnings', requireRole('doctor'), (req, res) => renderDoctorPage(req, res, 'earnings'));
router.get('/notifications', requireRole('doctor'), (req, res) => renderDoctorPage(req, res, 'notifications'));
router.get('/profile', requireRole('doctor'), (req, res) => renderDoctorPage(req, res, 'profile'));
router.post(
    "/upload-avatar",
    upload.single("avatar"),
    async (req, res) => {

          const doctortId = req.session.user.id;
          await Doctor.findOneAndUpdate(
            { user: doctortId },
            {
              avatar: `/uploads/avatars/${req.file.filename}`,
            },
            { upsert: true },
          );

        res.redirect("/doctor/profile");
    }
);

router.get('/doctor-dashboard', requireRole('doctor'), (req, res) => {
    const section = req.query.section || 'overview';
    const map = {
        overview: '/doctor/dashboard',
        appointments: '/doctor/appointments',
        schedule: '/doctor/schedule',
        patients: '/doctor/patients',
        earnings: '/doctor/earnings',
        notifications: '/doctor/notifications',
        profile: '/doctor/profile',
    };
    const target = map[section] || '/doctor/dashboard';
    const q = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    const params = new URLSearchParams(q);
    params.delete('section');
    const rest = params.toString();
    res.redirect(rest ? `${target}?${rest}` : target);
});

module.exports = router;
