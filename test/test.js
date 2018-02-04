'use strict'
const TestRunner = require('test-runner')
const creative = require('../')
const a = require('assert')
const fs = require('fs')

const runner = new TestRunner()

let impl = fs.readFileSync('samples/creative-impl.json', 'utf-8')
impl = JSON.parse(impl)

runner.test('validate example creative', function (t) {
    a.strictEqual(
        creative.validate(impl),
        true
    )
})