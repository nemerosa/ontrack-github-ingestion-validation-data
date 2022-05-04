const {fetch} = require('cross-fetch');
const {gql, ApolloClient, HttpLink, InMemoryCache} = require("@apollo/client");
const core = require('@actions/core');

const checkEnvironment = (logging) => {
    // URL
    const url = process.env['ONTRACK_URL'];
    if (!url) {
        if (logging) core.info("ONTRACK_URL environment variable is not defined.")
        return false;
    }
    // Token
    const token = process.env['ONTRACK_TOKEN'];
    if (!token) {
        if (logging) core.info("ONTRACK_TOKEN secret is not defined.")
        return false;
    }
    // OK
    return {
        url: url,
        token: token,
    };
};

const setValidationDataByRunId = async (clientEnvironment, config, logging) => {
    if (logging) {
        core.info(`Calling ${clientEnvironment.url} 'by run id' with ${JSON.stringify(config)}`);
    }
    // Client initialization
    const client = new ApolloClient({
        link: new HttpLink({uri: `${clientEnvironment.url}/graphql`, fetch}),
        cache: new InMemoryCache(),
        headers: {
            'X-Ontrack-Token': clientEnvironment.token
        }
    });
    // Query to run
    const query = gql`
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
    // Running the query
    const result = await client.mutate({
        mutation: query,
        variables: {
            owner: config.owner,
            repository: config.repository,
            runId: config.runId,
            validation: config.validation,
            validationData: config.validationData,
            validationStatus: null
        }
    });
    if (logging) {
        console.log('Result: ', result);
    }
};

const setValidationData = (clientEnvironment, config, logging) => {
    if (config.buildLabel) {
        throw Error("Build label not implemented yet");
    } else if (config.buildName) {
        throw Error("Build name not implemented yet");
    } else {
        setValidationDataByRunId(clientEnvironment, config, logging)
    }
};

const client = {
    checkEnvironment: checkEnvironment,
    setValidationData: setValidationData
}

module.exports = client;