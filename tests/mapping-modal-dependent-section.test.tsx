import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MappingModal from '../src/components/MappingModal';

// Dummy dependent form to supply as a prop.
const dummyDependentForm = {
  id: 'dependent1',
  name: 'My Dependent Form',
  fields: ['email', 'phone'],
  dependencies: [],
  prefillMapping: {}
};

describe('MappingModal Dependent Section Unaffected by Global Search', () => {
  it('displays dependent forms options regardless of the search input', () => {
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[dummyDependentForm]}
        onClose={() => {}}
        onSelectMapping={() => {}}
      />
    );

    // Verify the dependent forms section is visible initially.
    expect(screen.getByTestId('dependent-forms-header')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();
    expect(screen.getByText('phone')).toBeInTheDocument();

    // Type a search term that does not match any global options.
    const searchInput = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    // Global section should now display a fallback message.
    expect(screen.getByText('No matching global data found')).toBeInTheDocument();

    // But the dependent forms section should remain unaffected.
    expect(screen.getByTestId('dependent-forms-header')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();
    expect(screen.getByText('phone')).toBeInTheDocument();
  });
});

