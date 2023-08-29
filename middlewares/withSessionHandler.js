exports.withSessionHandler = (req, res, next) => {

  res.with = (key, value) => {
    if (!('flashed' in req.session)) {
      req.session.flashed = {};
    }
    let flashed = req.session.flashed;
    req.session.flashed = { ...flashed, [key]: value };
    return res;
  }
  next();
}