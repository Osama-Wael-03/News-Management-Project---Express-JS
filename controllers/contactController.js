const Category = require('../models/Category');
//Contact Model
const { validationResult } = require('express-validator');
let Contact = require('../models/Contact');
exports.index = async (req, res) => {
  let categories = await Category.findAll();
  res.render('contact/contact' , {categories : categories});
}

exports.store = async (req, res) => {
  let validator = validationResult(req);
  if (validator.isEmpty()) {
    let contact = await Contact.create(req.body);
    return (req.headers.accepts == 'application/json') ? res.send({ message: 'Contact Sent !' }) :
      res.with('message', 'Thank You For Contacting Us, Your Message Arrived !').redirect('/cms/contact');
  }

  return res
    .with('old', req.body)
    .with('errors', validator.array({ onlyFirstError: true }))
    .redirect('/cms/contact');

}
