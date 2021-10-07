const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    // console.log('THIIIIIIIIS IS THE COOOOOOOKIES', req.cookies);
    const { session } = req.cookies;
    const payload = jwt.verify(session, process.env.APP_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    error.status = 401;
    error.message = 'You must be logged in to continue';
    next(error);
  }
};
