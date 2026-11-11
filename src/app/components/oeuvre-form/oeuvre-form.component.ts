import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Musee, Oeuvre } from '../../models';
import { AuthService } from '../../services/auth.service';
import { MuseeService } from '../../services/musee.service';
import { OeuvreService } from '../../services/oeuvre.service';

@Component({
  selector: 'app-oeuvre-form',
  standalone: false,
  templateUrl: './oeuvre-form.component.html',
  styleUrls: ['./oeuvre-form.component.scss']
})
export class Oeuvre_FormComponent implements OnInit {
  oeuvre: Oeuvre = {
    idOeuvre: 0,
    titreOeuvre: '',
    anneeCreation: new Date().getFullYear(),
    dateAcquisition: new Date(),
    musee: { idMusee: 0, nomMusee: '', superficieMusee: 0, dateInauguration: new Date() }
  };
  musees: Musee[] = [];
  selectedMuseeId: number | null = null;
  dateAcquisition = '';
  isEdit = false;
  loading = false;
  saving = false;
  error = '';
  accessDenied = false;

  get currentYear(): number {
    return new Date().getFullYear();
  }

  constructor(
    private oeuvreService: OeuvreService,
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

    this.museeService.getAllMusees().subscribe({
      next: (musees) => {
        this.musees = musees;
        this.loadOeuvreIfEditing();
      },
      error: (err: { message?: string }) => {
        this.error = `Impossible de charger les musées : ${err.message || 'erreur inconnue'}`;
      }
    });
  }

  onSubmit(): void {
    if (!this.auth.isAdmin()) {
      this.accessDenied = true;
      return;
    }

    const musee = this.musees.find((entry) => entry.idMusee === this.selectedMuseeId);
    if (!musee) {
      this.error = 'Veuillez choisir un musée.';
      return;
    }

    this.error = '';
    this.saving = true;
    this.oeuvre.musee = { ...musee };
    this.oeuvre.dateAcquisition = new Date(`${this.dateAcquisition}T00:00:00`);

    const request = this.isEdit
      ? this.oeuvreService.updateOeuvre(this.oeuvre.idOeuvre, this.oeuvre)
      : this.oeuvreService.createOeuvre(this.oeuvre);

    request.subscribe({
      next: () => this.router.navigate(['/oeuvres']),
      error: (err: { message?: string }) => {
        this.error = `L'enregistrement a échoué : ${err.message || 'erreur inconnue'}`;
        this.saving = false;
      }
    });
  }

  private loadOeuvreIfEditing(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam === null) return;

    const id = Number(idParam);
    if (!Number.isInteger(id) || id <= 0) {
      this.error = 'Identifiant d’œuvre invalide.';
      return;
    }

    this.isEdit = true;
    this.loading = true;
    this.oeuvreService.getOeuvre(id).subscribe({
      next: (oeuvre) => {
        this.oeuvre = oeuvre;
        this.selectedMuseeId = oeuvre.musee?.idMusee ?? null;
        this.dateAcquisition = this.toDateInputValue(oeuvre.dateAcquisition);
        this.loading = false;
      },
      error: (err: { message?: string }) => {
        this.error = `Impossible de charger cette œuvre : ${err.message || 'erreur inconnue'}`;
        this.loading = false;
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
