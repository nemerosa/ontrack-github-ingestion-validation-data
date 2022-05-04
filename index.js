const core = require('@actions/core');
const github = require('@actions/github');

try {
    // Getting all the arguments
    const repository = core.getInput('repository');
} catch (error) {
    core.setFailed(error.message);
}