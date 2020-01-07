const requireOption = require('./requireOption');

module.exports = function (objectrepository) {
    let tancosModel = requireOption(objectrepository, 'tancosModel');
    
    return function (req, res, next) {
        tancosModel.findOne({
            name: 'Ruhatár',
            user: req.session.sessionID
        }, (err, result) => {
            if(err || !result){
                 result = new tancosModel();
                 result.name = 'Ruhatár';
                 result.user = req.session.sessionID;
                 result.save();
            }
            res.locals.ruhatar = result;
            return next();
        });
    };
};