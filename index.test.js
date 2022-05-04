const junit = require('./junit');

test('parsing of JUnit reports', async () => {
    const path = 'test/junit/TEST-net.nemerosa.ontrack.common.VersionTest.xml';
    const summary = await junit(path);
    expect(summary.passed).toBe(16);
    expect(summary.skipped).toBe(0);
    expect(summary.failed).toBe(1);
});
