const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof req.session.sessionID === 'undefined') {
          return res.redirect('/');
        }
        return next();
      };
};