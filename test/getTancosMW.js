let expect = require('chai').expect;
let getTancosMW = require('../middleware/tancos/getTancosMW');

describe('get tancos middleware', () => {
    it('should redirect, if db error occurs', () =>{
        let req = {
            params:{
                tancosid: {}
            }
        };
        let res = {
            locals:{
                tancos:{}
            },
            redirect: (route) => {res.where = route;}
        };
        let fakeTancosModel = {
            findOne: (vmi, cb) => cb('hiba', undefined)
        };
        let next = () => {};
        getTancosMW({tancosModel : fakeTancosModel})(req, res, next);
        expect(res.where).to.eql('/tancos');
    });

    it('should save result to res.locals.tancos', () =>{
        let req = {
            params:{
                tancosid: {}
            }
        };
        let res = {
            locals:{
                tancos:{}
            }
        };
        let fakeTancosModel = {
            findOne: (vmi, cb) => cb(undefined, 'talalat')
        };
        let next = () => {};
        getTancosMW({tancosModel : fakeTancosModel})(req, res, next);
        expect(res.locals.tancos).to.eql('talalat');
    });


});