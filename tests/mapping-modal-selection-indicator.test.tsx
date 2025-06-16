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
      onSelectMapping={setSelectedMapping}
      selectedMapping={selectedMapping}
    />
  );
};

describe('MappingModal Selection Indicator', () => {
  it('visually marks a selected option when clicked', async () => {
    render(<TestWrapper />);

    // Click the "Action Property" option
    const actionOption = screen.getByText(/Action Property/i);
    fireEvent.click(actionOption);

    // Wait for selection state to update
    await waitFor(() => {
      expect(screen.getByTestId('selected-option')).toBeInTheDocument();
      expect(actionOption).toHaveClass('selected');
    });
  });
});

