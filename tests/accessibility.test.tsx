// tests/accessibility.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MappingModal from '../src/components/MappingModal';
import { FormWithPrefill } from '../src/types';

describe('MappingModal Accessibility', () => {
  it('should call onClose when the CANCEL button is clicked', () => {
    const onClose = vi.fn();
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]}
        onClose={onClose}
        onSelectMapping={() => {}}
      />
    );
    
    const cancelButton = screen.getByText(/CANCEL/i);
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalled();
  });
});

