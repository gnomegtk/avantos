import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Tab Key Navigation', () => {
  it('allows users to navigate through options using the Tab key', async () => {
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} 
        onClose={() => {}}
        onSelectMapping={() => {}}
      />
    );

    const options = screen.getAllByRole('button');

    // Focus first option
    options[0].focus();
    expect(document.activeElement).toBe(options[0]);

    // Use userEvent.tab() to move focus forward
    await userEvent.tab();
    expect(document.activeElement).toBe(options[1]);

    // Use userEvent.tab() to move focus forward again
    await userEvent.tab();
    expect(document.activeElement).not.toBe(options[1]);
  });
});

