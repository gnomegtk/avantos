import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Accidental Close Prevention', () => {
  it('does not close when clicking inside the modal', () => {
    const onClose = vi.fn();
    const onSelectMapping = vi.fn();

    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} // No dependent forms for this test.
        onClose={onClose}
        onSelectMapping={onSelectMapping}
      />
    );

    // Get an element inside the modal (e.g., the header)
    const modalHeader = screen.getByText(/Select data element to map for/i);

    // Click inside the modal
    fireEvent.click(modalHeader);

    // Ensure that onClose was **not** called
    expect(onClose).not.toHaveBeenCalled();
  });
});

