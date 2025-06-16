import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MappingModal from '../src/components/MappingModal';
import { GLOBAL_OPTIONS } from '../src/constants';

describe('MappingModal Global Options Sorting', () => {
  it('displays global options in alphabetical order', () => {
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} // No dependent forms for this test.
        onClose={() => {}}
        onSelectMapping={() => {}}
      />
    );

    // Extract the global options, filtering out any unintended elements like CANCEL.
    const renderedOptions = screen.getAllByRole('button')
      .map((el) => el.textContent)
      .filter((text) => GLOBAL_OPTIONS.some((opt) => opt.label === text)); // Ensure only valid options are included.

    // Sort the original GLOBAL_OPTIONS array alphabetically.
    const expectedOrder = [...GLOBAL_OPTIONS]
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((option) => option.label);

    // Ensure the order matches.
    expect(renderedOptions).toEqual(expectedOrder);
  });
});

