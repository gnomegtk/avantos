import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

const dummyDependentForm = {
  id: 'dependent1',
  name: 'Dependent Form 1',
  fields: ['email', 'phone'],
  dependencies: [],
  prefillMapping: {}
};

describe('MappingModal Dependent Option Keyboard Navigation', () => {
  it('selects a dependent option when Enter is pressed', () => {
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

    // Use the dependent forms header test id for reliable selection.
    expect(screen.getByTestId('dependent-forms-header')).toBeInTheDocument();
    
    // Find the dependent option "phone".
    const phoneOption = screen.getByText((content, element) => element?.textContent === 'phone');
    
    // Simulate pressing Enter on that option.
    fireEvent.keyDown(phoneOption, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(onSelectMapping).toHaveBeenCalledWith({
      type: 'form',
      sourceFormId: dummyDependentForm.id,
      sourceField: 'phone',
    });
  });
});

