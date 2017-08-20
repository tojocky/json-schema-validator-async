# json-schema-validator-async
An async JSON schema validator compatible with $ref file dependencies and angular 2+ karma

## How to integrate with angular 2+ and karma

* expose json folder by updating the file `karma.conf.js`

```javascript
...
files: [
  ...
  { pattern: 'schemas/*.json', server: true, included: false, watched: true}
  ...
],
...
```

* use it in the .spec.ts:

```typescript
import { JsonSchemaValidator } from 'json-schema-validator-async';
schema1Validator = new JsonSchemaValidator({path: 'base/schemas/*.json', mainSchemaFile: 'resourceSchema.json'});
...
it('shoud have the valid schema' (done) => {
  jsonData = {...};
  schema1Validator.validate(jsonData, expect).then(done, done);
});
```

Note that the `path` has the prefix `base/`.
Also note that async function is not trully `async`, `done` method does the best job.

On fail you will see the errors json.
