import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Escape Key Behavior', () => {
  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    const onSelectMapping = vi.fn();

    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]}
        onClose={onClose}
        onSelectMapping={onSelectMapping}
      />
    );

    // Get the modal overlay by its test id.
    const overlay = screen.getByTestId('modal-overlay');
    expect(overlay).toBeInTheDocument();

    // Fire keyDown event on the overlay with Escape.
    fireEvent.keyDown(overlay, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});

