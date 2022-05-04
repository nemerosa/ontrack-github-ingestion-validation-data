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

const setValidationDataByRunId = (clientEnvironment, config, logging) => {
    if (logging) {
        core.info(`Calling ${clientEnvironment.url} 'by run id' with ${JSON.stringify(config)}`);
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