import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PrefillMapping from '../src/components/PrefillMapping';
import { FormWithPrefill } from '../src/types';

describe('PrefillMapping Persistence', () => {
  it('persists selected mapping correctly across renders', () => {
    const dummyForm: FormWithPrefill = {
      id: 'form1',
      name: 'Form 1',
      fields: ['email'],
      dependencies: [],
      prefillMapping: {
        email: { type: 'global', sourceGlobalKey: 'user_id' }
      }
    };

    render(<PrefillMapping form={dummyForm} allForms={[dummyForm]} onUpdateMapping={() => {}} />);

    expect(screen.getByText(/Global: user_id/i)).toBeInTheDocument();
  });
});

