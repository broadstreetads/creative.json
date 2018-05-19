#!/usr/bin/env node
'use strict'

const creative = require('../')

let commands = {
    'validate-remote': function (url) {
        creative.validateRemote(url, function (err, valid) {
            if (!err && valid) {
                console.log ('Creative is valid')
            } else {
                console.log (`Error validating creative: ${err}`);
            }
        })
    },

    'validate-file': function (file) {
        try {
            if (creative.validateFile(file)) {
                console.log ('Creative is valid')
            } else {
                console.log ('Error validating creative');
                process.exit(1);
            }
        } catch (e) {
            console.log (`Error validating creative: ${e.toString()}`)
        }
    }
}

if (process.argv[2] && commands[process.argv[2]] && process.argv[3]) {
    commands[process.argv[2]](process.argv[3]);
} else {
    console.log (`Usage: cli.js [${Object.keys(commands).join('|')}] args`)
}