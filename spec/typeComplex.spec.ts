import { JsonSchemaValidator } from '../src/index';
import { jsonEnv } from './env';



describe('typeSimple', () => {
    jsonEnv.mainSchemaFile = 'typeComplex.json';
    const jsonValidator = new JsonSchemaValidator(jsonEnv);

    it('invalidate empty object', (done) => {
        const emptyjson = {};
        jsonValidator.validate(emptyjson).then((result: any) => {
            expect(result).toBeTruthy();
        }).then(done, done);
    });
    it('invalidate wrong type array', (done) => {
        const emptyjson = {
            subtypeComplex: 1
        };
        jsonValidator.validate(emptyjson).then((result: any) => {
            expect(result).toBeTruthy();
        }).then(done, done);
    });
    it('validate correct type array', (done) => {
        const emptyjson = {
            subtypeComplex: [],
            field4: 'test'
        };
        jsonValidator.validate(emptyjson).then((result: any) => {
            expect(result).toBe(false);
        }).then(done, done);
    });
    it('validate correct subtype array', (done) => {
        const emptyjson = {
            subtypeComplex: [{
              subtypeComplex: [],
              field4: 'test'
            }],
            field4: 'test'
        };
        jsonValidator.validate(emptyjson).then((result: any) => {
            expect(result).toBe(false);
        }).then(done, done);
    });
    it('validate correct subtype subtype array', (done) => {
        const emptyjson = {
            subtypeComplex: [
              {
                subtypeComplex: [
                  {
                    subtypeComplex: [
                      {
                        field1: ''
                      }
                    ],
                    field4: 'test'
                  }
                ],
                field4: 'test'
              }
            ],
            field4: 'test'
          };
        jsonValidator.validate(emptyjson).then((result: any) => {
            expect(result).toBe(false);
        }).then(done, done);
    });
});