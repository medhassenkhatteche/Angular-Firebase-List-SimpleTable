import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './authentification/connexion/connexion.component';
import { InscriptionComponent } from './authentification/inscription/inscription.component';
import { ListeLivresComponent } from './liste-livres/liste-livres.component';
import { LivreComponent } from './liste-livres/livre/livre.component';
import { FormulaireLivreComponent } from './liste-livres/formulaire-livre/formulaire-livre.component';
import { FormulaireModifLivreComponent } from './liste-livres/formulaire-modif-livre/formulaire-modif-livre.component';
import { EnteteComponent } from './entete/entete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {AuthentificationService} from './services/authentification.service';
import {AuthentificationGuardService} from './services/authentification-guard.service';
import {LivresService} from './services/livres.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

const appRoutes: Routes =[
  {path: 'authentification/inscription', component: InscriptionComponent},
  {path: 'authentification/connexion', component: ConnexionComponent},
  {path: 'livres', canActivate: [AuthentificationGuardService] , component: ListeLivresComponent},
  {path: 'livres/ajout', canActivate: [AuthentificationGuardService] , component: FormulaireLivreComponent},
  {path: 'livres/modif/:id', canActivate: [AuthentificationGuardService] , component: FormulaireModifLivreComponent},
  {path: 'livres/detail/:id', canActivate: [AuthentificationGuardService] , component: LivreComponent},
  {path: '', redirectTo: 'livres', pathMatch: 'full'},
  {path: '**', redirectTo: 'livres'}
];

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    InscriptionComponent,
    ListeLivresComponent,
    LivreComponent,
    FormulaireLivreComponent,
    EnteteComponent,
    FormulaireModifLivreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    RouterModule.forRoot(appRoutes),
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [
    AuthentificationService,
    AuthentificationGuardService,
    LivresService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
