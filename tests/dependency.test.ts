import { describe, it, expect } from 'vitest';
import { getDependentForms } from '../src/utils/dependency';
import { FormWithPrefill } from '../src/types';

const formA: FormWithPrefill = {
  id: "formA",
  name: "Form A",
  fields: ["email", "name"],
  dependencies: [],
  prefillMapping: {}
};

const formB: FormWithPrefill = {
  id: "formB",
  name: "Form B",
  fields: ["phone"],
  dependencies: ["formA"],
  prefillMapping: {}
};

const formC: FormWithPrefill = {
  id: "formC",
  name: "Form C",
  fields: ["address"],
  dependencies: ["formB"],
  prefillMapping: {}
};

// Cycle case: formD depends on formE and formE depends on formD
const formD: FormWithPrefill = {
  id: "formD",
  name: "Form D",
  fields: ["data"],
  dependencies: ["formE"],
  prefillMapping: {}
};

const formE: FormWithPrefill = {
  id: "formE",
  name: "Form E",
  fields: ["info"],
  dependencies: ["formD"],
  prefillMapping: {}
};

describe('getDependentForms', () => {
  it('should return direct and transitive dependencies', () => {
    const result = getDependentForms(formC, [formA, formB, formC]);
    expect(result).toHaveLength(2);
    expect(result).toEqual(expect.arrayContaining([formA, formB]));
  });

  it('should handle undefined dependencies gracefully', () => {
    const formNoDeps = { ...formA, dependencies: undefined } as FormWithPrefill;
    const result = getDependentForms(formNoDeps, [formNoDeps]);
    expect(result).toEqual([]);
  });

  it('should handle cyclic dependencies without infinite loops', () => {
    const result = getDependentForms(formD, [formD, formE]);
    // Ensure only one dependent form is returned
    expect(result).toHaveLength(1);
    expect(result).toEqual(expect.arrayContaining([formE]));
  });
});

