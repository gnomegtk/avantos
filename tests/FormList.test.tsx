import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormList from '../src/components/FormList';
import { FormWithPrefill } from '../src/types';

const dummyForms: FormWithPrefill[] = [
  {
    id: "f1",
    name: "Form 1",
    fields: ["email", "name"],
    dependencies: [],
    prefillMapping: {}
  },
  {
    id: "f2",
    name: "Form 2",
    fields: ["phone"],
    dependencies: [],
    prefillMapping: {}
  }
];

describe('FormList', () => {
  it('renders a list of forms', async () => {
    render(<FormList forms={dummyForms} onSelectForm={vi.fn()} />);
    
    await waitFor(() => {
      expect(screen.getByText(/Form 1/)).toBeInTheDocument();
      expect(screen.getByText(/Form 2/)).toBeInTheDocument();
    });
  });

  it('calls onSelectForm when a form item is clicked', () => {
    const onSelectForm = vi.fn();
    render(<FormList forms={dummyForms} onSelectForm={onSelectForm} />);
    
    const formItem = screen.getByText(/Form 1/);
    fireEvent.click(formItem);
    expect(onSelectForm).toHaveBeenCalledWith(dummyForms[0].id);
  });
});

