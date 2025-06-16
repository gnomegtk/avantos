import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Cancel Button', () => {
  it('calls onClose when the CANCEL button is clicked', () => {
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

    // Find the CANCEL button and click it.
    const cancelButton = screen.getByText(/CANCEL/i);
    fireEvent.click(cancelButton);

    // Verify that onClose has been called.
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

