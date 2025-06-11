import { FormWithPrefill } from '../types';

export const getActionBlueprintGraph = async (): Promise<FormWithPrefill[]> => {
  // The endpoint matching the mock server route.
  const endpoint = '/api/v1/avantos/actions/blueprints/default/graph';
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch forms: ${response.statusText}`);
  }
  const json = await response.json();

  // Transform the blueprint data into an array of form objects.
  // The server returns an object with a "forms" key containing the form details.
  if (json.forms && Array.isArray(json.forms)) {
    const forms: FormWithPrefill[] = json.forms.map((form: any) => ({
      id: form.id,
      name: form.name,
      // Extract field names from the keys of field_schema.properties.
      fields: form.field_schema && form.field_schema.properties
        ? Object.keys(form.field_schema.properties)
        : [],
      // Dependencies are not provided here; using an empty array.
      dependencies: [],
      // Initialize with no prefill mapping.
      prefillMapping: {},
    }));
    return forms;
  } else {
    throw new Error("Unexpected data format: 'forms' array not found.");
  }
};

