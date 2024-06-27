const customer = require('../model/customer');
const Customer = require('../model/customer');
const mongoose = require('mongoose');

/**
 * GET /
 * Home Page
 */
exports.homePage = async (req, res) => {
  const locals = {
    title: "NodeJS",
    description: "Free NodeJS User Managment System"
  }

  let perPage = 7;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{
      $sort: {
        updatedAt: -1
      }
    }]).skip(perPage * page - perPage).limit(perPage).exec();
    const count = await Customer.countDocuments();
    res.render('index', {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage)
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * About
 */
exports.aboutPage = async (req, res) => {
  const locals = {
    title: "NodeJS | About",
    description: "Free NodeJS User Managment System"
  }
  res.render('about', locals);
};

/**
 * GET /
 * New Customer
 */
exports.addCustomer = async (req, res) => {
  const locals = {
    title: "NodeJS | Add Customer",
    description: "Free NodeJS User Managment System"
  }
  res.render('customer/add', {
    locals
  });
};

/**
 * POST /
 * New Customer
 */
exports.postCustomer = async (req, res) => {
  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    email: req.body.email,
    tel: req.body.tel,
  });

  console.log(req.body);
  try {
    await Customer.create(newCustomer);
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * View Customer
 */
exports.viewCustomer = async (req, res) => {
  const locals = {
    title: "NodeJS | View Customer",
    description: "Free NodeJS User Managment System"
  }

  try {
    const customer = await Customer.findOne({
      _id: req.params.id
    });

    res.render('customer/view', {
      locals,
      customer
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Edit Customer
 */
exports.editCustomer = async (req, res) => {
  const locals = {
    title: "NodeJS | Edit Customer",
    description: "Free NodeJS User Managment System"
  }

  try {
    const customer = await Customer.findOne({
      _id: req.params.id
    });

    res.render('customer/edit', {
      locals,
      customer
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Post /
 * Edit Customer
 */
exports.postCustomer = async (req, res) => {
  try {
    await customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      details: req.body.details,
      updatedAt: Date.now(),
      email: req.body.email,
      tel: req.body.tel
    });

    res.redirect(`/edit/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete Customer
 */
exports.deleteCustomer = async (req, res) => {
  try {
    await customer.deleteOne({
      _id: req.params.id
    });
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Search Customer
 */
exports.searchCustomers = async (req, res) => {
  const locals = {
    title: "NodeJS | Search Customer",
    description: "Free NodeJS User Managment System"
  }

  let searchTerm = req.body.searchTerm;
  const searchWithoutS_Chars = searchTerm.replace(/[a-zA-z0-9 ]/g, '');
  try {
    const customers = await Customer.find({
      $or: [{
          firstName: {
            $regex: new RegExp(searchWithoutS_Chars)
          }
        },
        {
          lastName: {
            $regex: new RegExp(searchWithoutS_Chars)
          }
        },
      ]
    });

    res.render('search', {
      locals,
      customers
    });
  } catch (error) {
    console.log(error);
  }
};