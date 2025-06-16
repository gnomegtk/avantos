import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Without Dependent Forms', () => {
  it('does not render the dependent forms section when dependentForms is empty', () => {
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} // No dependent forms provided
        onClose={() => {}}
        onSelectMapping={() => {}}
      />
    );

    // Verify that the global data header is present.
    expect(screen.getByTestId('global-data-header')).toBeInTheDocument();

    // Verify that the dependent forms header is NOT rendered.
    expect(screen.queryByTestId('dependent-forms-header')).toBeNull();
  });
});

