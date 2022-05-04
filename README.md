ontrack-github-ingestion-validation-data
========================================

GitHub Action used to inject data into validations in Ontrack.

## Inputs

### `owner`

The name of the repository owner where the validation is to be set. If not set, the current repository owner will be used.

### `repository`

The name of the repository where the validation is to be set. If not set, the current repository will be used.

### `build-name`

Name of the Ontrack build where to create the validation. If not set and if `build-label` is not set either, the current workflow run ID will be used to identify the build.

### `build-label`

Release property (label) of the Ontrack build where to create the validation. If not set and if `build-name` is not set either, the current workflow run ID will be used to identify the build.

## Example usage

```yaml
uses: nemerosa/ontrack-github-ingestion-validation-data@v0.0.1
```
