import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Search State Reset on Reopen', () => {
  it('resets search input when modal is reopened (state is not persisted across mounts)', () => {
    const onClose = vi.fn();
    const onSelectMapping = vi.fn();

    // Render the modal instance.
    const { unmount } = render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} // no dependent forms for this test.
        onClose={onClose}
        onSelectMapping={onSelectMapping}
      />
    );
    
    // Get the search input and set a value.
    const searchInput = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'action' } });
    expect(searchInput.value).toBe('action');
    
    // Unmount the component to simulate closing the modal.
    unmount();
    
    // Render a fresh instance of the modal.
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} 
        onClose={onClose}
        onSelectMapping={onSelectMapping}
      />
    );
    
    // Verify that the search input is reset to empty in the new instance.
    const newSearchInput = screen.getByPlaceholderText(/Search/i);
    expect(newSearchInput.value).toBe('');
  });
});

