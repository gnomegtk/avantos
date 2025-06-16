import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('Snapshot Tests', () => {
  it('MappingModal matches snapshot', () => {
    const { container } = render(
      <MappingModal
        fieldName="email"
        dependentForms={[
          {
            id: 'form1',
            name: 'Form 1',
            fields: ['email', 'name'],
            dependencies: [],
            prefillMapping: {}
          }
        ]}
        onClose={() => {}}
        onSelectMapping={() => {}}
        selectedMapping={null}
      />
    );
    expect(container).toMatchSnapshot();
  });
});

