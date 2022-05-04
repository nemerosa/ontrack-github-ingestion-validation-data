// noinspection ExceptionCaughtLocallyJS

const core = require('@actions/core');
const github = require('@actions/github');

try {
    // Getting all the arguments
    let owner = core.getInput('owner');
    let repository = core.getInput('repository');
    const buildName = core.getInput('build-name');
    const buildLabel = core.getInput('build-label');
    let validation = core.getInput('validation');

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
} catch (error) {
    core.setFailed(error.message);
}