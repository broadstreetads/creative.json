'use strict'

const jsonvalidator = require('jsonschema').validate
const fs = require('fs')
const merge = require('deepmerge')

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
 * > const inputs = { name: 'Broadstreet Ads' }
 * > const impl = JSON.parse(fs.readFileSync('sample-creatives/simple.json' ,'utf-8'))
 * > creative.compile(impl, inputs)
 * <style>/* CSS: Broadstreet Ads *\/</style><div><!-- HTML:Broadstreet Ads --></div><script>// JS:Broadstreet Ads</script>
 *
 */
module.exports.compile = compile
module.exports.validate = validate
module.exports.getTemplate = getTemplate

const spec = JSON.parse(fs.readFileSync('spec/creative.json', 'utf-8'))
const template = JSON.parse(fs.readFileSync('sample-creatives/minimal.json', 'utf-8'))

/**
 * Validate a creative implementation against a schema
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