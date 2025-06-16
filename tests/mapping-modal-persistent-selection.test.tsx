import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MappingModal from '../src/components/MappingModal';
import { PrefillMapping } from '../src/types';

const PersistentMappingModalWrapper: React.FC = () => {
  const [selectedMapping, setSelectedMapping] = useState<PrefillMapping | null>(null);
  const [show, setShow] = useState(true);

  return (
    <div>
      <button data-testid="toggle-modal" onClick={() => setShow((prev) => !prev)}>
        Toggle Modal
      </button>
      {show && (
        <MappingModal
          fieldName="email"
          dependentForms={[]} 
          onClose={() => setShow(false)}
          onSelectMapping={(mapping) => setSelectedMapping(mapping)}
          selectedMapping={selectedMapping}
        />
      )}
    </div>
  );
};

describe('MappingModal Persistent Selection', () => {
  it('preserves selected mapping when modal is closed and reopened', async () => {
    render(<PersistentMappingModalWrapper />);
    
    // Assume GLOBAL_OPTIONS contains an option "Action Property"
    const actionOption = screen.getByText(/Action Property/i);
    fireEvent.click(actionOption);
    
    // Expect the option to be marked as selected.
    await waitFor(() =>
      expect(screen.getByTestId('selected-option')).toBeInTheDocument()
    );
    
    // Toggle modal off.
    const toggleButton = screen.getByTestId('toggle-modal');
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
    
    // Toggle modal back on.
    fireEvent.click(toggleButton);
    await waitFor(() =>
      expect(screen.getByTestId('selected-option')).toBeInTheDocument()
    );
  });
});

