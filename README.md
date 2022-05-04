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

### `validation`

Name of the validation stamp to create. Defaults to the current step name.
