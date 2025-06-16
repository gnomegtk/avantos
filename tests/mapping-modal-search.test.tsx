// tests/mapping-modal-search.test.tsx
import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Search Functionality', () => {
  it('filters mapping options based on search term', () => {
    // Dummy form to provide dependentForms for the modal
    const dummyForm = {
      id: 'form1',
      name: 'Form 1',
      fields: ['email', 'name'],
      dependencies: [],
      prefillMapping: {}
    };

    render(
      <MappingModal
        fieldName="email"
        dependentForms={[dummyForm]}
        onClose={vi.fn()}
        onSelectMapping={vi.fn()}
      />
    );

    // Change the search input, using a term that should match one of the global options.
    // Assuming GLOBAL_OPTIONS includes an option with label "Action Property".
    const searchInput = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'action' } });

    // Find the "Global Data" section and restrict our query within that list
    const globalDataSection = screen.getByText(/Global Data/i);
    const globalList = globalDataSection.parentElement?.querySelector('ul');
    expect(globalList).toBeTruthy();

    if (globalList) {
      const { queryByText } = within(globalList);
      // Expect "Action Property" to appear in the list
      expect(queryByText(/Action Property/i)).toBeInTheDocument();
      // Expect "Client Organisation Property" to be absent in the filtered result
      expect(queryByText(/Client Organisation Property/i)).toBeNull();
    }
  });
});

