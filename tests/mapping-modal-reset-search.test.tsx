import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Reset Search Input', () => {
  it('resets search input state on unmount and remount', () => {
    const onClose = vi.fn();
    const onSelectMapping = vi.fn();

    // Render the modal for the first time.
    const { unmount } = render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} // No dependent forms for this test
        onClose={onClose}
        onSelectMapping={onSelectMapping}
      />
    );

    // Verify the initial search input is empty.
    const searchInput = screen.getByPlaceholderText(/Search/i);
    expect(searchInput).toHaveValue("");

    // Change the search input value.
    fireEvent.change(searchInput, { target: { value: "action" } });
    expect(searchInput).toHaveValue("action");

    // Simulate clicking the CANCEL button (calls onClose).
    const cancelButton = screen.getByText(/CANCEL/i);
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalled();

    // Unmount the modal.
    unmount();

    // Render the modal again to simulate a remount.
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]}
        onClose={onClose}
        onSelectMapping={onSelectMapping}
      />
    );

    // Verify that the search input is reset (i.e. empty) after remounting.
    const newSearchInput = screen.getByPlaceholderText(/Search/i);
    expect(newSearchInput).toHaveValue("");
  });
});

