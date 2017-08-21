const Ajv = require('ajv');
const path =  require('path');

/**
 * @param opt - type: object. Parameter object with the following fields:
 * path - mandatory, type string. Main schema full path. For web under the karma the path preffix should start with /base/yourpath.
 *                                 for Karma, update karma.conf.js by adding the path of the json schema files. e.g: files: [... { pattern: 'schemas/*.json', server: true, included: false, watched: true} ...]
 * mainSchemaFile - mandatory, type string. Main schema file name.
 * loadSchema - optional, type: function. Load JSON function. If is missing then will check connectionType
 * connectionType - optional, type: string. Connection type if loadSchema is missing. possible values: web, node. Default value is web.
 * metaSchema - optional, type: Object. Meta schema object. Default will be using the default meta schema from AJV.
 * ajvOptions - optional, type: Object. Additional options to AJV. The following method cannot be changed: allErrors: true, async: true, loadSchema: <predefined function>.
 */
export class JsonSchemaValidator {
  loadSchema: (uri: string) => Promise<Object>;
  loadSchemaPath: string;

  ajv: any;
  ajvValidator: any;

  constructor(opt: {path: string, mainSchemaFile: string, loadSchema?: (uri: string) => Promise<Object>, connectionType?: string, metaSchema?: Object, ajvOptions?: Object}) {
    this.loadSchema = opt.loadSchema || this.loadSchemaWeb;
    if (!this.loadSchema) {
      if (!opt.connectionType || opt.connectionType === 'web') {
        this.loadSchema = this.loadSchemaWeb;
      } else if (opt.connectionType === 'node') {
        this.loadSchema = this.loadSchemaNode;
      } else {
        throw new Error(`invalid connectionType ${opt.connectionType}`);
      }
    }

    this.loadSchemaPath = opt.path;
    let ajvOptions: any = opt.ajvOptions;

    if (!ajvOptions) {
      ajvOptions = {};
    }

    ajvOptions.allErrors =  true;
    ajvOptions.async = true;
    ajvOptions.loadSchema = this.loadSchema.bind(this);

    this.ajv = new Ajv(ajvOptions);

    if (opt.metaSchema) {
      this.ajv.addMetaSchema(opt.metaSchema);
    }

    this.ajvValidator = this.loadSchema(opt.mainSchemaFile).then((mainSchema: Object) => this.ajv.compileAsync(mainSchema));
  }

  validate(json: Object, expect?: (expectedValue: any) => any) {
    return this.ajvValidator.then((validate: any) => {
      const valid = validate(json);

      if (valid) {
        return false;
      }

      if(expect) {
        expect(validate.errors).toBe(false, 'invalid schema');
      }

      return validate.errors;
    })
  }

  loadSchemaWeb(uri: String): Promise<Object> {
    console.log(`loadSchema ${uri}`);

    return new Promise<Object>((resolve, reject) => {
      const url = `${this.loadSchemaPath}/${uri}`;

      const xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);

      xhr.onload = (e) => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            console.error('readJSON', url, xhr.statusText);
          }
        }
      };

      xhr.onerror = (e) => {
        console.error('loadSchemaWeb', url, xhr.statusText);
        reject(xhr.statusText);
      };

      xhr.send(null);
    });
  }

  loadSchemaNode(uri: String): Promise<Object> {
    console.log(`loadSchema ${uri}`);
    return Promise.resolve(require(path.join(this.loadSchemaPath, uri)));
  }
}
