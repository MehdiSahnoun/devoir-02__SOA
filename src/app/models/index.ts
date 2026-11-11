export interface Musee {
  idMusee: number;
  nomMusee: string;
  superficieMusee: number;
  dateInauguration: Date;
}

export interface Oeuvre {
  idOeuvre: number;
  titreOeuvre: string;
  anneeCreation: number;
  dateAcquisition: Date;
  musee: Musee;
}

export interface User {
  id: number;
  username: string;
  role: string;
}