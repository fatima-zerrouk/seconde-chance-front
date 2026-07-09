import { describe, it, expect } from 'vitest';
import { isTokenValid } from './jwt.utils';

const EXPIRED_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE2MjM5MDIyfQ.1xB66pUyoYAFrdp1z685NxECOksD_oQ48mrHMuYh8M4';
const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoyNTE2MjM5MDIyfQ.KZcWr-yh8K60LmITybQxUBETUcjQ4Vpuf17V7CWy8A0';

describe('isTokenValid', () => {
  it('retourne false si le token est invalide', () => {
    expect(isTokenValid('token_invalide')).toBe(false);
  });
  it('retourne false si le token est expiré', () => {
    expect(isTokenValid(EXPIRED_TOKEN)).toBe(false);
  });
  it('retourne true si le token est valide', () => {
    expect(isTokenValid(VALID_TOKEN)).toBe(true);
  });
});
