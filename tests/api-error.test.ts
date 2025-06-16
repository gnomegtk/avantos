import { describe, it, expect, vi } from 'vitest';
import { getActionBlueprintGraph } from '../src/services/api';

describe('getActionBlueprintGraph - Error Handling', () => {
  it('should throw an error when the response is not ok', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Not Found'
      })
    ) as any;
    
    await expect(getActionBlueprintGraph()).rejects.toThrow('Failed to fetch forms: Not Found');
  });
});

