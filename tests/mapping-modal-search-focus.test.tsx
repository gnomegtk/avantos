import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Search Input Focus', () => {
  it('retains focus on search input after selecting an option', () => {
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} // No dependent forms needed for this test.
        onClose={() => {}}
        onSelectMapping={() => {}}
      />
    );

    // Get the search input and type a query.
    const searchInput = screen.getByPlaceholderText(/Search/i);
    searchInput.focus();
    fireEvent.change(searchInput, { target: { value: 'Action' } });

    // Click a search result (assuming "Action Property" exists).
    const actionOption = screen.getByText(/Action Property/i);
    fireEvent.click(actionOption);

    // Verify the search input still has focus.
    expect(document.activeElement).toBe(searchInput);
  });
});

