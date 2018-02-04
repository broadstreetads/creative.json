const { execSync } = require('child_process');
const replace = require('replace')
const schemaparse = require('json-schema-to-markdown')
const fs = require('fs')
const spec = JSON.parse(fs.readFileSync('spec/creative.json', 'utf-8'))

execSync('node ./node_modules/jsdoc-to-markdown/bin/cli.js -t jsdoc2md/README.hbs lib/*.js > README.md; echo')

/*
replace({
    regex: '%%schema%%',
    replacement: schemaparse(spec),
    paths: ['README.md'],
    silent: true
});
*/