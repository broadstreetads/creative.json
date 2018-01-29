const validate = require('jsonschema').validate;
const fs = require('fs');

let spec = fs.readFileSync('spec/creative.json' ,'utf-8');
let impl = fs.readFileSync('samples/creative-impl.json', 'utf-8');

spec = JSON.parse(spec);
impl = JSON.parse(impl);

console.log(validate(impl, spec));