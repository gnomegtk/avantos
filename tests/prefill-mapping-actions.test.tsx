import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PrefillMapping from '../src/components/PrefillMapping';
import { FormWithPrefill } from '../src/types';

describe('PrefillMapping Actions', () => {
  it('removes mapping when "Clear Mapping" button is clicked', () => {
    const onUpdateMapping = vi.fn();
    const dummyForm: FormWithPrefill = {
      id: 'form1',
      name: 'Form 1',
      fields: ['email'],
      dependencies: [],
      prefillMapping: {
        email: { type: 'global', sourceGlobalKey: 'client_id' }
      }
    };

    render(<PrefillMapping form={dummyForm} allForms={[dummyForm]} onUpdateMapping={onUpdateMapping} />);
    
    const clearButton = screen.getByRole('button', { name: /X/i });
    fireEvent.click(clearButton);
    
    expect(onUpdateMapping).toHaveBeenCalledWith(dummyForm.id, 'email', null);
  });
});

