import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Arrow Key Navigation & Search Input', () => {
  it('ensures arrow key navigation does not alter the search input value', () => {
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]}  
        onClose={() => {}}
        onSelectMapping={() => {}}
      />
    );

    // Type a query into the search input
    const searchInput = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'Action' } });

    // Get only list items inside the global data section
    const globalDataSection = screen.getByTestId('global-data-header').closest('.modal-section');
    const renderedOptions = globalDataSection 
      ? screen.getAllByRole('button', { container: globalDataSection })
        .filter((option) => option.tagName.toLowerCase() === 'li') // Ensure only list items
      : [];

    expect(renderedOptions.length).toBeGreaterThan(0);

    // Focus the first option
    renderedOptions[0].focus();
    expect(document.activeElement).toBe(renderedOptions[0]);

    // Navigate with arrow keys
    fireEvent.keyDown(renderedOptions[0], { key: 'ArrowDown', code: 'ArrowDown' });

    // Ensure focus moves correctly
    if (renderedOptions.length > 1) {
      expect(document.activeElement).toBe(renderedOptions[1]);
    }

    // Ensure search input value remains unchanged
    expect(searchInput.value).toBe('Action');
  });
});

