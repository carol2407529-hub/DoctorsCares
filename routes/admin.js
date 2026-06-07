const express = require('express');
const { requireRole } = require('../controllers/auth/auth');
const { promoteToDoctor , 
  revertToPatient ,
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
} =require('../controllers/admin.controller');

const router = express.Router();

router.post('/users/promote-doctor/:userId', requireRole('admin'),promoteToDoctor);
router.post('/users/:userId/revert-patient', requireRole('admin'), revertToPatient);
router.post('/users/:userId/ban', requireRole('admin'), ban);
router.post('/users/:userId/activate', requireRole('admin'), activate);
router.post('/doctors/:userId/verify', requireRole('admin'), verify);
router.post('/doctors/:userId/reject', requireRole('admin'), reject);
router.post('/doctors/:userId/suspend', requireRole('admin'), suspend);
router.post('/doctors/:userId/reinstate', requireRole('admin'), reinstate);
router.post('/doctors/:userId/toggle-featured', requireRole('admin'), toggleFeatured);
router.post('/appointments/:id/cancel', requireRole('admin'), cancel);
router.post('/payments/:id/approve-refund', requireRole('admin'), approveRefund);
router.post('/payments/:id/deny-refund', requireRole('admin'), denyRefund);
router.post('/specialties', requireRole('admin'), specialties);
router.post('/specialties/:id/delete', requireRole('admin'), del_sp);
router.post('/cities', requireRole('admin'), cities);
router.post('/cities/:id/delete', requireRole('admin'), del_ct);
router.post('/announcements', requireRole('admin'), announcements);
router.post('/content/about', requireRole('admin'), about);
router.post('/content/services-header', requireRole('admin'), services_h);
router.post('/services', requireRole('admin'), services);
router.post('/services/:id', requireRole('admin'), services_one);
router.post('/services/:id/delete',requireRole('admin'), services_del);
router.post('/content/blogs-header', requireRole('admin'), blogs_h);
router.post('/blogs', requireRole('admin'), blogs);
router.post('/blogs/:id', requireRole('admin'), blogs_one);
router.post('/blogs/:id/delete', requireRole('admin'), blogs_del);
router.post('/content/home', requireRole('admin'), home);
router.post('/testimonials', requireRole('admin'), testimonial);
router.post('/testimonials/:id', requireRole('admin'), testimonial_one);
router.post('/testimonials/:id/delete', requireRole('admin'), testimonial_del);
router.post('/content/contact', requireRole('admin'), contact);
router.post('/contact-messages/:id/read', requireRole('admin'), read);
router.post('/content/footer', requireRole('admin'), footer);
router.post('/settings', requireRole('admin'), settings);
router.get('/dashboard', requireRole('admin'), (req, res) => renderAdminPage(req, res, 'dashboard'));
router.get('/doctors', requireRole('admin'), (req, res) => renderAdminPage(req, res, 'doctors'));
router.get('/patients', requireRole('admin'), (req, res) => renderAdminPage(req, res, 'patients'));
router.get('/appointments', requireRole('admin'), (req, res) => renderAdminPage(req, res, 'appointments'));
router.get('/payments', requireRole('admin'), (req, res) => renderAdminPage(req, res, 'payments'));
router.get('/categories', requireRole('admin'), (req, res) => renderAdminPage(req, res, 'categories'));
router.get('/reports', requireRole('admin'), (req, res) => renderAdminPage(req, res, 'reports'));
router.get('/notifications', requireRole('admin'), (req, res) => renderAdminPage(req, res, 'notifications'));
router.get('/settings', requireRole('admin'), (req, res) => renderAdminPage(req, res, 'settings'));
router.get('/content/about', requireRole('admin'), (req, res) => renderAdminPage(req, res, 'content-about'));
router.get('/content/services', requireRole('admin'), (req, res) => renderAdminPage(req, res, 'content-services'));
router.get('/content/blogs', requireRole('admin'), (req, res) => renderAdminPage(req, res, 'content-blogs'));
router.get('/content/home', requireRole('admin'), (req, res) => renderAdminPage(req, res, 'content-home'));
router.get('/content/contact', requireRole('admin'), (req, res) => renderAdminPage(req, res, 'content-contact'));
router.get('/content/footer', requireRole('admin'), (req, res) => renderAdminPage(req, res, 'content-footer'));

router.get('/admin-dashboard', requireRole('admin'), (req, res) => {
    const q = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    res.redirect(`/admin/dashboard${q}`);
});

module.exports = router;
