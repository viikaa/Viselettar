const Bcrypt = require('bcrypt');
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const userModel = requireOption(objectrepository, 'userModel');
    return function (req, res, next) {
        if ((typeof req.body === 'undefined') || (typeof req.body.password === 'undefined')) {
            return next();
        }

        userModel.findOne({
            email: req.body.email
        }, (err, result)=> {
            if(err || (!result)){
                return next(err);
            }
            res.locals.user = result;
            if(!Bcrypt.compareSync(req.body.password, result.password)){
                return next(err);
            }
            req.session.sessionID = result._id;
            res.redirect('/');
        });
    };
};