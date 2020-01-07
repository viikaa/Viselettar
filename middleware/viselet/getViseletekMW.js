const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    let viseletModel = requireOption(objectrepository, 'viseletModel');
    return function (req, res, next) {
        viseletModel.find({
            user: req.session.sessionID
        }).populate('_ownedBy').exec(
            (err, result) => {
                if((err) || (!result)){
                    return res.redirect('/viselet');
                }
                res.locals.viseletLista = result;
                return next();     
        });
    };
};