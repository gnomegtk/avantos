import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Arrow Key Wrap', () => {
  it('wraps focus from the last option to the first (and vice versa) using arrow keys', () => {
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} // No dependent forms
        onClose={() => {}}
        onSelectMapping={() => {}}
      />
    );

    // Assume GLOBAL_OPTIONS provides two options:
    // "Action Property" and "Client Organisation Property"
    const firstOption = screen.getByText(/Action Property/i);
    const secondOption = screen.getByText(/Client Organisation Property/i);

    // Focus the last option (assumed to be secondOption)
    secondOption.focus();
    expect(document.activeElement).toBe(secondOption);

    // Press ArrowDown on the last option; focus should wrap to first option.
    fireEvent.keyDown(secondOption, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(document.activeElement).toBe(firstOption);

    // Now focus the first option.
    firstOption.focus();
    expect(document.activeElement).toBe(firstOption);

    // Press ArrowUp on the first option; focus should wrap to the last option.
    fireEvent.keyDown(firstOption, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(document.activeElement).toBe(secondOption);
  });
});

