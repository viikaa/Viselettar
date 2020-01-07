const authMW = require('../middleware/auth/authMW');
const registerMW = require('../middleware/registerMW');
const loginAuthMW = require('../middleware/auth/loginAuthMW');
const logoutMW = require('../middleware/auth/logoutMW');
const loginMW = require('../middleware/auth/loginMW');
const redirectMW = require('../middleware/auth/redirectMW');
const renderMW = require('../middleware/renderMW');
const getRuhatarMW = require('../middleware/getRuhatarMW');
const delTancosMW = require('../middleware/tancos/delTancosMW');
const getTancosokMW = require('../middleware/tancos/getTancosokMW');
const getTancosMW = require('../middleware/tancos/getTancosMW');
const saveTancosMW = require('../middleware/tancos/saveTancosMW');
const delViseletMW = require('../middleware/viselet/delViseletMW');
const getViseletekMW = require('../middleware/viselet/getViseletekMW');
const getViseletMW = require('../middleware/viselet/getViseletMW');
const saveViseletMW = require('../middleware/viselet/saveViseletMW');

const tancosModel = require('../models/tancos');
const viseletModel = require('../models/viselet');
const userModel = require('../models/user');

module.exports = function (app) {
    const objRepo = {
        tancosModel: tancosModel,
        viseletModel: viseletModel,
        userModel: userModel
    };

    app.use('/login',
        loginAuthMW(objRepo),
        loginMW(objRepo),
        renderMW(objRepo, 'index'));
    app.use('/register',
        registerMW(objRepo),
        renderMW(objRepo, 'register'));
    app.use('/logout',
        logoutMW(objRepo));

    app.get('/tancos',
        authMW(objRepo),
        getTancosokMW(objRepo),
        renderMW(objRepo, 'tancosok'));
    app.use('/tancos/new',
        authMW(objRepo),
        saveTancosMW(objRepo),
        getViseletekMW(objRepo),
        renderMW(objRepo, 'tancosadatlap'));
    app.use('/tancos/:tancosid/del',
        authMW(objRepo),
        getTancosMW(objRepo),
        getViseletekMW(objRepo),
        getRuhatarMW(objRepo),
        delTancosMW(objRepo));
    app.use('/tancos/:tancosid',
        authMW(objRepo),
        getTancosMW(objRepo),
        getViseletekMW(objRepo),
        saveTancosMW(objRepo),
        renderMW(objRepo, 'tancosadatlap'));

    app.get('/viselet',
        authMW(objRepo),
        getViseletekMW(objRepo),
        renderMW(objRepo, 'viseletek'));
    app.use('/viselet/new',
        authMW(objRepo),
        getRuhatarMW(objRepo),
        getTancosokMW(objRepo),
        saveViseletMW(objRepo),
        renderMW(objRepo, 'viseletadatlap'));
    app.get('/viselet/:viseletid/del',
        authMW(objRepo),
        getViseletMW(objRepo),
        delViseletMW(objRepo),);
    app.use('/viselet/:viseletid',
        authMW(objRepo),
        getTancosokMW(objRepo),
        getViseletMW(objRepo),
        saveViseletMW(objRepo),
        renderMW(objRepo, 'viseletadatlap'));

    app.use('/',
        redirectMW(objRepo));
};