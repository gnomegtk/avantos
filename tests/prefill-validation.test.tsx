import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PrefillMapping from '../src/components/PrefillMapping';
import { FormWithPrefill } from '../src/types';

describe('PrefillMapping Field Validation', () => {
  it('does not display fields with missing schemas', () => {
    const dummyForm: FormWithPrefill = {
      id: 'form1',
      name: 'Form 1',
      fields: [undefined, 'email'], // Campo inválido (undefined)
      dependencies: [],
      prefillMapping: {}
    };

    render(<PrefillMapping form={dummyForm} allForms={[dummyForm]} onUpdateMapping={() => {}} />);
    
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.queryByText(/undefined/i)).toBeNull(); // Campo inválido não deve ser exibido
  });
});

