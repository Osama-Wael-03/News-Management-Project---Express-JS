
const News = require('../models/News');
const Category = require('../models/Category');
const Admin = require('../models/Admin');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.index = async (req, res) => {
  let news = await News.findAll({ include: [Category] });

  return (req.headers.accepts == 'application/json') ? res.send({ news: news }) :
    res.render('adminPanel/layouts/news-crud/showAll', { news: news, title: 'News Website Management System' });
}
exports.show = (req, res) => {
  //
}
exports.create = async (req, res) => {
  const categories = await Category.findAll();

  res.render('adminPanel/layouts/news-crud/create', { data: categories });
}
exports.store = async (req, res) => {
  let validator = validationResult(req);
  if (validator.isEmpty()) {
    let news = await News.create(req.body);
    return (req.headers.accepts == 'application/json')
      ? res.send({ message: 'Category Inserted Successfully', data: news }) :

      res.with('message', 'News Inserted Successfully !')
        .redirect('/cms/auth/admin/news/create');
  }

  res
    .with('errors', validator.array({ onlyFirstError: true }))
    .with('old', req.body)
    .redirect('/cms/auth/admin/news/create');

}
exports.edit = async (req, res) => {

  const categories = await Category.findAll();
  let newsToShow = await News.findOne({ where: { news_id: req.params.id } });
  res.render('adminPanel/layouts/news-crud/edit-news', { news: newsToShow, data: categories });

}
exports.update = async (req, res) => {
  let validator = validationResult(req);
  if (validator.isEmpty()) {
    let newsToUpdate = await News.update(req.body, { where: { news_id: req.params.id } });
    return res.redirect('/cms/auth/admin/news', 302);
  }
  return res
    .with('errors', validator.array({ onlyFirstError: true }))
    .with('old', req.body)
    .redirect(`/cms/auth/admin/news/${req.params.id}/edit`);
}

exports.destroy = async (req, res) => {
  let deleted = await News.destroy({ where: { news_id: req.params.id } });
  res.redirect('/cms/auth/admin/news', 302);
}

exports.showSoftDeleted = async (req, res) => {
  let softDeletedNews = await News.findAll({
    paranoid: false,
    where: { deletedAt: { [Op.ne]: null } },
    include: [Category]
  });

  return (req.headers.accepts == 'application/json') ?
    res.send({ news: softDeletedNews }) :
    res.render('adminPanel/layouts/news-crud/restore-news', { news: softDeletedNews, title: 'News Website Management System' });
}


exports.restore = async (req, res) => {

  let deleted = await News.findOne({ paranoid: false, where: { news_id: req.params.id } });
  if (deleted.isSoftDeleted()) {
    await deleted.restore();
  }
  res.with('message', 'News Restored Successfully !')
    .redirect('/cms/auth/admin/news/restore');
}
