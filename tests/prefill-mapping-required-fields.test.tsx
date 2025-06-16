import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PrefillMapping from '../src/components/PrefillMapping';
import { FormWithPrefill } from '../src/types';

describe('PrefillMapping Required Fields Validation', () => {
  it('displays validation error when required fields are left unmapped', async () => {
    const onUpdateMapping = vi.fn();

    let dummyForm: FormWithPrefill = {
      id: 'form1',
      name: 'Form 1',
      fields: ['email', 'name'],
      dependencies: [],
      prefillMapping: {
        email: { type: 'global', sourceGlobalKey: 'client_id' },
        name: { type: 'global', sourceGlobalKey: 'user_name' }
      },
      field_schema: {
        required: ['email', 'name']
      }
    };

    const { rerender } = render(
      <PrefillMapping form={dummyForm} allForms={[dummyForm]} onUpdateMapping={onUpdateMapping} />
    );

    // Initially, both mappings are shown
    expect(screen.getByText(/Global: client_id/i)).toBeInTheDocument();
    expect(screen.getByText(/Global: user_name/i)).toBeInTheDocument();

    // Locate the clear button for "email" within its field item
    const emailFieldItem = screen.getByText(/email/i).closest('.prefill-field');
    expect(emailFieldItem).toBeTruthy();
    const clearEmailButton = within(emailFieldItem!).getByRole('button', { name: /X/i });
    fireEvent.click(clearEmailButton);

    // onUpdateMapping should have been called correctly
    expect(onUpdateMapping).toHaveBeenCalledWith(dummyForm.id, 'email', null);

    // Update dummyForm to reflect that "email" is now unmapped
    dummyForm = {
      ...dummyForm,
      prefillMapping: { name: { type: 'global', sourceGlobalKey: 'user_name' } }
    };

    rerender(<PrefillMapping form={dummyForm} allForms={[dummyForm]} onUpdateMapping={onUpdateMapping} />);

    // Wait for the validation error to appear for "email"
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });

    // "name" mapping should still be present
    expect(screen.getByText(/Global: user_name/i)).toBeInTheDocument();
  });
});

