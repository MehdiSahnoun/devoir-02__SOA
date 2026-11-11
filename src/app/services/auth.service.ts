import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accounts: { u: string; p: string; role: string }[] = [
    { u: 'admin', p: 'admin123', role: 'admin' },
    { u: 'user', p: 'user123', role: 'user' }
  ];
  login(u: string, p: string): boolean {
    const acc = this.accounts.find(a => a.u === u && a.p === p);
    if (acc) { localStorage.setItem('user', acc.u); localStorage.setItem('role', acc.role); return true; }
    return false;
  }
  signup(u: string, p: string): boolean {
    if (u && p) { localStorage.setItem('user', u); localStorage.setItem('role', 'user'); return true; }
    return false;
  }
  logout(): void { localStorage.removeItem('user'); localStorage.removeItem('role'); }
  isLoggedIn(): boolean { return !!localStorage.getItem('user'); }
  currentUser(): string | null { return localStorage.getItem('user'); }
  role(): string | null { return localStorage.getItem('role'); }
  isAdmin(): boolean { return this.role() === 'admin'; }
}
