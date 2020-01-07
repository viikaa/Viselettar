const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    let tancosModel = requireOption(objectrepository, 'tancosModel');
    
    return function (req, res, next) {
        tancosModel.findOne({
            _id: req.params.tancosid
        }, (err, result) => {
            if((err) || (!result)){
                 return res.redirect('/tancos');
            }
            res.locals.tancos = result;
           
            return next();
        });   
    };
};