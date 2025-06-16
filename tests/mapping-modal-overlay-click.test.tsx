import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Overlay Click', () => {
  it('calls onClose when clicking outside the modal', () => {
    const onClose = vi.fn();
    const onSelectMapping = vi.fn();

    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} // No dependent forms
        onClose={onClose}
        onSelectMapping={onSelectMapping}
      />
    );

    // Get the modal overlay.
    const overlay = screen.getByTestId('modal-overlay');
    expect(overlay).toBeInTheDocument();

    // Click on the overlay (outside the inner modal)
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

