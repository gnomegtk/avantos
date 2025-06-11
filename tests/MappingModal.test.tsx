import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';
import { FormWithPrefill } from '../src/types';

const dummyForm: FormWithPrefill = {
  id: "form1",
  name: "Form 1",
  fields: ["field1"],
  dependencies: [],
  prefillMapping: {},
};

describe('MappingModal', () => {
  it('renders global data and dependent options and handles selections', () => {
    const onClose = vi.fn();
    const onSelectMapping = vi.fn();

    render(
      <MappingModal
        fieldName="testField"
        dependentForms={[dummyForm]}
        onClose={onClose}
        onSelectMapping={onSelectMapping}
      />
    );
    
    // Check if the global data option is visible (based on GLOBAL_OPTIONS)
    const globalOption = screen.getByText(/Action Property/i);
    expect(globalOption).toBeInTheDocument();
    
    // Check if the dependent form is rendered
    expect(screen.getByText(/Form 1/i)).toBeInTheDocument();
    
    // Simulate clicking on the global option
    fireEvent.click(globalOption);
    expect(onSelectMapping).toHaveBeenCalledWith({
      type: "global",
      sourceGlobalKey: "action_property"
    });
    
    // Simulate clicking on the dependent form field option ("field1")
    const dependentField = screen.getByText(/field1/i);
    fireEvent.click(dependentField);
    expect(onSelectMapping).toHaveBeenCalledWith({
      type: "form",
      sourceFormId: "form1",
      sourceField: "field1"
    });
  });
});

