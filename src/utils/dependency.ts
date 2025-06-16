import { FormWithPrefill } from '../types';

export const getDependentForms = (
  form: FormWithPrefill,
  allForms: FormWithPrefill[]
): FormWithPrefill[] => {
  const result: Record<string, FormWithPrefill> = {};
  const visited = new Set<string>(); // Tracks visited forms to prevent cycles

  const visit = (formId: string) => {
    if (visited.has(formId) || formId === form.id) return; // Prevent infinite loops
    visited.add(formId);

    const depForm = allForms.find((f) => f.id === formId);
    if (depForm) {
      result[depForm.id] = depForm;
      (depForm.dependencies || []).forEach(visit);
    }
  };

  (form.dependencies || []).forEach(visit);
  return Object.values(result);
};

