import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PrefillMapping from '../src/components/PrefillMapping';
import { FormWithPrefill } from '../src/types';

describe('PrefillMapping Not Required Fields', () => {
  // Create a dummy form with two fields.
  // Only "title" is required, while "description" is not.
  const dummyForm: FormWithPrefill = {
    id: 'form2',
    name: 'Form 2',
    fields: ['title', 'description'],
    dependencies: [],
    prefillMapping: {
      // "title" is mapped; "description" remains unmapped.
      title: { type: 'global', sourceGlobalKey: 'main_title' }
    },
    field_schema: {
      required: ['title'] // Only "title" is required.
    }
  };

  it('does not display a validation error for a non-required unmapped field', () => {
    render(
      <PrefillMapping
        form={dummyForm}
        allForms={[dummyForm]}
        onUpdateMapping={vi.fn()}
      />
    );

    // For the unmapped "description" field, check that no error text is shown.
    const descriptionFieldItem = screen.getByText(/description/i).closest('.prefill-field');
    expect(descriptionFieldItem).toBeTruthy();
    // There should not be any element with the class "error-text" inside the "description" field item.
    expect(descriptionFieldItem?.querySelector('.error-text')).toBeNull();
  });

  it('opens the modal when an unmapped non-required field is clicked', async () => {
    render(
      <PrefillMapping
        form={dummyForm}
        allForms={[dummyForm]}
        onUpdateMapping={vi.fn()}
      />
    );

    // Click on the unmapped "description" field.
    const descriptionField = screen.getByText(/description/i);
    fireEvent.click(descriptionField);

    // Wait for the modal to appear and check that its header includes the field name.
    await waitFor(() => {
      expect(
        screen.getByText(/Select data element to map for "description"/i)
      ).toBeInTheDocument();
    });
  });
});

