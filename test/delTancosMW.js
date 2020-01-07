let expect = require('chai').expect;
let delTancosMW = require('../middleware/tancos/delTancosMW');

describe('delete tancos middleware', () => {
    it('should not do anything if type of tancos is undefined', () =>{
        let req = {};
        let res = {
            locals: {}
        };
        let next = () => {};
        delTancosMW(req, res, next);
        expect(res.locals.tancos).to.be.an('undefined');
    });

    it('gives the wardrobe the "ownerless" cloths', () => {
        let req = {};
        let res = {
            locals: {
                tancos:{
                    _id:{
                        equals: (masikid) => { return masikid === 'asd'; }
                    }
                },
                viseletLista: [
                    {
                        _ownedBy:{
                            _id: 'asd'
                        }
                    }
                ],
                ruhatar:{
                    _id:'asd'
                }
            }
        };
        let next = () => {}; 
        delTancosMW(req, res, next);
        expect(res.locals.viseletLista[0]._ownedBy).to.eql(res.locals.ruhatar);
    });

    it('should return error, if db returns error', ()=>{
        let req = {};
        let next = (err) => { return err;}
        let res = {
            locals: {
                tancos:{
                    remove: (cb) => cb('hiba')
                }
            }
        };
        expect(delTancosMW(req, res, next)).to.eql('hibaa');
    });


});