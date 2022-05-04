const glob = require('@actions/glob');
const {XMLParser} = require("fast-xml-parser");
const fs = require('fs');

async function parseJUnitFiles(path) {
    const globber = await glob.create(`${path}/*.xml`);
    let totalPassed = 0;
    let totalSkipped = 0;
    let totalFailed = 0;
    for await (const file of globber.globGenerator()) {
        const summary = await parseJUnitFile(file);
        totalPassed += summary.passed;
        totalSkipped += summary.skipped;
        totalFailed += summary.failed;
    }
    return {
        type: "net.nemerosa.ontrack.extension.general.validation.TestSummaryValidationDataType",
        data: {
            passed: totalPassed,
            skipped: totalSkipped,
            failed: totalFailed
        }
    };
}

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

module.exports = {
    parseJUnitFiles: parseJUnitFiles,
    parseJUnitFile: parseJUnitFile
};
