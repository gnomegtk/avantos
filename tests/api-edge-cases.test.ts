import { describe, it, expect, vi } from 'vitest';
import { getActionBlueprintGraph } from '../src/services/api';

describe('getActionBlueprintGraph - Edge Cases', () => {
  it('should return an empty array when no forms exist in blueprint', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ forms: [] })
      })
    ) as any;
    
    const forms = await getActionBlueprintGraph();
    expect(forms).toEqual([]);
  });

  it('should handle cases where field_schema is missing', async () => {
    const blueprintData = {
      forms: [
        {
          id: "f_test",
          name: "Test Form",
          field_schema: undefined // Simulating an incomplete response
        }
      ]
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(blueprintData)
      })
    ) as any;

    const forms = await getActionBlueprintGraph();
    expect(forms[0].fields).toEqual([]); // Should default to an empty array
  });
});

