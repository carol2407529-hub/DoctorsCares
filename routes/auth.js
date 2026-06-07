const express = require("express");
const { redirectIfAuthenticated } = require("../controllers/auth/auth");
const {
  registerUser,
  loginUser,
  dashboardPathForRole,
} = require("../controllers/services/authService");
const { promoteUserToDoctor } = require('../controllers/services/userRoleService');
const { safeRedirectPath } = require("../controllers/utils/safeRedirect");
const { setSessionUser } = require("../controllers/config/session");
const { User } = require("../models");

const router = express.Router();

function renderLogin(
  res,
  { error = null, signupError = null, values = {}, mode = "login", next = "" },
) {
  return res.render("login", { error, signupError, values, mode, next });
}

router.get("/login", redirectIfAuthenticated, (req, res) => {
  renderLogin(res, { values: {}, next: req.query.next || "" });
});

router.post("/login", async (req, res) => {
  const { email, password, next } = req.body;
  const values = { email };
  const nextPath = next || "";

  if (!email || !password) {
    return renderLogin(res, {
      error: "Please enter your email and password.",
      values,
      next: nextPath,
    });
  }

  try {
    const { session: userSession } = await loginUser({ email, password });
    await setSessionUser(req, userSession);
    const destination =
      safeRedirectPath(nextPath, userSession.role) ||
      dashboardPathForRole(userSession.role);
    return res.redirect(destination);
  } catch (err) {
    return renderLogin(res, {
      error: err.message || "Login failed.",
      values,
      next: nextPath,
    });
  }
});

// const validation = [
//   body("username").notEmpty().withMessage("Username is required"),
//   body("email").isEmail().withMessage("Invalid email"),
//   body("password")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters")
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]+$/
//     )
//     .withMessage(
//       "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
//     ),
//   body("confirmPassword")
//     .custom((value, { req }) => value === req.body.password)
//     .withMessage("Passwords do not match"),
// ];

// const signup = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     res.render("pages/register", {
//       title: "Signup page - Validation Failed",
//       errors: errors.array(),
//     });
//     return;
//   }
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password,saltRounds);
//     const existingUser = await User.findOne({ username: req.body.username });
//     const existingemail = await User.findOne({ email: req.body.email });

//     if (existingemail) {
//       console.log("Email already exists");
//       res.send("Email already exists");
//     }else if(existingUser){
//       console.log("username already exists");
//       res.send("username already exists");
//     } else {
//       const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: hashedPassword,
//         type:req.body.type,
//         photo:"profile.jpg",
//       });

//       await newUser.save().then(result =>{
//         req.session.user=result;

//       })

//       console.log("User saved successfully");
//       res.redirect('/');
//     }
//   } catch (error) {
//     console.log(error);
//     res.send("An error occurred");
//   }
// };

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const {
    fullName,
    email,
    password,
    phone,
    gender,
    dateOfBirth,
    confirmPassword,
    accountType,
    specialty,
    title,
  } = req.body;

  const values = {
    fullName,
    email,
    phone,
    gender,
    dateOfBirth,
    accountType,
    specialty,
    title,
  };

  if (!fullName || !email || !password || !gender || !dateOfBirth || !phone) {
    return renderLogin(res, {
      signupError: "Please fill in all required fields.",
      values,
      mode: "signup",
    });
  }
  // Full name: letters and spaces only
  if (!/^[A-Za-z\s]+$/.test(fullName.trim())) {
    return renderLogin(res, {
      signupError: "Name must contain letters only.",
      values,
      mode: "signup",
    });
  }

  // Date of birth: age must be at least 8 years old
  const dob = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age < 8) {
    return renderLogin(res, {
      signupError: "You must be at least 8 years old.",
      values,
      mode: "signup",
    });
  }

  // Egyptian phone number: 11 digits and starts with 01
  if (!/^01\d{9}$/.test(phone)) {
    return renderLogin(res, {
      signupError: "Phone number must be 11 digits and start with 01.",
      values,
      mode: "signup",
    });
  }

  if (password.length < 6) {
    return renderLogin(res, {
      signupError: "Password must be at least 6 characters.",
      values,
      mode: "signup",
    });
  }

  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password)
  ) {
    return renderLogin(res, {
      signupError:
        "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character",
      values,
      mode: "signup",
    });
  }
  if (password !== confirmPassword) {
    return renderLogin(res, {
      signupError: "confirm password does not match",
      values,
      mode: "signup",
    });
  }

  if (accountType === "doctor") {
    if (!specialty || !title) {
      return renderLogin(res, {
        signupError: "Professional title and specialty are required.",
        values,
        mode: "signup",
      });
    }
  }

  try {
    const user = await registerUser({
      fullName,
      email,
      password,
      role: "patient",
      phone,
      gender,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
    });

    if (accountType === "doctor") {
      await promoteUserToDoctor(user._id, {
        specialty,
        title,
      });
    }

    const { session: userSession } = await loginUser({
      email: user.email,
      password,
    });

    await setSessionUser(req, userSession);

    return res.redirect(dashboardPathForRole(user.role));
  } catch (err) {
    return renderLogin(res, {
      signupError: err.message || "Registration failed.",
      values,
      mode: "signup",
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

router.get("/check-email", async (req, res) => {
  const user = await User.findOne({ email: req.query.email });

  res.json({
    available: user,
  });
});

module.exports = router;
