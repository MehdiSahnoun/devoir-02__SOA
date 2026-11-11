import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Musee_FormComponent } from './components/musee-form/musee-form.component';
import { Musee_ListComponent } from './components/musee-list/musee-list.component';
import { Oeuvre_FormComponent } from './components/oeuvre-form/oeuvre-form.component';
import { Oeuvre_ListComponent } from './components/oeuvre-list/oeuvre-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    App,
    Musee_FormComponent,
    Musee_ListComponent,
    Oeuvre_FormComponent,
    Oeuvre_ListComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
