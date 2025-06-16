import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MappingModal from '../src/components/MappingModal';
import { GLOBAL_OPTIONS } from '../src/constants';

describe('MappingModal Filtered Global Options Count', () => {
  it('renders the correct number of global options after applying a search filter', () => {
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} // No dependent forms for this test
        onClose={() => {}}
        onSelectMapping={() => {}}
      />
    );
    
    // Type a search term that should match some of the global options.
    // In our constants, options like "Action Property" and "Client Organisation Property" likely include the word "Property".
    const searchInput = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'Property' } });
    
    // Find the global section and get the <ul> of global options.
    const globalSection = screen.getByTestId('global-data-header').closest('.modal-section');
    const list = globalSection?.querySelector('ul');
    const renderedCount = list ? list.children.length : 0;
    
    // Calculate expected number of options from GLOBAL_OPTIONS that include the search term.
    const expectedCount = GLOBAL_OPTIONS.filter(option =>
      option.label.toLowerCase().includes('property'.toLowerCase())
    ).length;
    
    expect(renderedCount).toBe(expectedCount);
  });
});

