import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormList from '../src/components/FormList';
import { FormWithPrefill } from '../src/types';

const forms: FormWithPrefill[] = [
  { id: "form1", name: "Form 1", fields: ["field1"], dependencies: [], prefillMapping: {} },
  { id: "form2", name: "Form 2", fields: ["field2"], dependencies: [], prefillMapping: {} },
];

describe('FormList', () => {
  it('renders the form list and handles click events', () => {
    const onSelectForm = vi.fn();
    render(<FormList forms={forms} selectedFormId="form1" onSelectForm={onSelectForm} />);
    
    // Check if the forms are rendered
    expect(screen.getByText(/Form 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Form 2/i)).toBeInTheDocument();

    const form2Item = screen.getByText(/Form 2/i);
    fireEvent.click(form2Item);
    expect(onSelectForm).toHaveBeenCalledWith("form2");
  });
});

