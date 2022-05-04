// noinspection ExceptionCaughtLocallyJS

const core = require('@actions/core');
const github = require('@actions/github');
const YAML = require('yaml');
const fs = require('fs');
const junit = require('./junit');
const client = require('./client');

const parseMetricsValidationData = (path) => {
    const file = fs.readFileSync(path, 'utf8');
    return {
        type: "net.nemerosa.ontrack.extension.general.validation.MetricsValidationDataType",
        data: {
            metrics: YAML.parse(file)
        }
    };
};

const parseValidationData = async (type, path, logging) => {
    if (type === 'metrics') {
        return parseMetricsValidationData(path);
    } else if (type === 'junit') {
        return await junit.parseJUnitFiles(path, logging);
    } else {
        throw Error(`File validation data type not supported: ${type}`);
    }
};

async function run() {
    try {
        const logging = core.getBooleanInput('logging');

        // Checks that the client is ready, if not just exit without doing anything
        let clientEnvironment = client.checkEnvironment(logging);
        if (!clientEnvironment) {
            core.info("Ontrack is not configured. Not doing anything.");
            return;
        } else if (logging) {
            core.info(`Ontrack URL: ${clientEnvironment.url}`)
        }

        // Getting all the arguments
        let owner = core.getInput('owner');
        let repository = core.getInput('repository');
        const buildName = core.getInput('build-name');
        const buildLabel = core.getInput('build-label');
        let validation = core.getInput('validation');
        const inputValidationData = core.getInput('validation-data');
        const inputTestSummaryValidationData = core.getInput('test-summary-validation-data');
        const inputMetricsValidationData = core.getInput('metrics-validation-data');
        const fileValidationDataType = core.getInput('file-validation-data-type');
        const fileValidationDataPath = core.getInput('file-validation-data-path');

        // Setting the owner
        if (!owner) {
            owner = github.context.repo.owner;
        }

        // Setting the repository
        if (!repository) {
            repository = github.context.repo.repo;
        }

        // Build name & label cannot be specified together
        if (buildName && buildLabel) {
            throw Error('"build-name" and "build-label" cannot be both declared.');
        }

        // Validation name
        if (!validation) {
            validation = github.context.action;
        }

        // Extracting the validation data
        let validationData = {};
        if (inputValidationData) {
            validationData = YAML.parse(inputValidationData);
        } else if (inputTestSummaryValidationData) {
            validationData = {
                type: "net.nemerosa.ontrack.extension.general.validation.TestSummaryValidationDataType",
                data: YAML.parse(inputTestSummaryValidationData)
            };
        } else if (inputMetricsValidationData) {
            validationData = {
                type: "net.nemerosa.ontrack.extension.general.validation.MetricsValidationDataType",
                data: {
                    metrics: YAML.parse(inputMetricsValidationData)
                }
            };
        } else if (fileValidationDataType && fileValidationDataPath) {
            validationData = await parseValidationData(fileValidationDataType, fileValidationDataPath, logging);
        } else {
            throw Error('No validation data has been passed.')
        }

        // Logging
        core.info(`Owner:       ${owner}`);
        core.info(`Repository:  ${repository}`);
        // Logging of the build identification
        if (buildLabel) {
            core.info(`Build label: ${buildLabel}`);
        } else if (buildName) {
            core.info(`Build name:  ${buildName}`);
        } else {
            core.info(`Run ID:      ${github.context.runId}`);
        }
        // Logging the validation information
        core.info(`Validation:  ${validation}`);
        // Logging of the validation data
        core.info(`Validation:\n${JSON.stringify(validationData)}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
