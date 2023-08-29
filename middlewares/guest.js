exports.guest = (req, res, next) => {

  if ('isAuthenticated' in req.session) {
    if (req.session.isAuthenticated == true) {
      return res.redirect('/cms/auth/admin');
    }
  }
  next();
}