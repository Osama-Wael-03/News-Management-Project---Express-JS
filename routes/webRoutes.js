
const express = require('express');
const router = express.Router();
const publicNewsController = require('../controllers/publicNewsController');
const contactController = require('../controllers/contactController');
const allNewsController = require('../controllers/allNewsController');
const adminPanelController = require('../adminPanelControllers/adminPanelController');
const dashboardController = require('../adminPanelControllers/dashboardController');
const categoriesController = require('../adminPanelControllers/categoriesController');
const authController = require('../adminPanelControllers/Auth/authenticationController');
const { authenticate } = require('../middlewares/authenticate');
const { param, body } = require('express-validator');
const Admin = require('../models/Admin');
const { guest } = require('../middlewares/guest');
const { auth } = require('../config/auth');





router.get('/news', publicNewsController.index);
router.get('/news/:id/', publicNewsController.show);
router.post('/news', [body('commenter_name').trim()
  .notEmpty().withMessage('Commenter Name Cannot Be Empty!')
  .matches(/^[A-Za-z\s]+$/).withMessage('Please Enter Name with only letters and spaces!')
  .isLength({ min: 3, max: 60 }).withMessage('Name Length Must Be Between 3 and 60 Characters'),
body('comment_content').trim()
  .notEmpty().withMessage('Comment Cannot Be Empty!')
  .isLength({ min: 1, max: 255 }).withMessage('Name  Must Be Between 1 and 255 Characters')
], publicNewsController.store);

router.post('/news/reports/:id', publicNewsController.storeReports);

router.get('/contact', contactController.index);

router.post('/contact', [
  body('gst_full_name').trim().notEmpty().withMessage('Full Name is required')
    .isLength({ min: 2 }).withMessage('Full Name must be at least 2 characters long'),
  body('gst_phone').trim().notEmpty().withMessage('Phone Number is required'),
  body('gst_email').trim().isEmail().withMessage('Invalid Email Address'),
  body('guest_message').trim().notEmpty().withMessage('Message is required'),
],
  contactController.store);



router.get('/allNews', allNewsController.index);
router.get('/allNews/:id', allNewsController.show);




//====================================ADMIN PANEL BRANCH===============================================



//Login Routes
router.get('/auth/:guard/login', [param('guard').isString().custom((value) => {

  return value == 'admin' || value == 'osama';

})], guest, authController.showLogin);


router.post('/auth/login', guest, [body('admin_email').trim()
  .notEmpty().withMessage('EmailCannot Be Empty').normalizeEmail()
  .isEmail().withMessage('Please Enter Valid Email Address !')
  .custom((value) => {

    return Admin.count({ where: { admin_email: value } }).then((count) => {

      if (count == 0) {
        throw new Error('Are You Admin ?! , Email Is Not Registered !');
      }

    });

  })
  , body('admin_password').trim().notEmpty().withMessage('Password Cannot Be Empty !')], authController.login);


router.get('/auth/logout', authenticate, authController.logout);


//Admin DashBoard Controller
router.get('/auth/admin', authenticate, dashboardController.dashboard);


//Admin Panel Conntroller (CRUD)

router.get('/auth/admin/news', authenticate, adminPanelController.index);
router.get('/auth/admin/news/create', authenticate, adminPanelController.create);


router.post('/auth/admin/news', authenticate,
  [
    body('news_title')
      .trim()
      .notEmpty().withMessage('News Title Cannot Be Empty!')
      .matches(/^[A-Za-z\s]+$/).withMessage('Please Enter News Title with only letters and spaces!')
      .isLength({ min: 3, max: 60 }).withMessage('News Title Length Must Be Between 3 and 60 Characters'),

    body('news_description')
      .trim()
      .notEmpty().withMessage('News Description Cannot Be Empty!')
      .isLength({ min: 10 }).withMessage('News Description must be at least 10 characters long'),

    body('category_id')
      .notEmpty().withMessage('Please Select a Category'),

    body('is_blocked')
      .notEmpty().withMessage('Please Select Blocking Status'),

  ],
  adminPanelController.store
);


router.get('/auth/admin/news/:id/edit', authenticate, adminPanelController.edit);

router.put('/auth/admin/news/:id', authenticate,
  [
    param('id')
      .notEmpty().withMessage('News ID Cannot Be Empty!'),

    body('news_title')
      .trim()
      .notEmpty().withMessage('News Title Cannot Be Empty!')
      .matches(/^[A-Za-z\s]+$/).withMessage('Please Enter News Title with only letters and spaces!')
      .isLength({ min: 3, max: 60 }).withMessage('News Title Length Must Be Between 3 and 60 Characters'),

    body('news_description')
      .trim()
      .notEmpty().withMessage('News Description Cannot Be Empty!')
      .isLength({ min: 10 }).withMessage('News Description must be at least 10 characters long'),

    body('category_id')
      .notEmpty().withMessage('Please Select a Category'),

    body('is_blocked')
      .notEmpty().withMessage('Please Select Blocking Status'),
  ],
  adminPanelController.update
);
router.delete('/auth/admin/news/:id', authenticate, adminPanelController.destroy);
router.get('/auth/admin/news/restore', authenticate, adminPanelController.showSoftDeleted);
router.get('/auth/admin/news/:id/restore', authenticate, adminPanelController.restore);



//===============================Category Routes=======================================


router.get('/auth/admin/categories', authenticate, categoriesController.index);
router.get('/auth/admin/categories/create', authenticate, categoriesController.create);
router.get('/auth/admin/categories/:id/edit', authenticate, categoriesController.edit);
router.put('/auth/admin/categories/:id', authenticate,
  body('category_name').trim()
    .notEmpty().withMessage('Please Enter Category Name !')
    .matches(/^[A-Za-z\s]+$/).withMessage('Please Enter Category Name with only letters and spaces!')
    .isLength({ min: 3, max: 60 }).withMessage('Category Name Length Must Be Between 3 and 60 Characters ')
  , categoriesController.update);


router.post('/auth/admin/categories', authenticate, body('category_name').trim()
  .notEmpty().withMessage('Please Enter Category Name !')
  .matches(/^[A-Za-z\s]+$/).withMessage('Please Enter Category Name with only letters and spaces!')
  .isLength({ min: 3, max: 60 }).withMessage('Category Name Length Must Be Between 3 and 60 Characters ')
  , categoriesController.store);
router.delete('/auth/admin/categories/:id', authenticate, categoriesController.destroy);
router.get('/auth/admin/categories/:id', authenticate, categoriesController.showDeletedCategory);
router.get('/auth/admin/categories/:id/restore', authenticate, categoriesController.restore);


module.exports = router;