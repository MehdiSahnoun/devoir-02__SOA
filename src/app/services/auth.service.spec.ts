import { AuthService } from './auth.service';

describe('AuthService', () => {
  let auth: AuthService;

  beforeEach(() => {
    auth = new AuthService();
    auth.logout();
  });

  it('identifies the administrator after login', () => {
    expect(auth.login('admin', 'admin123')).toBe(true);
    expect(auth.currentUser()).toBe('admin');
    expect(auth.isAdmin()).toBe(true);
  });

  it('gives standard accounts read-only access', () => {
    expect(auth.login('user', 'user123')).toBe(true);
    expect(auth.currentUser()).toBe('user');
    expect(auth.isAdmin()).toBe(false);
  });

  it('clears the current account on logout', () => {
    auth.login('admin', 'admin123');
    auth.logout();
    expect(auth.isLoggedIn()).toBe(false);
    expect(auth.currentUser()).toBeNull();
  });
});
