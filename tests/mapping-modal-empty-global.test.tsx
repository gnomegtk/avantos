import { describe, it, expect, vi } from 'vitest'; // Import vi directly from Vitest
import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the constants module before importing the component
vi.mock('../src/constants', () => ({
  GLOBAL_OPTIONS: [],
}));

import MappingModal from '../src/components/MappingModal';

describe('MappingModal Empty Global Options', () => {
  it('displays fallback message when global options are empty', () => {
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} // No dependent forms needed for this test.
        onClose={() => {}}
        onSelectMapping={() => {}}
      />
    );

    // Verify the fallback message is displayed when no global options are available.
    expect(screen.getByText('No matching global data found')).toBeInTheDocument();
  });
});

