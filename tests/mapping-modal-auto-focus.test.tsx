import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Auto Focus', () => {
  it('automatically focuses the search input on mount', () => {
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} // No dependent forms for this test
        onClose={() => {}}
        onSelectMapping={() => {}}
      />
    );

    const searchInput = screen.getByPlaceholderText(/Search/i);
    expect(searchInput).toHaveFocus();
  });
});

