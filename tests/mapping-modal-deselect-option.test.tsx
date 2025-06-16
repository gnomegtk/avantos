import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MappingModal from '../src/components/MappingModal';
import { PrefillMapping } from '../src/types';

const TestWrapper: React.FC = () => {
  const [selectedMapping, setSelectedMapping] = useState<PrefillMapping | null>(null);

  return (
    <MappingModal
      fieldName="email"
      dependentForms={[]}  
      onClose={() => {}}
      onSelectMapping={(mapping) => setSelectedMapping((prev) => prev?.sourceGlobalKey === mapping.sourceGlobalKey ? null : mapping)}
      selectedMapping={selectedMapping}
    />
  );
};

describe('MappingModal Deselect Option', () => {
  it('allows users to deselect an option after selecting it', async () => {
    render(<TestWrapper />);

    // Click the "Action Property" option
    const actionOption = screen.getByText(/Action Property/i);
    fireEvent.click(actionOption);

    // Wait for selection state to update
    await waitFor(() => {
      expect(screen.getByTestId('selected-option')).toBeInTheDocument();
    });

    // Click the same option again to deselect it
    fireEvent.click(actionOption);

    // Wait for deselection state
    await waitFor(() => {
      expect(screen.queryByTestId('selected-option')).toBeNull();
    });
  });
});

