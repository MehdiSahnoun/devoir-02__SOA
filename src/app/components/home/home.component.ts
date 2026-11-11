import { Component, OnInit } from '@angular/core';
import { Musee } from '../../models';
import { MuseeService } from '../../services/musee.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  musees: Musee[] = [];
  loading = false;
  error = '';

  constructor(
    private museeService: MuseeService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMusees();
  }

  loadMusees(): void {
    this.loading = true;
    this.error = '';
    this.museeService.getAllMusees().subscribe({
      next: (musees) => {
        this.musees = musees;
        this.loading = false;
      },
      error: (err: { message?: string }) => {
        this.error = `Impossible de charger les musées : ${err.message || 'erreur inconnue'}`;
        this.loading = false;
      }
    });
  }
}
