import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PrefillMapping from '../src/components/PrefillMapping';
import { FormWithPrefill } from '../src/types';

describe('PrefillMapping Undo and Redo', () => {
  it('removes mapping and correctly restores it when reselected', async () => {
    const onUpdateMapping = vi.fn();
    
    let dummyForm: FormWithPrefill = {
      id: 'form1',
      name: 'Form 1',
      fields: ['email'],
      dependencies: [],
      prefillMapping: {
        email: { type: 'global', sourceGlobalKey: 'client_id' }
      }
    };

    const { rerender } = render(
      <PrefillMapping form={dummyForm} allForms={[dummyForm]} onUpdateMapping={onUpdateMapping} />
    );

    // Ensure initial mapping exists
    expect(screen.getByText(/Global: client_id/i)).toBeInTheDocument();

    // Click the clear button for "email"
    const clearEmailButton = screen.getByRole('button', { name: /X/i });
    fireEvent.click(clearEmailButton);

    // Ensure update function is called correctly
    expect(onUpdateMapping).toHaveBeenCalledWith(dummyForm.id, 'email', null);

    // Update form state to reflect cleared mapping
    dummyForm = {
      ...dummyForm,
      prefillMapping: {}
    };

    rerender(<PrefillMapping form={dummyForm} allForms={[dummyForm]} onUpdateMapping={onUpdateMapping} />);

    // Ensure "client_id" mapping is removed
    await waitFor(() => {
      expect(screen.queryByText(/Global: client_id/i)).toBeNull();
    });

    // Simulate reselecting "client_id" mapping
    fireEvent.click(screen.getByText(/email/i)); // Open mapping modal
    await waitFor(() => expect(screen.getByText(/Select data element to map for "email"/i)).toBeInTheDocument());

    const actionOption = screen.getByText(/Action Property/i); // Assuming Action Property exists in global options
    fireEvent.click(actionOption);

    expect(onUpdateMapping).toHaveBeenCalledWith(dummyForm.id, 'email', { type: 'global', sourceGlobalKey: 'action_property' });

    // Update form state to reflect restored mapping
    dummyForm = {
      ...dummyForm,
      prefillMapping: {
        email: { type: 'global', sourceGlobalKey: 'action_property' }
      }
    };

    rerender(<PrefillMapping form={dummyForm} allForms={[dummyForm]} onUpdateMapping={onUpdateMapping} />);

    // Validate that mapping was restored
    await waitFor(() => {
      expect(screen.getByText(/Global: action_property/i)).toBeInTheDocument();
    });
  });
});

