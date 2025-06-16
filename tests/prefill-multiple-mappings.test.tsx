import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PrefillMapping from '../src/components/PrefillMapping';
import { FormWithPrefill } from '../src/types';

describe('PrefillMapping Multiple Mappings', () => {
  it('correctly maintains multiple field mappings', async () => {
    const onUpdateMapping = vi.fn();
    
    let dummyForm: FormWithPrefill = {
      id: 'form1',
      name: 'Form 1',
      fields: ['email', 'username'],
      dependencies: [],
      prefillMapping: {
        email: { type: 'global', sourceGlobalKey: 'client_id' },
        username: { type: 'global', sourceGlobalKey: 'user_name' }
      }
    };

    const { rerender } = render(
      <PrefillMapping form={dummyForm} allForms={[dummyForm]} onUpdateMapping={onUpdateMapping} />
    );

    // Ensure initial mappings are present
    expect(screen.getByText(/Global: client_id/i)).toBeInTheDocument();
    expect(screen.getByText(/Global: user_name/i)).toBeInTheDocument();

    // Click the clear button for "email"
    const clearEmailButton = screen.getAllByRole('button', { name: /X/i })[0];
    fireEvent.click(clearEmailButton);

    // Ensure update function is called correctly
    expect(onUpdateMapping).toHaveBeenCalledWith('form1', 'email', null);

    // **Force the component to re-render with updated mappings**
    dummyForm = {
      ...dummyForm,
      prefillMapping: {
        username: { type: 'global', sourceGlobalKey: 'user_name' }
      }
    };
    
    rerender(<PrefillMapping form={dummyForm} allForms={[dummyForm]} onUpdateMapping={onUpdateMapping} />);

    // Validate that "client_id" mapping is gone, while "user_name" remains
    await waitFor(() => {
      expect(screen.getByText(/Global: user_name/i)).toBeInTheDocument();
      expect(screen.queryByText(/Global: client_id/i)).toBeNull();
    });
  });
});

