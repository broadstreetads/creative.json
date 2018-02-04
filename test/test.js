'use strict'
const TestRunner = require('test-runner')
const creative = require('../')
const a = require('assert')
const fs = require('fs')

const runner = new TestRunner()

runner.test('validate example creative', function (t) {
    let impl = fs.readFileSync('samples/creative-impl.json', 'utf-8')
    impl = JSON.parse(impl)
    a.strictEqual(
        creative.validate(impl),
        true
    )
})

runner.test('compile simple creative', function (t) {
    let impl = fs.readFileSync('samples/simple.json', 'utf-8')
    impl = JSON.parse(impl)
    a.strictEqual(
        creative.compile(impl, {
            name: 'Broadstreet Ads'
        }),
        '<style>/* CSS: Broadstreet Ads */</style><div><!-- HTML:Broadstreet Ads --></div><script>// JS:Broadstreet Ads</script>'
    )
})