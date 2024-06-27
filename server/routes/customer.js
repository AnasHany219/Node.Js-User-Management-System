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

router.get('/edit/:id', customerController.getEditCustomer);
router.put('/edit/:id', customerController.updateCustomer);

router.delete('/edit/:id', customerController.deleteCustomer);

router.post('/search', customerController.searchCustomers);

module.exports = router;