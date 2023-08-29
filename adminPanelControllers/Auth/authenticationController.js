
const bcrypt = require('bcrypt');
const Admin = require('../../models/Admin');
const { validationResult } = require('express-validator');
const Auth = require('../../services/Auth');
let guard = "";
exports.showLogin = (req, res, next) => {
  let validator = validationResult(req);
  if (validator.isEmpty()) {
    req.session.guard = req.params.guard;
    guard = req.params.guard;
    return res.render('adminPanel/layouts/auth/login-v2');
  }
  next();
}

exports.login = async (req, res, next) => {
  let validator = validationResult(req);
  if (validator.isEmpty()) {
    const result = await Auth.guard(req.session.guard).attempt(req);
    if (result) {
      return res.redirect('/cms/auth/admin');
    }
  }
  return res
    .with('old', req.body)
    .with('errors', validator.array({ onlyFirstError: true }))
    .redirect(`/cms/auth/${req.session.guard}/login`);

}

exports.logout = (req, res, next) => {

  Auth.guard(req.session.guard).logout(req);
  return res.redirect(`/cms/auth/${req.session.guard}/login`);

}

exports.forgotPassword = (req, res, next) => {




}

exports.resetPassword = (req, res, next) => {




}

exports.editPassword = (req, res, next) => {




}
exports.updatePassword = (req, res, next) => {




}