import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Case Insensitive Search', () => {
  it('displays matching global options regardless of case in the search term', () => {
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} // No dependent forms for this test
        onClose={() => {}}
        onSelectMapping={() => {}}
      />
    );

    // Find the search input and enter a string in uppercase
    const searchInput = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'ACTION' } });

    // Verify that the "Action Property" option is displayed
    expect(screen.getByText(/Action Property/i)).toBeInTheDocument();

    // Optionally, verify that the option not matching the term is not displayed
    expect(screen.queryByText(/Client Organisation Property/i)).toBeNull();
  });
});

