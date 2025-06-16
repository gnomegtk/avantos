import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormList from '../src/components/FormList';
import { FormWithPrefill } from '../src/types';

describe('FormList Performance Test', () => {
  it('renders efficiently with a large dataset', () => {
    const largeForms: FormWithPrefill[] = Array.from({ length: 1000 }, (_, i) => ({
      id: `f${i}`,
      name: `Form ${i}`,
      fields: ["email"],
      dependencies: [],
      prefillMapping: {}
    }));

    render(<FormList forms={largeForms} onSelectForm={vi.fn()} />);
    
    // Ensure that an entry near the end of the dataset is rendered correctly
    expect(screen.getByText(/Form 999/i)).toBeInTheDocument();
  });
});

