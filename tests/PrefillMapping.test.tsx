import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PrefillMapping from '../src/components/PrefillMapping';
import { FormWithPrefill } from '../src/types';

const form: FormWithPrefill = {
  id: "formD",
  name: "Form D",
  fields: ["field1", "field2"],
  dependencies: [],
  prefillMapping: { field1: null, field2: null }
};

describe('PrefillMapping', () => {
  it('opens the mapping modal when clicking on a field without a mapping', () => {
    render(
      <PrefillMapping
        form={form}
        allForms={[form]}
        onUpdateMapping={() => {}}
      />
    );
    
    const fieldItem = screen.getByText(/field1/i);
    fireEvent.click(fieldItem);
    
    expect(screen.getByText(/Select data element to map for "field1"/i)).toBeInTheDocument();
  });
});

