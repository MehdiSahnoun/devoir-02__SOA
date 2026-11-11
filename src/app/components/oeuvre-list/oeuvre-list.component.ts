import { Component, OnInit } from '@angular/core';
import { OeuvreService } from '../../services/oeuvre.service';
import { MuseeService } from '../../services/musee.service';
import { Oeuvre, Musee } from '../../models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-oeuvre-list',
  standalone: false,
  templateUrl: './oeuvre-list.component.html',
  styleUrls: ['./oeuvre-list.component.scss']
})
export class Oeuvre_ListComponent implements OnInit {
  oeuvres: Oeuvre[] = [];
  musees: Musee[] = [];
  loading = false;
  error = '';
  selectedMuseeId: number | null = null;
  searchTitre = '';
  filterType: '' | 'titre' | 'musee' = '';

  get filteredOeuvres(): Oeuvre[] {
    const term = this.searchTitre.trim().toLocaleLowerCase();
    return this.oeuvres.filter((oeuvre) => {
      switch (this.filterType) {
        case 'titre':
          return !term || oeuvre.titreOeuvre.toLocaleLowerCase().includes(term);
        case 'musee':
          return this.selectedMuseeId === null || oeuvre.musee?.idMusee === this.selectedMuseeId;
        default:
          return true;
      }
    });
  }

  get hasActiveFilters(): boolean {
    return this.filterType !== '';
  }

  constructor(
    private oeuvreService: OeuvreService,
    private museeService: MuseeService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMusees();
    this.loadOeuvres();
  }

  loadMusees(): void {
    this.museeService.getAllMusees().subscribe({
      next: (data) => this.musees = data,
      error: (err) => this.error = 'Impossible de charger les musées : ' + (err.message || 'erreur inconnue')
    });
  }

  loadOeuvres(): void {
    this.loading = true;
    this.error = '';
    this.oeuvreService.getAllOeuvres().subscribe({
      next: (data) => {
        this.oeuvres = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Impossible de charger les œuvres : ' + (err.message || 'erreur inconnue');
        this.loading = false;
      }
    });
  }

  clearFilters(): void {
    this.filterType = '';
    this.searchTitre = '';
    this.selectedMuseeId = null;
  }

  deleteOeuvre(id: number): void {
    if (!this.auth.isAdmin()) return;
    if (!confirm('Supprimer définitivement cette œuvre ?')) return;

    this.oeuvreService.deleteOeuvre(id).subscribe({
      next: () => this.oeuvres = this.oeuvres.filter((oeuvre) => oeuvre.idOeuvre !== id),
      error: (err) => this.error = 'La suppression a échoué : ' + (err.message || 'erreur inconnue')
    });
  }
}