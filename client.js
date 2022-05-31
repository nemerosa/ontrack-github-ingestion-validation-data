const {fetch} = require('cross-fetch');
const core = require('@actions/core');

const ontrackClient = require('@nemerosa/ontrack-github-action-client');

const setValidationDataByRunId = async (clientEnvironment, config, logging) => {
    if (logging) {
        core.info(`Setting validation by run id with ${JSON.stringify(config)}`);
    }
    // GraphQL query
    const query = `
        mutation SetValidationDataByRunId(
            $owner: String!,
            $repository: String!,
            $runId: Long!,
            $validation: String!,
            $validationData: GitHubIngestionValidationDataInput!,
            $validationStatus: String
        ) {
            gitHubIngestionValidateDataByRunId(input: {
                owner: $owner,
                repository: $repository,
                runId: $runId,
                validation: $validation,
                validationData: $validationData,
                validationStatus: $validationStatus
            }) {
                errors {
                    message
                }
            }
        }
    `;
    // Variables
    const variables = {
        owner: config.owner,
        repository: config.repository,
        runId: config.runId,
        validation: config.validation,
        validationData: config.validationData,
        validationStatus: config.validationStatus,
    };
    // GraphQL call
    const result = await ontrackClient.graphQL(
        clientEnvironment,
        query,
        variables,
        logging
    )
    if (logging) {
        console.log('Result: ', result);
    }
    // OK
    return result;
};

const setValidationDataByBuildName = async (clientEnvironment, config, logging) => {
    if (logging) {
        core.info(`Setting validation by build name with ${JSON.stringify(config)}`);
    }
    // GraphQL query
    const query = `
        mutation SetValidationDataByBuildName(
            $owner: String!,
            $repository: String!,
            $buildName: String!,
            $validation: String!,
            $validationData: GitHubIngestionValidationDataInput!,
            $validationStatus: String
        ) {
            gitHubIngestionValidateDataByBuildName(input: {
                owner: $owner,
                repository: $repository,
                buildName: $buildName,
                validation: $validation,
                validationData: $validationData,
                validationStatus: $validationStatus
            }) {
                errors {
                    message
                }
            }
        }
    `;
    // Variables
    const variables = {
        owner: config.owner,
        repository: config.repository,
        buildName: config.buildName,
        validation: config.validation,
        validationData: config.validationData,
        validationStatus: config.validationStatus,
    };
    // GraphQL call
    const result = await ontrackClient.graphQL(
        clientEnvironment,
        query,
        variables,
        logging
    )
    if (logging) {
        console.log('Result: ', result);
    }
    // OK
    return result;
};

const setValidationDataByBuildLabel = async (clientEnvironment, config, logging) => {
    if (logging) {
        core.info(`Setting validation by build label with ${JSON.stringify(config)}`);
    }
    // GraphQL query
    const query = `
        mutation SetValidationDataByBuildLabel(
            $owner: String!,
            $repository: String!,
            $buildLabel: String!,
            $validation: String!,
            $validationData: GitHubIngestionValidationDataInput!,
            $validationStatus: String
        ) {
            gitHubIngestionValidateDataByBuildLabel(input: {
                owner: $owner,
                repository: $repository,
                buildLabel: $buildLabel,
                validation: $validation,
                validationData: $validationData,
                validationStatus: $validationStatus
            }) {
                errors {
                    message
                }
            }
        }
    `;
    // Variables
    const variables = {
        owner: config.owner,
        repository: config.repository,
        buildLabel: config.buildLabel,
        validation: config.validation,
        validationData: config.validationData,
        validationStatus: config.validationStatus,
    };
    // GraphQL call
    const result = await ontrackClient.graphQL(
        clientEnvironment,
        query,
        variables,
        logging
    )
    if (logging) {
        console.log('Result: ', result);
    }
    // OK
    return result;
};

const setValidationData = async (clientEnvironment, config, logging) => {
    if (config.buildLabel) {
        await setValidationDataByBuildLabel(clientEnvironment, config, logging);
    } else if (config.buildName) {
        await setValidationDataByBuildName(clientEnvironment, config, logging);
    } else {
        await setValidationDataByRunId(clientEnvironment, config, logging);
    }
};

const client = {
    setValidationData: setValidationData
}

module.exports = client;