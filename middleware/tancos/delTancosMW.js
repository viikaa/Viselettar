module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.tancos === "undefined"){
            return next();
        }

        res.locals.viseletLista.forEach(element => {
            if(res.locals.tancos._id.equals(element._ownedBy._id)){
                element._ownedBy = res.locals.ruhatar;
                element.save();
            }
        });

        res.locals.tancos.remove((err) =>{
            if(err){
                return next(err);
            }

            res.redirect('/tancos');
        });
    };
};