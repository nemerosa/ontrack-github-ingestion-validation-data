const junit = require('./junit');
const metrics = require('./metrics');

test('parsing of YAML metrics data', async () => {
    const yaml = `position: 2.1
speed: 15.0
acceleration: 7.1`;
    const data = metrics.parseYAMLMetrics(yaml);
    expect(data.metrics).toStrictEqual([
        {name: 'position', value: 2.1},
        {name: 'speed', value: 15},
        {name: 'acceleration', value: 7.1}
    ]);
});

test('parsing of one JUnit report', async () => {
    const path = 'test/junit/TEST-net.nemerosa.ontrack.common.VersionTest.xml';
    const summary = await junit.parseJUnitFile(path);
    expect(summary.passed).toBe(16);
    expect(summary.skipped).toBe(0);
    expect(summary.failed).toBe(1);
});

test('parsing of JUnit reports', async () => {
    const path = 'test/junit';
    const summary = await junit.parseJUnitFiles(path);
    expect(summary.type).toBe("net.nemerosa.ontrack.extension.general.validation.TestSummaryValidationDataType");
    expect(summary.data.passed).toBe(25);
    expect(summary.data.skipped).toBe(0);
    expect(summary.data.failed).toBe(1);
});
