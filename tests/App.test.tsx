import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../src/App';

const dummyBlueprint = {
  "$schema": "http://localhost:9000/schemas/ActionBlueprintGraphDescription.json",
  "id": "bp_test",
  "tenant_id": "1",
  "name": "Test Blueprint",
  "description": "Test blueprint description",
  "forms": [
    {
      "id": "f_test",
      "name": "Test Form",
      "description": "Test form",
      "is_reusable": false,
      "field_schema": {
        "type": "object",
        "properties": {
          "email": {
            "avantos_type": "short-text",
            "title": "Email",
            "type": "string"
          },
          "name": {
            "avantos_type": "short-text",
            "title": "Name",
            "type": "string"
          }
        },
        "required": ["email", "name"]
      },
      "ui_schema": {},
      "dynamic_field_config": {}
    }
  ]
};

describe('App Integration', () => {
  it('renders the form list after fetching the blueprint', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(dummyBlueprint)
      })
    ) as any;
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Form')).toBeInTheDocument();
    });
  });
});

