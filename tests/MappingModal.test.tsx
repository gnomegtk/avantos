import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

const dummyDependentForm = {
  id: 'dependent1',
  name: 'Dependent Form 1',
  fields: ['email', 'phone'],
  dependencies: [],
  prefillMapping: {}
};

describe('MappingModal', () => {
  it('renders global options and dependent form fields correctly', () => {
    const onClose = vi.fn();
    const onSelectMapping = vi.fn();

    render(
      <MappingModal
        fieldName="email"
        dependentForms={[dummyDependentForm]}
        onClose={onClose}
        onSelectMapping={onSelectMapping}
      />
    );

    // Check that Global Data section is rendered.
    expect(screen.getByTestId('global-data-header')).toBeInTheDocument();
    // Check that Dependent Forms section is rendered.
    expect(screen.getByTestId('dependent-forms-header')).toBeInTheDocument();
    // Verify one of the dependent fields (e.g., 'email') is displayed.
    expect(screen.getByText('email')).toBeInTheDocument();
  });
});

