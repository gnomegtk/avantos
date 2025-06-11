// tests/setup.ts
import { expect } from 'vitest';
globalThis.expect = expect;    // Garante que o expect esteja disponível globalmente
import '@testing-library/jest-dom';

