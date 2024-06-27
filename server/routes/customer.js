const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

/**
 * Customer Routes
 */
router.get('/', customerController.homePage);
router.get('/about', customerController.aboutPage);

router.get('/add', customerController.addCustomer);
router.post('/add', customerController.postCustomer);

router.get('/view/:id', customerController.viewCustomer);

router.get('/edit/:id', customerController.editCustomer);
router.put('/edit/:id', customerController.postCustomer);

router.post('/search', customerController.searchCustomers);

module.exports = router;