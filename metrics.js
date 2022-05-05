const YAML = require('yaml');

const parseYAMLMetrics = (yaml) => {
    const entries = YAML.parse(yaml);
    const data = {
        metrics: []
    };
    for (const [key, value] of Object.entries(entries)) {
        data.metrics.push({
            name: key,
            value: value
        });
    }
    return data;
};

module.exports = {
    parseYAMLMetrics: parseYAMLMetrics,
};
