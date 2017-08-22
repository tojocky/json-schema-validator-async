import { JsonSchemaValidator } from '../src/index';
import { jsonEnv } from './env';

describe('typeSimple', () => {
    jsonEnv.mainSchemaFile = 'typeSimple.json';
    const jsonValidator = new JsonSchemaValidator(jsonEnv);

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