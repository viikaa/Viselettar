const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    let tancosModel = requireOption(objectrepository, 'tancosModel');

    return function (req, res, next) {
        if((typeof req.body.name) === "undefined" ||
           (typeof req.body.sex) === "undefined" ||
           (typeof req.body.year) === "undefined" ||
           (typeof req.body.month) === "undefined" ||
           (typeof req.body.day) === "undefined"){ 
               return next();
           }

        let tancos = undefined;
        if(typeof res.locals.tancos !== "undefined"){
            tancos = res.locals.tancos;            
        }else {
            tancos = new tancosModel();
        }

        tancos.name = req.body.name;
        tancos.sex = req.body.sex;
        tancos.year = req.body.year;
        tancos.month = req.body.month;
        tancos.day = req.body.day;
        tancos.user = req.session.sessionID;

        tancos.save((err, result) => {
            if(err){
                return next(err);
            }
            return res.redirect('/tancos/' + result._id);
        });
    };
};