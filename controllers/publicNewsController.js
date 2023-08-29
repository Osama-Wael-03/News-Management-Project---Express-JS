
const News = require('../models/News');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');
const Comment = require('../models/Comment');


exports.index = async (req, res) => {
  let news = await News.findAll({ include: [Category] });
  let categories = await Category.findAll();
  res.render('parent', { title: 'News Website', news: news, categories: categories });
}

let news_param = 0;

exports.show = async (req, res) => {
  let categories = await Category.findAll();
  let news = await News.findOne({ where: { news_id: req.params.id } });
  news.views++;
  news.save();
  let comments = await Comment.findAll({ where: { news_id: req.params.id } });
  news_param = req.params.id;

  res.render('news/newsDetails', { news: news, categories: categories, comments: comments });
}
exports.store = async (req, res) => {
  let validator = validationResult(req);
  if (validator.isEmpty()) {
    let comment = await Comment.create({ ...req.body, news_id: news_param });
    return (req.headers.accepts == 'application/json') ? req.send({ message: 'Comment Added Successfully !' })
      : res.redirect(`/cms/news/${news_param}`);
  }

  return res
    .with('old', req.body)
    .with('errors', validator.array({ onlyFirstError: true }))
    .redirect(`/cms/news/${news_param}`);

}


exports.storeReports = async (req, res) => {
  let comment = await Comment.findOne({ where: { comment_id: req.params.id } });
  comment.comment_reports++;
  comment.save();
  return res.redirect(`/cms/news/${news_param}`);
}



