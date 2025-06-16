import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Enter Key Selection', () => {
  it('selects the first matching option when Enter is pressed in search input', () => {
    const onSelectMapping = vi.fn();
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]}  
        onClose={() => {}}
        onSelectMapping={onSelectMapping}
      />
    );

    // Type a query into the search input
    const searchInput = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'Action' } });

    // Get first matching option
    const firstOption = screen.getByText(/Action Property/i);
    firstOption.focus();

    // Press Enter while first option is focused
    fireEvent.keyDown(firstOption, { key: 'Enter', code: 'Enter' });

    // Verify that the first matching option was selected
    expect(onSelectMapping).toHaveBeenCalledWith({
      type: 'global',
      sourceGlobalKey: 'action_property',
    });
  });
});

