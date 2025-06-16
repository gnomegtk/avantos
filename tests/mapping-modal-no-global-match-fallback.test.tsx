import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Global Fallback Message', () => {
  it('displays a fallback message and does not render a global options list when no match is found', () => {
    const onClose = vi.fn();
    const onSelectMapping = vi.fn();

    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} // No dependent forms for this test
        onClose={onClose}
        onSelectMapping={onSelectMapping}
      />
    );

    // Enter a search term that does not match any global options.
    fireEvent.change(screen.getByPlaceholderText(/Search/i), { target: { value: 'nonexistent' } });

    // Select the global header **by test id** (avoids ambiguity).
    const globalHeader = screen.getByTestId('global-data-header');
    expect(globalHeader).toBeInTheDocument();

    // Get the container element **closest** to the global header.
    const globalSection = globalHeader.closest('.modal-section');
    expect(globalSection).toBeTruthy();

    // Verify that **no** <ul> element is rendered inside the global section.
    expect(within(globalSection!).queryByRole('list')).toBeNull();

    // Confirm that the **fallback message** is displayed.
    expect(screen.getByText('No matching global data found')).toBeInTheDocument();
  });
});

