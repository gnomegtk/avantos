import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Escape Key Behavior', () => {
  it('closes the modal when Escape is pressed inside the search input', () => {
    const onClose = vi.fn();
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]}  
        onClose={onClose}
        onSelectMapping={() => {}}
      />
    );

    // Focus the search input
    const searchInput = screen.getByPlaceholderText(/Search/i);
    searchInput.focus();

    // Press Escape
    fireEvent.keyDown(searchInput, { key: 'Escape', code: 'Escape' });

    // Verify that onClose was called, meaning the modal closed
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

