'use strict'

const jsonvalidator = require('jsonschema').validate
const fs = require('fs')
const merge = require('deepmerge')
const request = require('request')

/**
 * Validate and compile creatives defined in JSON
 *
 * @module creative
 * @example
 * > const creative = require('creative-json')
 *
 * > let impl = JSON.parse(fs.readFileSync('sample-creatives/simple.json' ,'utf-8'))
 * > creative.validate(impl)
 * true
 *
 * > creative.validateFile('sample-creatives/simple.json')
 * true
 *
 * > creative.validateRemove('https://parkavegarage.com/some-valid-creative.json', function (err, valid) {
 *  if (!err && valid)
 *      console.log (valid)
 *  else
 *      console.log (`Error: ${err}`)
 * })
 * true
 *
 * > const inputs = { name: 'Broadstreet Ads' }
 * > const impl = JSON.parse(fs.readFileSync('sample-creatives/simple.json' ,'utf-8'))
 * > creative.compile(impl, inputs)
 * <style>/* CSS: Broadstreet Ads *\/</style><div><!-- HTML:Broadstreet Ads --></div><script>// JS:Broadstreet Ads</script>
 *
 */
module.exports.compile = compile
module.exports.validate = validate
module.exports.validateFile = validateFile
module.exports.validateRemote = validateRemote
module.exports.getTemplate = getTemplate

const spec = JSON.parse(fs.readFileSync('spec/creative.json', 'utf-8'))
const template = JSON.parse(fs.readFileSync('sample-creatives/minimal.json', 'utf-8'))

/**
 * Validate a creative implementation against the creative.json schema
 * @param {creative} - The input creative object
 * @returns {boolean}
 */
function validate (creative) {
    let result = jsonvalidator(creative, spec)

    if (result.errors.length > 0) {
        throw new Error('Creative is not valid: ' + result.errors.toString())
    }

    return result.errors.length === 0
}

/**
 * Validate a creative stored in a file and specified via creation.json format
 * @param {string} file The path to the creative file
 * @returns {boolean}
 */
function validateFile (file) {
    let impl = fs.readFileSync(file, 'utf-8')
    impl = JSON.parse(impl)
    return validate (impl);
}

/**
 * Validate a remote creative specified via creative.json format
 * @param {string} url A URL to a creative specified in creative.json format
 * @param {function} cb A callback (err, result:boolean)
 */
function validateRemote (url, cb) {
    let urlRegex = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i');
    if (url.length < 2083 && urlRegex.test(url)) {
        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    let creative = JSON.parse(body);
                    cb (null, validate(creative))
                } catch (e) {
                    cb (`Error parsing remote JSON: ${e.toString()}`)
                }
            } else {
                cb (`Error downloading ${url}: ${error}`)
            }
        });
    } else {
        cb (`URL is not valid: ${url}`)
    }
}

/**
 * Compile a creative to HTML given inputs
 * @param {creative} - the creative
 * @param {inputs} - the input hash
 * @returns {string} - HTML
 */
function compile (creative, inputs, opts) {
    opts = opts || {}

    // first thing's first
    validate(creative)

    let markup = creative.markup || ''
    let script = creative.script || ''
    let stylesheet = creative.stylesheet || ''

    let keys = Object.keys(inputs)

    creative.inputs.forEach(inp => {
        let key = inp.name;
        let val = inputs[inp.name] || inp.default;

        markup = markup.replace(`{DATA:${key}}`, val)
        stylesheet = stylesheet.replace(`{DATA:${key}}`, val)
        script = script.replace(`{DATA:${key}}`, val)
    });

    return `<style>${stylesheet}</style><div>${markup}</div><script>${script}</script>`
}

/**
 * Get a minimally valid creative. Useful as a template for new creatives
 * @returns {object}
 */
function getTemplate (overrides) {
    return merge(template, overrides || {});
}