import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PrefillMapping from '../src/components/PrefillMapping';
import { FormWithPrefill } from '../src/types';

const form: FormWithPrefill = {
  id: "formX",
  name: "Form X",
  fields: ["email", "name"],
  dependencies: [],
  prefillMapping: { email: null, name: { type: 'global', sourceGlobalKey: 'action_property' } }
};

describe('PrefillMapping', () => {
  it('opens the mapping modal when a field without mapping is clicked', () => {
    const onUpdateMapping = vi.fn();
    render(<PrefillMapping form={form} allForms={[form]} onUpdateMapping={onUpdateMapping} />);
    
    // "email" has no mapping, so clicking it should open the modal
    const emailField = screen.getByText(/email/i);
    fireEvent.click(emailField);
    
    expect(screen.getByText(/Select data element to map for "email"/i))
      .toBeInTheDocument();
  });

  it('does not open the modal when a field with mapping is clicked', () => {
    const onUpdateMapping = vi.fn();
    render(<PrefillMapping form={form} allForms={[form]} onUpdateMapping={onUpdateMapping} />);
    
    // "name" has a mapping, so clicking it should not open the modal.
    const nameField = screen.getByText(/name/i);
    fireEvent.click(nameField);
    expect(screen.queryByText(/Select data element to map for "name"/i))
      .toBeNull();
  });
  
  it('invokes onUpdateMapping when the clear button is clicked', () => {
    const onUpdateMapping = vi.fn();
    render(<PrefillMapping form={form} allForms={[form]} onUpdateMapping={onUpdateMapping} />);
    
    const clearButton = screen.getByRole('button', { name: /X/i });
    fireEvent.click(clearButton);
    expect(onUpdateMapping).toHaveBeenCalledWith(form.id, 'name', null);
  });
});

