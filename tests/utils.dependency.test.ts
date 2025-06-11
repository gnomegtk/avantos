// tests/utils.dependency.test.ts
import { describe, it, expect } from 'vitest';
import { getDependentForms } from '../src/utils/dependency';
import { FormWithPrefill } from '../src/types';

const formA: FormWithPrefill = {
  id: "formA",
  name: "Form A",
  fields: ["email", "name"],
  dependencies: [],
  prefillMapping: {},
};

const formB: FormWithPrefill = {
  id: "formB",
  name: "Form B",
  fields: ["phone"],
  dependencies: ["formA"],
  prefillMapping: {},
};

const formD: FormWithPrefill = {
  id: "formD",
  name: "Form D",
  fields: ["dynamic_checkbox_group", "dynamic_object", "email"],
  dependencies: ["formB"],
  prefillMapping: {},
};

const forms = [formA, formB, formD];

describe('getDependentForms', () => {
  it('should return the direct and transitive dependent forms for a given form', () => {
    const result = getDependentForms(formD, forms);
    expect(result).toHaveLength(2);
    // Deve incluir formB (dependência direta) e formA (dependência transitiva)
    expect(result).toEqual(expect.arrayContaining([formB, formA]));
  });
});

