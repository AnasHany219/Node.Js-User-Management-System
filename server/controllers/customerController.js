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
  try {
    const locals = {
      title: "NodeJS | View Customer",
      description: "Free NodeJS User Managment System"
    }

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
exports.getEditCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id
    });

    const locals = {
      title: "NodeJS | Edit Customer",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/edit", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Post /
 * Update Customer
 */
exports.updateCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });

    await res.redirect(`/edit/${req.params.id}`);
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
    await Customer.deleteOne({
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

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [{
          firstName: {
            $regex: new RegExp(searchNoSpecialChar, "i")
          }
        },
        {
          lastName: {
            $regex: new RegExp(searchNoSpecialChar, "i")
          }
        },
      ],
    });

    res.render('search', {
      locals,
      customers
    });
  } catch (error) {
    console.log(error);
  }
};