import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Keyboard Navigation', () => {
  it('allows keyboard users to navigate options using arrow keys', () => {
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} 
        onClose={() => {}}
        onSelectMapping={() => {}}
      />
    );

    const firstOption = screen.getByText(/Action Property/i);
    const secondOption = screen.getByText(/Client Organisation Property/i);

    // Focus the first option.
    firstOption.focus();
    expect(document.activeElement).toBe(firstOption);

    // Press ArrowDown to move focus to the next option.
    fireEvent.keyDown(firstOption, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(document.activeElement).toBe(secondOption);

    // Press ArrowUp to move focus back to the first option.
    fireEvent.keyDown(secondOption, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(document.activeElement).toBe(firstOption);
  });
});

