require('dotenv').config();
const path = require('path');
const express = require('express');
const logger = require('morgan');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const { createSessionMiddleware } = require('./controllers/config/session');
const { attachUserToLocals } = require('./controllers/auth/auth');
const attachSiteGlobals = require('./controllers/middleware/siteGlobals');
const seedDemoUsers = require('./controllers/seed/seedUsers');
const seedPlatformData = require('./controllers/seed/seedPlatformData');
const seedSiteContent = require('./controllers/seed/seedSiteContent');
const seedDoctorData = require('./controllers/seed/seedDoctorData');
const seedPatientData = require('./controllers/seed/seedPatientData');

mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('MongoDB connected');
        await seedDemoUsers({ verbose: false });
        await seedPlatformData();
        await seedSiteContent();
        await seedDoctorData();
        await seedPatientData();
    })
    .catch((err) => console.error('MongoDB connection error:', err));

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/favicon.ico', (req, res) => {
    res.type('image/svg+xml');
    res.sendFile(path.join(__dirname, 'public', 'favicon.svg'));
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(createSessionMiddleware());

app.use(attachUserToLocals);
app.use(attachSiteGlobals);
app.use(logger("dev"));

app.use(expressLayout);
app.set('layout', false);
app.set('view engine', 'ejs');

app.use('/auth', require('./routes/auth'));
app.use('/doctor', require('./routes/doctor'));
app.use('/patient', require('./routes/patient'));
app.use('/', require('./routes/dashboards'));
app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/contact'));
app.use('/', require('./routes/main'));
app.use('/', require('./routes/errors'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log(`Server running at: http://localhost:${PORT}`);
});
