exports.authenticate = (req, res, next) => {

  if('isAuthenticated' in req.session && 'admin' in req.session){
    if(req.session.isAuthenticated){
    return next();
  }
}

return res.redirect('/cms/auth/osama/login');

}