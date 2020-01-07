const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    let viseletModel = requireOption(objectrepository, 'viseletModel');

    return function (req, res, next) {
        if((typeof req.body.name) === "undefined" ||
           (typeof req.body.region) === "undefined" ||
           (typeof req.body.color) === "undefined" ||
           (typeof req.body._ownedBy) === "undefined"){ 
               return next();
           }
        
        let viselet = undefined;
        if(typeof res.locals.viselet !== "undefined"){
            viselet = res.locals.viselet;            
        }else {
            viselet = new viseletModel();
        }

        viselet.name = req.body.name;
        viselet.region = req.body.region;
        viselet.color = req.body.color;
        if(typeof req.body._ownedBy !== "undefined" || typeof req.body._ownedBy !== ""){
            viselet._ownedBy= req.body._ownedBy;
        }
        viselet.user = req.session.sessionID;
        viselet.save((err, result) => {
            if(err){
                return next(err);
            }
            return res.redirect('/viselet/' + result._id);
        });
    };
};