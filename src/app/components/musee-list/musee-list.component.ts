import { Component, OnInit } from '@angular/core';
import { MuseeService } from '../../services/musee.service';
import { Musee } from '../../models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-musee-list',
  standalone: false,
  templateUrl: './musee-list.component.html',
  styleUrls: ['./musee-list.component.scss']
})
export class Musee_ListComponent implements OnInit {
  musees: Musee[] = [];
  filterType: '' | 'nom' | 'superficieMin' | 'superficieMax' = '';
  searchTerm = '';
  superficieMin: number | null = null;
  superficieMax: number | null = null;
  loading = false;
  error = '';
  deletingId: number | null = null;

  get filteredMusees(): Musee[] {
    const term = this.searchTerm.trim().toLocaleLowerCase();
    return this.musees.filter((musee) => {
      switch (this.filterType) {
        case 'nom':
          return !term || musee.nomMusee.toLocaleLowerCase().includes(term);
        case 'superficieMin':
          return this.superficieMin === null || musee.superficieMusee >= this.superficieMin;
        case 'superficieMax':
          return this.superficieMax === null || musee.superficieMusee <= this.superficieMax;
        default:
          return true;
      }
    });
  }

  get hasActiveFilters(): boolean {
    return this.filterType !== '';
  }

  clearFilters(): void {
    this.filterType = '';
    this.searchTerm = '';
    this.superficieMin = null;
    this.superficieMax = null;
  }

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
      next: (data) => {
        this.musees = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load museums: ' + (err.message || 'Unknown error');
        this.loading = false;
      }
    });
  }

  deleteMusee(id: number): void {
    if (!this.auth.isAdmin()) return;
    if (!confirm('Supprimer définitivement ce musée ?')) return;

    this.deletingId = id;
    this.error = '';
    this.museeService.deleteMusee(id).subscribe({
      next: () => {
        this.musees = this.musees.filter((musee) => musee.idMusee !== id);
        this.deletingId = null;
      },
      error: (err) => {
        this.error = `La suppression a échoué : ${err.message || 'erreur inconnue'}`;
        this.deletingId = null;
      }
    });
  }
}