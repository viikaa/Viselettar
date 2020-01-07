module.exports = function (objectrepository) {

    return function (req, res, next) {
  
      if (typeof req.session.sessionID === 'undefined') {
        return res.redirect('/login');
      } else {
        return res.redirect('/tancos');
      }
    };
  
  };