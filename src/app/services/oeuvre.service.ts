import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Oeuvre } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OeuvreService {
  private oeuvres: Oeuvre[] = [
    {
      idOeuvre: 1,
      titreOeuvre: 'La Liberté guidant le peuple',
      anneeCreation: 1830,
      dateAcquisition: new Date('1874-02-01T00:00:00'),
      musee: { idMusee: 1, nomMusee: 'Musée du Louvre', superficieMusee: 72735, dateInauguration: new Date('1793-08-10T00:00:00') }
    },
    {
      idOeuvre: 2,
      titreOeuvre: 'Les Nymphéas',
      anneeCreation: 1916,
      dateAcquisition: new Date('1922-05-12T00:00:00'),
      musee: { idMusee: 1, nomMusee: 'Musée du Louvre', superficieMusee: 72735, dateInauguration: new Date('1793-08-10T00:00:00') }
    },
    {
      idOeuvre: 3,
      titreOeuvre: 'Les Raboteurs de parquet',
      anneeCreation: 1875,
      dateAcquisition: new Date('1894-01-01T00:00:00'),
      musee: { idMusee: 2, nomMusee: "Musée d'Orsay", superficieMusee: 57000, dateInauguration: new Date('1986-12-01T00:00:00') }
    },
    {
      idOeuvre: 4,
      titreOeuvre: 'Le Penseur',
      anneeCreation: 1904,
      dateAcquisition: new Date('1922-01-01T00:00:00'),
      musee: { idMusee: 4, nomMusee: 'Musée Picasso', superficieMusee: 3800, dateInauguration: new Date('1985-10-25T00:00:00') }
    }
  ];

  getAllOeuvres(): Observable<Oeuvre[]> {
    return of(this.oeuvres.map((oeuvre) => ({ ...oeuvre, musee: { ...oeuvre.musee } })));
  }

  getOeuvre(id: number): Observable<Oeuvre> {
    const oeuvre = this.oeuvres.find((entry) => entry.idOeuvre === id);
    return oeuvre
      ? of({ ...oeuvre, musee: { ...oeuvre.musee } })
      : throwError(() => new Error(`Aucune œuvre trouvée avec l'identifiant ${id}.`));
  }

  createOeuvre(oeuvre: Oeuvre): Observable<Oeuvre> {
    const created = { ...oeuvre, idOeuvre: this.nextId(), musee: { ...oeuvre.musee } };
    this.oeuvres = [...this.oeuvres, created];
    return of({ ...created, musee: { ...created.musee } });
  }

  updateOeuvre(id: number, oeuvre: Oeuvre): Observable<Oeuvre> {
    if (!this.oeuvres.some((entry) => entry.idOeuvre === id)) {
      return throwError(() => new Error(`Aucune œuvre trouvée avec l'identifiant ${id}.`));
    }

    const updated = { ...oeuvre, idOeuvre: id, musee: { ...oeuvre.musee } };
    this.oeuvres = this.oeuvres.map((entry) => entry.idOeuvre === id ? updated : entry);
    return of({ ...updated, musee: { ...updated.musee } });
  }

  deleteOeuvre(id: number): Observable<void> {
    if (!this.oeuvres.some((oeuvre) => oeuvre.idOeuvre === id)) {
      return throwError(() => new Error(`Aucune œuvre trouvée avec l'identifiant ${id}.`));
    }
    this.oeuvres = this.oeuvres.filter((oeuvre) => oeuvre.idOeuvre !== id);
    return of(void 0);
  }

  findByMuseeId(idMusee: number): Observable<Oeuvre[]> {
    return of(this.oeuvres
      .filter((oeuvre) => oeuvre.musee.idMusee === idMusee)
      .map((oeuvre) => ({ ...oeuvre, musee: { ...oeuvre.musee } })));
  }

  searchByTitre(titre: string): Observable<Oeuvre[]> {
    const term = titre.trim().toLocaleLowerCase();
    return of(this.oeuvres
      .filter((oeuvre) => oeuvre.titreOeuvre.toLocaleLowerCase().includes(term))
      .map((oeuvre) => ({ ...oeuvre, musee: { ...oeuvre.musee } })));
  }

  private nextId(): number {
    return this.oeuvres.reduce((highest, oeuvre) => Math.max(highest, oeuvre.idOeuvre), 0) + 1;
  }
}