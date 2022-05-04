ontrack-github-ingestion-validation-data
========================================

GitHub Action used to inject data into validations in Ontrack.

## Example usage

```yaml
- name: 'my-validation'
  uses: nemerosa/ontrack-github-ingestion-validation-data@v0.0.1
```

## Inputs

### Project identification

By default, the current repository is used to identify the Ontrack project where the validation must be created. If need be, another repository can be specified.

#### `owner`

The name of the repository owner where the validation is to be set. If not set, the current repository owner will be used.

#### `repository`

The name of the repository where the validation is to be set. If not set, the current repository will be used.

### Build identification

By default, the current workflow run ID will be used to identify the build to validate. It's also possible to use the actual build _name_ or its _label_.

#### `build-name`

Name of the Ontrack build where to create the validation. If not set and if `build-label` is not set either, the current workflow run ID will be used to identify the build.

#### `build-label`

Release property (label) of the Ontrack build where to create the validation. If not set and if `build-name` is not set either, the current workflow run ID will be used to identify the build.

### Validation

#### `validation`

Name of the validation stamp to create. Defaults to the current step name.

#### Validation data

One of the following options must be given.

##### `validation-data`

YAML object describing the validation.

Two required fields:

* `type` - FQCN of the validation type in Ontrack
* `data` - JSON/YAML representation of the validation data

For example, for a test summary:

```yaml
validation-data: |-
  type: "net.nemerosa.ontrack.extension.general.validation.TestSummaryValidationDataType"
  data:
    passed: 15
    skipped: 8
    failed: 5
```

##### `test-summary-validation-data`

Shortcut for some test summary validation data.

For example:

```yaml
test-summary-validation-data: |-
  passed: 15
  skipped: 8
  failed: 5
```

##### `metrics-validation-data`

Shortcut for some metrics validation data.

For example:

```yaml
metrics-validation-data: |-
  position: 2.1
  speed: 15.0
  acceleration: 7.1
```
