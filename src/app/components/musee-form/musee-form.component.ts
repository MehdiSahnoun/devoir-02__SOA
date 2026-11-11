import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Musee } from '../../models';
import { MuseeService } from '../../services/musee.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-musee-form',
  standalone: false,
  templateUrl: './musee-form.component.html',
  styleUrls: ['./musee-form.component.scss']
})
export class Musee_FormComponent implements OnInit {
  musee: Musee = { idMusee: 0, nomMusee: '', superficieMusee: 0, dateInauguration: new Date() };
  dateInauguration = '';
  isEdit = false;
  loading = false;
  saving = false;
  error = '';
  accessDenied = false;

  constructor(
    private museeService: MuseeService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.auth.isAdmin()) {
      this.accessDenied = true;
      return;
    }

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam === null) return;

    const id = Number(idParam);
    if (!Number.isInteger(id) || id <= 0) {
      this.error = 'Identifiant de musée invalide.';
      return;
    }

    this.isEdit = true;
    this.loading = true;
    this.museeService.getMusee(id).subscribe({
      next: (musee) => {
        this.musee = musee;
        this.dateInauguration = this.toDateInputValue(musee.dateInauguration);
        this.loading = false;
      },
      error: (err: { message?: string }) => {
        this.error = `Impossible de charger ce musée : ${err.message || 'erreur inconnue'}`;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.auth.isAdmin()) {
      this.accessDenied = true;
      return;
    }

    this.error = '';
    this.saving = true;
    this.musee.dateInauguration = new Date(`${this.dateInauguration}T00:00:00`);

    const request = this.isEdit
      ? this.museeService.updateMusee(this.musee.idMusee, this.musee)
      : this.museeService.createMusee(this.musee);

    request.subscribe({
      next: () => this.router.navigate(['/musees']),
      error: (err: { message?: string }) => {
        this.error = `L'enregistrement a échoué : ${err.message || 'erreur inconnue'}`;
        this.saving = false;
      }
    });
  }

  private toDateInputValue(date: Date | string): string {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return '';
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const day = String(parsed.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}