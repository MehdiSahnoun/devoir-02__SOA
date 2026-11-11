import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Musee_ListComponent } from './components/musee-list/musee-list.component';
import { Musee_FormComponent } from './components/musee-form/musee-form.component';
import { Oeuvre_ListComponent } from './components/oeuvre-list/oeuvre-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { Oeuvre_FormComponent } from './components/oeuvre-form/oeuvre-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: HomeComponent },
  { path: 'musees', component: Musee_ListComponent },
  { path: 'musees/new', component: Musee_FormComponent },
  { path: 'musees/:id/edit', component: Musee_FormComponent },
  { path: 'oeuvres', component: Oeuvre_ListComponent },
  { path: 'oeuvres/nouveau', component: Oeuvre_FormComponent },
  { path: 'oeuvres/:id/modifier', component: Oeuvre_FormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }