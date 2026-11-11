import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  template: `<div style="max-width:400px;margin:2rem auto;">
    <h2>Login</h2>
    <form (ngSubmit)="submit()">
      <input [(ngModel)]="u" name="u" placeholder="Username" class="form-control mb-2" required />
      <input [(ngModel)]="p" name="p" type="password" placeholder="Password" class="form-control mb-2" required />
      <button class="btn btn-primary">Login</button>
      <a routerLink="/signup" class="ms-2">Sign up</a>
    </form>
  </div>`
})
export class LoginComponent {
  u=''; p='';
  constructor(private auth: AuthService, private router: Router) {}
  submit() { if (this.auth.login(this.u, this.p)) this.router.navigate(['/musees']); }
}
