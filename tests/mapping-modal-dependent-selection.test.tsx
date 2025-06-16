import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

const dummyDependentForm = {
  id: 'dependent1',
  name: 'Dependent Form 1',
  fields: ['email', 'username'],
  dependencies: [],
  prefillMapping: {}
};

describe('MappingModal Dependent Option Selection', () => {
  it('calls onSelectMapping with correct data when a dependent option is selected', () => {
    const onSelectMapping = vi.fn();
    const onClose = vi.fn();

    render(
      <MappingModal
        fieldName="email"
        dependentForms={[dummyDependentForm]}
        onClose={onClose}
        onSelectMapping={onSelectMapping}
      />
    );

    // Verify that the Dependent Forms section exists.
    expect(screen.getByTestId('dependent-forms-header')).toBeInTheDocument();

    // Use within() to find the dependent option "email".
    const dependentSection = screen.getByTestId('dependent-forms-header').closest('.modal-section');
    const emailOption = within(dependentSection!).getByText('email');
    fireEvent.click(emailOption);

    expect(onSelectMapping).toHaveBeenCalledWith({
      type: 'form',
      sourceFormId: dummyDependentForm.id,
      sourceField: 'email'
    });
  });
});

