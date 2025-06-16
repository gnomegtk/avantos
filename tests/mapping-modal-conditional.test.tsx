import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Conditional Rendering', () => {
  it('renders dependent form section when dependencies exist', () => {
    const dummyDependentForm = {
      id: 'dependent1',
      name: 'Dependent Form 1',
      fields: ['email'],
      dependencies: [],
      prefillMapping: {}
    };

    render(
      <MappingModal
        fieldName="email"
        dependentForms={[dummyDependentForm]}
        onClose={vi.fn()}
        onSelectMapping={vi.fn()}
      />
    );

    expect(screen.getByText(/Dependent Forms/i)).toBeInTheDocument();
  });

  it('does not render dependent form section when there are no dependencies', () => {
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]}
        onClose={vi.fn()}
        onSelectMapping={vi.fn()}
      />
    );

    expect(screen.queryByText(/Dependent Forms/i)).toBeNull();
  });
});

