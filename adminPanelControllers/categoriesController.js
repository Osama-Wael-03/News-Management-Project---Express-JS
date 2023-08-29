
const { validationResult } = require('express-validator');
const Category = require('../models/Category');
const {Op} = require('sequelize');


exports.index = async (req, res) => {
  let categories = await Category.findAll();
  res.render('adminPanel/layouts/categories-crud/show-all-categories', { data: categories });
}

exports.create = async (req, res) => {

  res.render('adminPanel/layouts/categories-crud/create-category');
}

exports.store = async (req, res) => {
  let validator = validationResult(req);
  if (validator.isEmpty()) {
    let category = await Category.create(req.body);
    return (req.headers.accepts == 'application/json') ? res.send({ message: 'Category Inserted Successfully' }) :
      res.with('message', 'Category Inserted Successfully !').redirect('/cms/auth/admin/categories/create');
  }
  res.with('errors', validator.array({ onlyFirstError: true })).with('old', req.body)
    .redirect('/cms/auth/admin/categories/create');


}
exports.edit = async (req, res) => {
  let categoryToShow = await Category.findOne({ where: { category_id: req.params.id } });
  res.render('adminPanel/layouts/categories-crud/edit-category', { data: categoryToShow });
}
exports.update = async (req, res) => {
  let validator = validationResult(req);
  if (validator.isEmpty()) {
    let categoryToUpdate = await Category.update(req.body, { where: { category_id: req.params.id } });
    return (req.headers.accepts == 'application/json') ? res.send({ message: 'Category Updated Successfully !' }) :
      res.redirect('/cms/auth/admin/categories');
  }

  res.with('errors', validator.array({ onlyFirstError: true })).with('old', req.body)
    .redirect(`/cms/auth/admin/categories/${req.params.id}/edit`);

}
exports.destroy = async (req, res) => {

  let deleted = await Category.destroy({ where: { category_id: req.params.id } });
  res.redirect('/cms/auth/admin/categories');

}

exports.showDeletedCategory = async (req, res) => {
  let softDeletedNews = await Category.findAll({ 
    paranoid: false,
    where: { deletedAt: { [Op.ne]: null } }
  });

  return (req.headers.accepts == 'application/json') ? 
    res.send({ news: softDeletedNews }) :
    res.render('adminPanel/layouts/categories-crud/restore-category', { data: softDeletedNews, title: 'News Website Management System' });

}

exports.restore = async (req, res) => {

  let deleted = await Category.findOne({paranoid : false , where : {category_id : req.params.id}});
  if(deleted.isSoftDeleted()){
    await deleted.restore();
  }
  res.with('message', 'News Restored Successfully !')
        .redirect('/cms/auth/admin/categories/restore');

}
