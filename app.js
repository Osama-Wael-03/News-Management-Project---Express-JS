//Requiring Express Module !
const express = require('express');

//Express Instatiation !
const app = express();

//Requiring Routes !
const webRoutes = require('./routes/webRoutes');

//Requiring Database Connection !
const database = require('./config/database');

//Requiring Models !!
const News = require('./models/News');
const Category = require('./models/Category');
const Comment = require('./models/Comment');


//Requiring express-session Module !!
const session = require('express-session');


//Middlewares

app.use(session({ secret: 'news-project' }));

//Requiring Method Override Midddleware
const { methodOverride } = require('./middlewares/method_override');

//Requiring Session Errors Midddleware
const { sessionData } = require('./middlewares/session-errors-old');


//Requiring With Session Handler Midddleware
const { withSessionHandler } = require('./middlewares/withSessionHandler');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Public & Vendor File To read from !
app.use(express.static('public'));
app.use(express.static('vendor'));

//Public File for Admin Panel
app.use(express.static('adminPublic'));


//Views !
app.set('views', 'views');
app.set('view engine', 'ejs');

//Using Method Override Middleware
app.use(methodOverride);


//Using Session Data Middleware
app.use(sessionData);


//Using Session Handler Middleware
app.use(withSessionHandler);


//Routes !
app.use('/cms', webRoutes);


//General Handler !
app.use((req, res) => {
  if (req.headers.accepts == 'application/json') {
    return res.status(404).send({ status: false, message: 'Sorrt, Page Not Found !' });
  }
  return res.render('adminPanel/layouts/errors/404-error');
});

// Connection Checking & Tables Creation !! 
database.authenticate().then(() => {

  News.hasMany(Comment, { foreignKey: 'news_id' });
  Comment.belongsTo(News, { foreignKey: 'news_id' });

  Category.hasMany(News, { foreignKey: 'category_id' });
  News.belongsTo(Category, { foreignKey: 'category_id' });


  database.sync({ force: false }).then(() => {


    console.log('Models Created Successfully !');

    //Listening TO PORT 5000
    app.listen(5000, () => { console.log('Server Started !') });

  });

}).catch((error) => {

  console.log('An Error Occured On Connecting To Database !');

});


