'use strict'

const jsonvalidator = require('jsonschema').validate;
const fs = require('fs');

/**
 * Find and either replace or remove items from an array.
 *
 * @module creative
 * @example
 * > creative = require('creative')
 *
 * > let impl = JSON.parse(fs.readFileSync('samples/creative-impl.json' ,'utf-8'))
 * > creative.validate(impl)
 * true
 *
 * > let impl = JSON.parse(fs.readFileSync('samples/creative-impl.json' ,'utf-8'))
 * > creative.compile(impl, inputs)
 * > [html]
 *
 */
module.exports.compile = compile
module.exports.validate = validate

const spec = JSON.parse(fs.readFileSync('spec/creative.json', 'utf-8'))

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

    keys.forEach(key => {
        markup = markup.replace(`{DATA:${key}}`, inputs[key])
        stylesheet = stylesheet.replace(`{DATA:${key}}`, inputs[key])
        script = script.replace(`{DATA:${key}}`, inputs[key])
    });

    return `<style>${stylesheet}</style><div>${markup}</div><script>${script}</script>`
}