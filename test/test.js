'use strict'
const TestRunner = require('test-runner')
const creative = require('../')
const a = require('assert')
const fs = require('fs')
const glob = require('glob')

const runner = new TestRunner()

runner.test('compile simple creative', function (t) {
    let impl = fs.readFileSync('sample-creatives/simple.json', 'utf-8')
    impl = JSON.parse(impl)
    a.strictEqual(
        creative.compile(impl, {
            name: 'Broadstreet Ads'
        }),
        '<style>/* CSS: Broadstreet Ads */</style><div><!-- HTML:Broadstreet Ads --></div><script>// JS:Broadstreet Ads</script>'
    )
})

glob.sync('sample-creatives/*.json').forEach(file => {
    runner.test(`validate all sample creatives: ${file}` , function (t) {
        let impl = fs.readFileSync(file, 'utf-8')
        impl = JSON.parse(impl)
        a.strictEqual(
            creative.validate(impl),
            true
        )
    })
})