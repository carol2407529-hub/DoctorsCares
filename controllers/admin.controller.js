const express = require('express');
const { getAdminDashboardData } = require('../controllers/services/adminDataService');
const { getAdminContentData } = require('../controllers/services/contentService');
const { getAdminViewLocals } = require('../controllers/utils/adminViewHelpers');
const { promoteUserToDoctor, revertDoctorToPatient } = require('../controllers/services/userRoleService');
const {
    User,
    Doctor,
    Appointment,
    Payment,
    Specialty,
    City,
    Announcement,
    SystemSetting,
    SitePage,
    ServiceItem,
    BlogPost,
    Testimonial,
    ContactMessage,
} = require('../models');
const { redirectAdmin } = require('../controllers/utils/adminRedirect');

const promoteToDoctor=async (req, res) => {
    try {
        await promoteUserToDoctor(req.params.userId, {
            specialty: req.body.specialty,
            title: req.body.title,
        });
        return redirectAdmin(req, res, 'User approved as doctor', false, '/admin/patients');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const revertToPatient =async (req, res) => {
    try {
        await revertDoctorToPatient(req.params.userId);
        return redirectAdmin(req, res, 'User role set back to patient', false, '/admin/patients');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const ban= async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.userId, { isActive: false });
        return redirectAdmin(req, res, 'User account deactivated', false, '/admin/patients');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const activate = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.userId, { isActive: true });
        return redirectAdmin(req, res, 'User account reactivated', false, '/admin/patients');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const verify = async (req, res) => {
    try {
        await Doctor.findOneAndUpdate(
            { user: req.params.userId },
            { verified: true, suspended: false }
        );
        return redirectAdmin(req, res, 'Doctor verified and activated', false, '/admin/doctors');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const reject = async (req, res) => {
    try {
        await Doctor.findOneAndUpdate(
            { user: req.params.userId },
            { suspended: true, suspendReason: req.body.reason || 'Registration rejected' }
        );
        return redirectAdmin(req, res, 'Doctor registration rejected', false, '/admin/doctors');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const suspend = async (req, res) => {
    try {
        await Doctor.findOneAndUpdate(
            { user: req.params.userId },
            { suspended: true, suspendReason: req.body.reason || 'Suspended by admin' }
        );
        return redirectAdmin(req, res, 'Doctor suspended', false, '/admin/doctors');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const reinstate=async (req, res) => {
    try {
        await Doctor.findOneAndUpdate(
            { user: req.params.userId },
            { suspended: false, suspendReason: '', verified: true }
        );
        return redirectAdmin(req, res, 'Doctor reinstated', false, '/admin/doctors');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const toggleFeatured =async (req, res) => {
    try {
        const doc = await Doctor.findOne({ user: req.params.userId });
        if (!doc) throw new Error('Doctor not found');
        doc.featured = !doc.featured;
        await doc.save();
        return redirectAdmin(req, res, doc.featured ? 'Doctor featured' : 'Doctor unfeatured', false, '/admin/categories');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const cancel = async (req, res) => {
    try {
        await Appointment.findByIdAndUpdate(req.params.id, {
            status: 'cancelled',
            cancelReason: req.body.reason || 'Cancelled by admin',
        });
        return redirectAdmin(req, res, 'Appointment cancelled', false, '/admin/appointments');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const approveRefund = async (req, res) => {
    try {
        await Payment.findByIdAndUpdate(req.params.id, { status: 'success' });
        return redirectAdmin(req, res, 'Refund approved', false, '/admin/payments');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const denyRefund = async (req, res) => {
    try {
        await Payment.findByIdAndUpdate(req.params.id, { status: 'denied' });
        return redirectAdmin(req, res, 'Refund denied', false, '/admin/payments');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const specialties = async (req, res) => {
    try {
        const name = req.body.name?.trim();
        if (!name) throw new Error('Specialty name required');
        await Specialty.create({
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
        });
        return redirectAdmin(req, res, 'Specialty added', false, '/admin/categories');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const del_sp = async (req, res) => {
    try {
        await Specialty.findByIdAndDelete(req.params.id);
        return redirectAdmin(req, res, 'Specialty removed', false, '/admin/categories');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const cities = async (req, res) => {
    try {
        const name = req.body.name?.trim();
        if (!name) throw new Error('City name required');
        await City.create({ name, slug: name.toLowerCase().replace(/\s+/g, '-') });
        return redirectAdmin(req, res, 'City added', false, '/admin/categories');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const del_ct = async (req, res) => {
    try {
        await City.findByIdAndDelete(req.params.id);
        return redirectAdmin(req, res, 'City removed', false, '/admin/categories');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const announcements = async (req, res) => {
    try {
        const { title, body, audience, channel } = req.body;
        if (!title || !body) throw new Error('Title and message required');
        await Announcement.create({
            title,
            body,
            audience: audience || 'all',
            channel: channel || 'in-app',
            status: 'sent',
            sentBy: req.session.user.id,
        });
        return redirectAdmin(req, res, 'Announcement sent', false, '/admin/notifications');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

function parseAboutFeatures(body) {
    const features = [];
    const titles = Array.isArray(body.featureTitle) ? body.featureTitle : body.featureTitle ? [body.featureTitle] : [];
    const descs = Array.isArray(body.featureDesc) ? body.featureDesc : body.featureDesc ? [body.featureDesc] : [];
    for (let i = 0; i < titles.length; i++) {
        const title = String(titles[i] || '').trim();
        if (!title) continue;
        features.push({
            title,
            description: String(descs[i] || '').trim(),
        });
    }
    return features;
}

async function upsertSitePage(slug, fields) {
    await SitePage.findOneAndUpdate({ slug }, { slug, ...fields }, { upsert: true, new: true });
}

const about = async (req, res) => {
    try {
        await upsertSitePage('about', {
            sectionLabel: req.body.sectionLabel?.trim(),
            heading: req.body.heading?.trim(),
            headingHighlight: req.body.headingHighlight?.trim(),
            description: req.body.description?.trim(),
            imageUrl: req.body.imageUrl?.trim(),
            imageBadge: req.body.imageBadge?.trim(),
            statValue: req.body.statValue?.trim(),
            statLabel: req.body.statLabel?.trim(),
            ctaText: req.body.ctaText?.trim(),
            ctaLink: req.body.ctaLink?.trim() || '/doctors',
            features: parseAboutFeatures(req.body),
        });
        return redirectAdmin(req, res, 'About page saved', false, '/admin/content/about');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/about');
    }
};

const services_h = async (req, res) => {
    try {
        await upsertSitePage('services', {
            sectionLabel: req.body.sectionLabel?.trim(),
            heading: req.body.heading?.trim(),
            headingHighlight: req.body.headingHighlight?.trim(),
            description: req.body.description?.trim(),
        });
        return redirectAdmin(req, res, 'Services page header saved', false, '/admin/content/services');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/services');
    }
};

const services = async (req, res) => {
    try {
        const title = req.body.title?.trim();
        if (!title) throw new Error('Service title required');
        await ServiceItem.create({
            title,
            description: req.body.description?.trim(),
            icon: req.body.icon?.trim() || 'stethoscope',
            link: req.body.link?.trim() || '#',
            sortOrder: Number(req.body.sortOrder) || 0,
            isActive: req.body.isActive !== 'off',
        });
        return redirectAdmin(req, res, 'Service added', false, '/admin/content/services');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/services');
    }
};

const services_one = async (req, res) => {
    try {
        const title = req.body.title?.trim();
        if (!title) throw new Error('Service title required');
        await ServiceItem.findByIdAndUpdate(req.params.id, {
            title,
            description: req.body.description?.trim(),
            icon: req.body.icon?.trim() || 'stethoscope',
            link: req.body.link?.trim() || '#',
            sortOrder: Number(req.body.sortOrder) || 0,
            isActive: req.body.isActive === 'on' || req.body.isActive === 'true',
        });
        return redirectAdmin(req, res, 'Service updated', false, '/admin/content/services');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/services');
    }
};

const services_del = async (req, res) => {
    try {
        await ServiceItem.findByIdAndDelete(req.params.id);
        return redirectAdmin(req, res, 'Service removed', false, '/admin/content/services');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/services');
    }
};

const blogs_h = async (req, res) => {
    try {
        await upsertSitePage('blogs', {
            sectionLabel: req.body.sectionLabel?.trim(),
            heading: req.body.heading?.trim(),
            headingHighlight: req.body.headingHighlight?.trim(),
            description: req.body.description?.trim(),
        });
        return redirectAdmin(req, res, 'Blog page header saved', false, '/admin/content/blogs');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/blogs');
    }
};

const blogs = async (req, res) => {
    try {
        const title = req.body.title?.trim();
        if (!title) throw new Error('Blog title required');
        await BlogPost.create({
            title,
            excerpt: req.body.excerpt?.trim(),
            imageUrl: req.body.imageUrl?.trim(),
            tag: req.body.tag?.trim() || 'Health',
            link: req.body.link?.trim() || '#',
            publishedAt: req.body.publishedAt ? new Date(req.body.publishedAt) : new Date(),
            featured: req.body.featured === 'on',
            sortOrder: Number(req.body.sortOrder) || 0,
            isPublished: req.body.isPublished !== 'off',
        });
        return redirectAdmin(req, res, 'Blog post added', false, '/admin/content/blogs');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/blogs');
    }
};

const blogs_one = async (req, res) => {
    try {
        const title = req.body.title?.trim();
        if (!title) throw new Error('Blog title required');
        await BlogPost.findByIdAndUpdate(req.params.id, {
            title,
            excerpt: req.body.excerpt?.trim(),
            imageUrl: req.body.imageUrl?.trim(),
            tag: req.body.tag?.trim() || 'Health',
            link: req.body.link?.trim() || '#',
            publishedAt: req.body.publishedAt ? new Date(req.body.publishedAt) : new Date(),
            featured: req.body.featured === 'on' || req.body.featured === 'true',
            sortOrder: Number(req.body.sortOrder) || 0,
            isPublished: req.body.isPublished === 'on' || req.body.isPublished === 'true',
        });
        return redirectAdmin(req, res, 'Blog post updated', false, '/admin/content/blogs');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/blogs');
    }
};

const blogs_del= async (req, res) => {
    try {
        await BlogPost.findByIdAndDelete(req.params.id);
        return redirectAdmin(req, res, 'Blog post removed', false, '/admin/content/blogs');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/blogs');
    }
};

function parseHeroCards(body) {
    const icons = Array.isArray(body.heroCardIcon) ? body.heroCardIcon : body.heroCardIcon ? [body.heroCardIcon] : [];
    const titles = Array.isArray(body.heroCardTitle) ? body.heroCardTitle : body.heroCardTitle ? [body.heroCardTitle] : [];
    const subs = Array.isArray(body.heroCardSubtitle) ? body.heroCardSubtitle : body.heroCardSubtitle ? [body.heroCardSubtitle] : [];
    const cards = [];
    for (let i = 0; i < titles.length; i++) {
        const title = String(titles[i] || '').trim();
        if (!title) continue;
        cards.push({
            icon: String(icons[i] || 'fa-check-circle').trim(),
            title,
            subtitle: String(subs[i] || '').trim(),
        });
    }
    return cards;
}

function parseStats(body) {
    const values = Array.isArray(body.statValue) ? body.statValue : body.statValue ? [body.statValue] : [];
    const labels = Array.isArray(body.statLabel) ? body.statLabel : body.statLabel ? [body.statLabel] : [];
    const stats = [];
    for (let i = 0; i < values.length; i++) {
        const value = String(values[i] || '').trim();
        const label = String(labels[i] || '').trim();
        if (!value && !label) continue;
        stats.push({ value, label });
    }
    return stats;
}

function parseSocialLinks(body) {
    const labels = Array.isArray(body.socialLabel) ? body.socialLabel : body.socialLabel ? [body.socialLabel] : [];
    const urls = Array.isArray(body.socialUrl) ? body.socialUrl : body.socialUrl ? [body.socialUrl] : [];
    const icons = Array.isArray(body.socialIcon) ? body.socialIcon : body.socialIcon ? [body.socialIcon] : [];
    const links = [];
    for (let i = 0; i < labels.length; i++) {
        const label = String(labels[i] || '').trim();
        if (!label) continue;
        links.push({
            label,
            url: String(urls[i] || '#').trim(),
            icon: String(icons[i] || 'fa-link').trim(),
        });
    }
    return links;
}

const home = async (req, res) => {
    try {
        await upsertSitePage('home', {
            sectionLabel: req.body.sectionLabel?.trim(),
            heading: req.body.heading?.trim(),
            headingHighlight: req.body.headingHighlight?.trim(),
            description: req.body.description?.trim(),
            imageUrl: req.body.imageUrl?.trim(),
            ctaText: req.body.ctaText?.trim(),
            ctaLink: req.body.ctaLink?.trim() || '/doctors',
            secondaryCtaText: req.body.secondaryCtaText?.trim(),
            secondaryCtaLink: req.body.secondaryCtaLink?.trim() || '/about',
            useLiveStats: req.body.useLiveStats === 'on',
            stats: parseStats(req.body),
            heroCards: parseHeroCards(req.body),
            testimonialsSectionLabel: req.body.testimonialsSectionLabel?.trim(),
            testimonialsHeading: req.body.testimonialsHeading?.trim(),
            testimonialsHeadingHighlight: req.body.testimonialsHeadingHighlight?.trim(),
        });
        return redirectAdmin(req, res, 'Home page saved', false, '/admin/content/home');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/home');
    }
};

const testimonial = async (req, res) => {
    try {
        const quote = req.body.quote?.trim();
        const authorName = req.body.authorName?.trim();
        if (!quote || !authorName) throw new Error('Quote and author name required');
        await Testimonial.create({
            quote,
            authorName,
            authorMeta: req.body.authorMeta?.trim(),
            authorImage: req.body.authorImage?.trim(),
            featured: req.body.featured === 'on',
            sortOrder: Number(req.body.sortOrder) || 0,
            isActive: req.body.isActive !== 'off',
        });
        return redirectAdmin(req, res, 'Testimonial added', false, '/admin/content/home');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/home');
    }
};

const testimonial_one = async (req, res) => {
    try {
        const quote = req.body.quote?.trim();
        const authorName = req.body.authorName?.trim();
        if (!quote || !authorName) throw new Error('Quote and author name required');
        await Testimonial.findByIdAndUpdate(req.params.id, {
            quote,
            authorName,
            authorMeta: req.body.authorMeta?.trim(),
            authorImage: req.body.authorImage?.trim(),
            featured: req.body.featured === 'on' || req.body.featured === 'true',
            sortOrder: Number(req.body.sortOrder) || 0,
            isActive: req.body.isActive === 'on' || req.body.isActive === 'true',
        });
        return redirectAdmin(req, res, 'Testimonial updated', false, '/admin/content/home');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/home');
    }
};

const testimonial_del = async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        return redirectAdmin(req, res, 'Testimonial removed', false, '/admin/content/home');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/home');
    }
};

const contact = async (req, res) => {
    try {
        await upsertSitePage('contact', {
            sectionLabel: req.body.sectionLabel?.trim(),
            heading: req.body.heading?.trim(),
            headingHighlight: req.body.headingHighlight?.trim(),
            description: req.body.description?.trim(),
            phone: req.body.phone?.trim(),
            email: req.body.email?.trim(),
            address: req.body.address?.trim(),
        });
        return redirectAdmin(req, res, 'Contact page saved', false, '/admin/content/contact');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/contact');
    }
};

const read = async (req, res) => {
    try {
        await ContactMessage.findByIdAndUpdate(req.params.id, { status: 'read' });
        return redirectAdmin(req, res, 'Message marked read', false, '/admin/content/contact');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/contact');
    }
};

const footer = async (req, res) => {
    try {
        await upsertSitePage('footer', {
            tagline: req.body.tagline?.trim(),
            phone: req.body.phone?.trim(),
            email: req.body.email?.trim(),
            address: req.body.address?.trim(),
            copyrightText: req.body.copyrightText?.trim(),
            privacyLink: req.body.privacyLink?.trim() || '#',
            termsLink: req.body.termsLink?.trim() || '#',
            socialLinks: parseSocialLinks(req.body),
        });
        return redirectAdmin(req, res, 'Footer saved', false, '/admin/content/footer');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true, '/admin/content/footer');
    }
};

const settings = async (req, res) => {
    try {
        const updates = [
            ['commissionPercent', Number(req.body.commissionPercent)],
            ['minBookingFee', Number(req.body.minBookingFee)],
            ['refundWindowHours', Number(req.body.refundWindowHours)],
        ];
        for (const [key, value] of updates) {
            if (!Number.isNaN(value)) {
                await SystemSetting.findOneAndUpdate({ key }, { value }, { upsert: true });
            }
        }
        return redirectAdmin(req, res, 'Settings saved', false, '/admin/settings');
    } catch (err) {
        return redirectAdmin(req, res, err.message, true);
    }
};

const ADMIN_PAGES = {
    dashboard: { title: 'Dashboard', view: 'pages/dashboard' },
    doctors: { title: 'Doctor Management', view: 'pages/doctors' },
    patients: { title: 'Patient Management', view: 'pages/patients' },
    appointments: { title: 'Appointments', view: 'pages/appointments' },
    payments: { title: 'Payments & Finance', view: 'pages/payments' },
    categories: { title: 'Categories', view: 'pages/categories' },
    reports: { title: 'Reports & Analytics', view: 'pages/reports' },
    notifications: { title: 'Notifications', view: 'pages/notifications' },
    settings: { title: 'System Settings', view: 'pages/settings' },
    'content-about': { title: 'About Page', view: 'pages/content-about' },
    'content-services': { title: 'Services Page', view: 'pages/content-services' },
    'content-blogs': { title: 'Blog Posts', view: 'pages/content-blogs' },
    'content-home': { title: 'Home Page', view: 'pages/content-home' },
    'content-contact': { title: 'Contact Page', view: 'pages/content-contact' },
    'content-footer': { title: 'Footer', view: 'pages/content-footer' },
};

const CONTENT_PAGES = new Set([
    'content-about',
    'content-services',
    'content-blogs',
    'content-home',
    'content-contact',
    'content-footer',
]);

async function renderAdminPage(req, res, pageKey) {
    const page = ADMIN_PAGES[pageKey];
    const [data, contentData] = await Promise.all([
        getAdminDashboardData(),
        CONTENT_PAGES.has(pageKey) ? getAdminContentData(pageKey) : Promise.resolve({}),
    ]);

    const viewData = {
        user: req.session.user,
        activePage: pageKey,
        pageTitle: page.title,
        contentView: page.view,
        flash: {
            success: req.query.success || null,
            error: req.query.error || null,
        },
        ...getAdminViewLocals(req.session.user),
        ...data,
        ...contentData,
    };
    viewData.s = viewData.stats || {};
    viewData.pay = viewData.payments || {};
    viewData.rep = viewData.reports || {};
    viewData.aStats = viewData.apptStats || {};

    res.render('admin/layout', viewData);
}

module.exports = {
promoteToDoctor,
revertToPatient,
ban,
activate,
verify,
reject,
suspend,
reinstate,
toggleFeatured,
cancel,
approveRefund,
denyRefund,
specialties,
del_sp,
cities,
del_ct,
announcements,
about,
services_h,
services,
services_one,
services_del,
blogs_h,
blogs,
blogs_del,
blogs_one,
home,
testimonial,
testimonial_one,
testimonial_del,
contact,
read,
footer,
settings,
renderAdminPage
};
