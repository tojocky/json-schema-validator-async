export var jsonEnv: any = {};
//declare const browser: any;

if (process.argv.length > 0) {
  // only node.js has argv, at least the node executable
  const path = require('path');
  jsonEnv.connectionType = 'node';
  jsonEnv.path = path.join( __dirname, './schemas')
} else {
  jsonEnv.connectionType = 'web';
  jsonEnv.path = 'base/spec/schemas'
}

console.log('running tests in ' + jsonEnv.connectionType);
