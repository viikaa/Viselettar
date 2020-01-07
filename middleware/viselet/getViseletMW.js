const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    let viseletModel = requireOption(objectrepository, 'viseletModel');

    return function (req, res, next) {
        viseletModel.findOne({
            _id: req.params.viseletid
        }).populate('_ownedBy').exec( (err, result) => {
            if((err) || (!result)){
                 return res.redirect('/viselet');
            }
            res.locals.viselet = result;
           
            return next();
        });  
    };
};