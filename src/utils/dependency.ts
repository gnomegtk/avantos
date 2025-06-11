// src/utils/dependency.ts

import { FormWithPrefill } from '../types';

// Recursively calculate the dependent forms (direct and transitive)
export const getDependentForms = (
  form: FormWithPrefill,
  allForms: FormWithPrefill[]
): FormWithPrefill[] => {
  const result: Record<string, FormWithPrefill> = {};

  const visit = (formId: string) => {
    const depForm = allForms.find((f) => f.id === formId);
    if (depForm && !result[depForm.id]) {
      result[depForm.id] = depForm;
      // Se "dependencies" estiver indefinido, usamos um array vazio
      (depForm.dependencies || []).forEach(visit);
    }
  };

  (form.dependencies || []).forEach(visit);
  return Object.values(result);
};

