const {XMLParser} = require("fast-xml-parser");
const fs = require('fs');

async function parseJUnitFile(path) {
    const parser = new XMLParser({
        ignoreAttributes: false
    });
    const xml = parser.parse(fs.readFileSync(path));
    const suite = xml.testsuite;
    const tests = Number(suite["@_tests"]);
    const skipped = Number(suite["@_skipped"]);
    const failures = Number(suite["@_failures"]);
    const errors = Number(suite["@_errors"]);
    const localFailed = failures + errors;
    const localSkipped = skipped;
    const localPassed = tests - localFailed;
    return {
        passed: localPassed,
        skipped: localSkipped,
        failed: localFailed
    };
}

module.exports = parseJUnitFile;
