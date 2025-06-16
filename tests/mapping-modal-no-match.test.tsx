import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal No Matching Options', () => {
  it('renders fallback message and does not render a global options list when no match is found', () => {
    const onClose = vi.fn();
    const onSelectMapping = vi.fn();

    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} // No dependent forms for this test.
        onClose={onClose}
        onSelectMapping={onSelectMapping}
      />
    );

    // Enter a search term that does not match any global options.
    fireEvent.change(screen.getByPlaceholderText(/Search/i), {
      target: { value: 'zzzzzz' },
    });

    // Use the test id to uniquely select the header.
    const globalHeader = screen.getByTestId('global-data-header');
    expect(globalHeader).toBeInTheDocument();

    // Get the container element for the global section.
    const globalSection = globalHeader.closest('.modal-section');
    expect(globalSection).toBeTruthy();

    // Verify that no <ul> element is rendered in the global section.
    const globalList = globalSection?.querySelector('ul');
    expect(globalList).toBeNull();

    // Verify that the fallback message is displayed.
    expect(screen.getByText('No matching global data found')).toBeInTheDocument();
  });
});

