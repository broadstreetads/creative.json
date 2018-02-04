'use strict'

const jsonvalidator = require('jsonschema').validate;
const fs = require('fs');

/**
 * Find and either replace or remove items from an array.
 *
 * @module creative-compile
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

/**
 * Validate a creative implementation against a schema
 * @param {creative} - The input creative object
 * @returns {boolean}
 */
function validate (creative) {
    let spec = fs.readFileSync('spec/creative.json' ,'utf-8')
    spec = JSON.parse(spec)

    let result = jsonvalidator(creative, spec)

    if (result.errors.length > 0) {
        throw new Error('Creative is not valid: ' + result.errors.toString())
    }

    return result.errors.length === 0
}

/**
 * Compile a creative to HTML given inputs
 * @param {creative} - the creative
 * @param {inputs} - the input array
 * @returns {string} - HTML
 */
function compile (creative, inputs, opts) {
    opts = opts || {}

    return ''
}