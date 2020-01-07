const Bcrypt = require('bcrypt');
const requireOption = require('./requireOption');

module.exports = function (objectrepository) {
    let userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        if((typeof req.body.name) === "undefined" ||
           (typeof req.body.email) === "undefined" ||
           (typeof req.body.password) === "undefined" ||
           (typeof req.body.passwordConfirm) === "undefined" ||
           req.body.password !== req.body.passwordConfirm){ 
               return next();
           }

        userModel.findOne({
            email: req.body.email
        }, (err, result) => {
            if(err || result !== null){
                return next();
            }
            let user =  new userModel();

            user.name = req.body.name;
            user.email = req.body.email;
            user.password = Bcrypt.hashSync(req.body.passwordConfirm, 10);

            user.save((err, result) => {
                if(err){
                    return next(err);
                }
                return res.redirect('/login');
            });
        });

        
    };
};