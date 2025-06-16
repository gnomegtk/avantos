import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Dependent Option Keyboard Navigation', () => {
  it('selects a dependent option when Enter is pressed', () => {
    const onSelectMapping = vi.fn();
    const onClose = vi.fn();

    const dummyDependentForm = {
      id: 'dependent1',
      name: 'Dependent Form 1',
      fields: ['email', 'phone'],
      dependencies: [],
      prefillMapping: {}
    };

    render(
      <MappingModal
        fieldName="email"
        dependentForms={[dummyDependentForm]}
        onClose={onClose}
        onSelectMapping={onSelectMapping}
      />
    );

    // Find the dependent option "phone"
    const phoneOption = screen.getByText(/^phone$/i);
    
    // Simulate pressing the Enter key on the "phone" option.
    fireEvent.keyDown(phoneOption, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(onSelectMapping).toHaveBeenCalledWith({
      type: 'form',
      sourceFormId: dummyDependentForm.id,
      sourceField: 'phone'
    });
  });
});

