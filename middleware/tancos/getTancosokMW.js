const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    let tancosModel = requireOption(objectrepository, 'tancosModel');
    return function (req, res, next) {
            tancosModel.find({
                user: req.session.sessionID
            },(err, result) => {
                    if((err) || (!result)){
                        return res.redirect('/tancos');
                    }
                    res.locals.tancosLista = result;
                    return next();
            });
    };
};