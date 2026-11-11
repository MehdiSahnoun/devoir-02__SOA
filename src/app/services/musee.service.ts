import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Musee } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MuseeService {
  private musees: Musee[] = [
    {
      idMusee: 1,
      nomMusee: 'Musée du Louvre',
      superficieMusee: 72735,
      dateInauguration: new Date('1793-08-10T00:00:00')
    },
    {
      idMusee: 2,
      nomMusee: "Musée d'Orsay",
      superficieMusee: 57000,
      dateInauguration: new Date('1986-12-01T00:00:00')
    },
    {
      idMusee: 3,
      nomMusee: 'Musée des Confluences',
      superficieMusee: 22000,
      dateInauguration: new Date('2014-12-20T00:00:00')
    },
    {
      idMusee: 4,
      nomMusee: 'Musée Picasso',
      superficieMusee: 3800,
      dateInauguration: new Date('1985-10-25T00:00:00')
    },
    {
      idMusee: 5,
      nomMusee: 'Musée du Quai Branly - Jacques Chirac',
      superficieMusee: 40000,
      dateInauguration: new Date('2006-06-20T00:00:00')
    }
  ];

  getAllMusees(): Observable<Musee[]> {
    return of(this.musees.map((musee) => ({ ...musee })));
  }

  getMusee(id: number): Observable<Musee> {
    const musee = this.musees.find((entry) => entry.idMusee === id);
    return musee
      ? of({ ...musee })
      : throwError(() => new Error(`Aucun musée trouvé avec l'identifiant ${id}.`));
  }

  createMusee(musee: Musee): Observable<Musee> {
    const created = { ...musee, idMusee: this.nextId() };
    this.musees = [...this.musees, created];
    return of({ ...created });
  }

  updateMusee(id: number, musee: Musee): Observable<Musee> {
    const index = this.musees.findIndex((entry) => entry.idMusee === id);
    if (index === -1) {
      return throwError(() => new Error(`Aucun musée trouvé avec l'identifiant ${id}.`));
    }

    const updated = { ...musee, idMusee: id };
    this.musees = this.musees.map((entry, currentIndex) => currentIndex === index ? updated : entry);
    return of({ ...updated });
  }

  deleteMusee(id: number): Observable<void> {
    if (!this.musees.some((musee) => musee.idMusee === id)) {
      return throwError(() => new Error(`Aucun musée trouvé avec l'identifiant ${id}.`));
    }
    this.musees = this.musees.filter((musee) => musee.idMusee !== id);
    return of(void 0);
  }

  findByNomMusee(nom: string): Observable<Musee[]> {
    const term = nom.trim().toLocaleLowerCase();
    const results = this.musees
      .filter((musee) => musee.nomMusee.toLocaleLowerCase().includes(term))
      .map((musee) => ({ ...musee }));
    return of(results);
  }

  private nextId(): number {
    return this.musees.reduce((highest, musee) => Math.max(highest, musee.idMusee), 0) + 1;
  }
}