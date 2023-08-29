exports.methodOverride = ((req, res, next) => {

  if (req.body._method == 'delete') {
    req.method = 'delete';
    delete req.body._method;
  }else if(req.body._method == 'put'){
    req.method = 'put';
    delete req.body._method;
  }
  next();
});
