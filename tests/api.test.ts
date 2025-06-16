import { vi, describe, it, expect } from 'vitest';
import { getActionBlueprintGraph } from '../src/services/api';
import { FormWithPrefill } from '../src/types';

describe('getActionBlueprintGraph', () => {
  it('should transform blueprint "forms" correctly', async () => {
    const blueprintData = {
      "$schema": "http://localhost:9000/schemas/ActionBlueprintGraphDescription.json",
      "id": "bp_01jk766tckfwx84xjcxazggzyc",
      "tenant_id": "1",
      "name": "Onboard Customer 0",
      "description": "Automated test action",
      "forms": [
        {
          "id": "f_test1",
          "name": "Test Form 1",
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

    // Mock global.fetch to return our blueprint data
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(blueprintData)
      } as any)
    );

    const forms: FormWithPrefill[] = await getActionBlueprintGraph();
    expect(forms).toHaveLength(1);
    expect(forms[0].id).toBe('f_test1');
    expect(forms[0].name).toBe('Test Form 1');
    expect(forms[0].fields).toEqual(['email', 'name']);
    expect(forms[0].dependencies).toEqual([]);
    expect(forms[0].prefillMapping).toEqual({});
  });
});

