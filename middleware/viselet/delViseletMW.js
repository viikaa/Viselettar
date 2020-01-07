module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.viselet === "undefined"){
            return next();
        }
        res.locals.viselet.remove( (err) =>{
            if(err){
                return next(err);
            }
            res.redirect('/viselet');
        });
    };
};