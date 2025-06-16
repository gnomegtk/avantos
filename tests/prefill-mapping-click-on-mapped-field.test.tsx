import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PrefillMapping from '../src/components/PrefillMapping';
import { FormWithPrefill } from '../src/types';

describe('PrefillMapping Mapped Field Click', () => {
  it('does not open the modal when clicking on a field that is already mapped', () => {
    const onUpdateMapping = vi.fn();
    const dummyForm: FormWithPrefill = {
      id: 'form1',
      name: 'Form 1',
      fields: ['email'],
      dependencies: [],
      prefillMapping: {
        email: { type: 'global', sourceGlobalKey: 'client_id' }
      },
      field_schema: { required: ['email'] }
    };

    render(
      <PrefillMapping form={dummyForm} allForms={[dummyForm]} onUpdateMapping={onUpdateMapping} />
    );

    // Clicking on a mapped field should not open the mapping modal.
    fireEvent.click(screen.getByText(/email/i));

    // The modal heading won't be in the document because the field is already mapped.
    expect(screen.queryByText(/Select data element to map for "email"/i)).toBeNull();
  });
});

