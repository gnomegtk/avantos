import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MappingModal from '../src/components/MappingModal';

describe('MappingModal Global Options Accessibility', () => {
  it('ensures all global options have role "button" and tabIndex="0"', () => {
    render(
      <MappingModal
        fieldName="email"
        dependentForms={[]} // no dependent forms for this test
        onClose={() => {}}
        onSelectMapping={() => {}}
      />
    );

    // Get the global options container by using the test id on the header
    const globalSection = screen.getByTestId('global-data-header')?.closest('.modal-section');
    expect(globalSection).toBeTruthy();

    // Find the list of global options within this section.
    const globalList = globalSection?.querySelector('ul');
    expect(globalList).toBeTruthy();

    // For each list item, check that they have role "button" and a tabIndex equal to "0".
    const listItems = globalList ? globalList.querySelectorAll('li') : [];
    listItems.forEach((item) => {
      expect(item.getAttribute('role')).toBe('button');
      expect(item.getAttribute('tabindex')).toBe('0');
    });
  });
});

