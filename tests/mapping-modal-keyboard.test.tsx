import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Keyboard Navigation', () => {
  it('selects a global option when Enter is pressed', () => {
    const onSelectMapping = vi.fn();
    const onClose = vi.fn();

    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]}  
        onClose={onClose}
        onSelectMapping={onSelectMapping}
      />
    );

    // Get first global option (assumes "Action Property" exists).
    const actionOption = screen.getByText(/Action Property/i);

    // Focus it.
    actionOption.focus();
    expect(document.activeElement).toBe(actionOption);

    // Press Enter.
    fireEvent.keyDown(actionOption, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(onSelectMapping).toHaveBeenCalledWith({
      type: 'global',
      sourceGlobalKey: 'action_property',
    });
  });
});

