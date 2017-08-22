import { JsonSchemaValidator } from '../src/index';
const path = require('path');

describe('typeSimple', () => {
    const jsonValidator = new JsonSchemaValidator({connectionType: 'node', path: path.join( __dirname, './schemas'), mainSchemaFile: 'typeSimple.json'});
    let mediator: any = 1;
    it('invalidate empty object', (done) => {
        const emptyjson = {};
        jsonValidator.validate(emptyjson).then((result: any) => {
            expect(result).toBeTruthy();
        }).then(done, done);
    });
    it('invalidate wrong type', (done) => {
        const emptyjson = {
            field1: 1
        };
        jsonValidator.validate(emptyjson).then((result: any) => {
            expect(result).toBeTruthy();
        }).then(done, done);
    });
    it('validate correct type', (done) => {
        const emptyjson = {
            field1: 'test'
        };
        jsonValidator.validate(emptyjson).then((result: any) => {
            expect(result).toBe(false);
        }).then(done, done);
    });
});