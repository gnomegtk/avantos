import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

const dummyDependentForm = {
  id: 'dependent1',
  name: 'Dependent Form 1',
  fields: ['propertyField', 'email'],
  dependencies: [],
  prefillMapping: {}
};

describe('MappingModal Composite Search', () => {
  it('displays matching options from both Global and Dependent sections', () => {
    const onClose = vi.fn();
    const onSelectMapping = vi.fn();

    render(
      <MappingModal
        fieldName="email"
        dependentForms={[dummyDependentForm]}
        onClose={onClose}
        onSelectMapping={onSelectMapping}
      />
    );

    const searchInput = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'property' } });
    
    // Check Global Data section.
    const globalSection = screen.getByTestId('global-data-header').closest('.modal-section');
    expect(within(globalSection!).getByText(/Action Property/i)).toBeInTheDocument();
    
    // Check Dependent Forms section.
    const dependentSection = screen.getByTestId('dependent-forms-header').closest('.modal-section');
    expect(within(dependentSection!).getByText('propertyField')).toBeInTheDocument();
  });
});

