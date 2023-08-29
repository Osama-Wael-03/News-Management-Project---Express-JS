const Category = require("../models/Category");
const News = require("../models/News");

exports.index = async (req, res) => {
  let categories = await Category.findAll();
  res.render('news/all-news', { categories: categories });

}
exports.show = async (req, res) => {
  let categories = await Category.findAll();
  let news = await News.findAll({ where: { category_id: req.params.id } });
  res.render('news/all-news', { categories: categories, news: news });

}