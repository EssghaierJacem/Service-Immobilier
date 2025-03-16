import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResidencesComponent } from './residences/residences/residences.component';
import { ResidenceDetailsComponent } from './residences/residence-details/residence-details.component';
import { AddResidenceComponent } from './residences/add-residence/add-residence.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ApartmentsComponent } from './apartments/apartments/apartments.component';
import { ApartmentsByResidenceComponent } from './apartments/apartments-by-residence/apartments-by-residence.component';
import { AddApartmentComponent } from './apartments/add-apartment/add-apartment.component';
import { UpdateResidenceComponent } from './residences/update-residence/update-residence.component';

const routes: Routes = [ 
  { path: '', component: HomeComponent, data: { breadcrumb: '🏠 Accueil' } },
  { path: 'residences', component: ResidencesComponent, data: { breadcrumb: '🏢 Résidences' } },
  { path: 'residences/:id', component: ResidenceDetailsComponent, data: { breadcrumb: '📄 Détails Résidence' } },
  { path: 'add-residence', component: AddResidenceComponent, data: { breadcrumb: '➕ Ajouter Résidence' } },
  { path: 'apartments', component: ApartmentsComponent, data: { breadcrumb: '🏠 Appartements' } },
  { path: 'apartments/:residenceId', component: ApartmentsByResidenceComponent, data: { breadcrumb: '📌 Appartements par Résidence' } },
  { path: 'add-apartment', component: AddApartmentComponent, data: { breadcrumb: '➕ Ajouter Appartement' } },
  { path: 'update-residence/:id', component: UpdateResidenceComponent },
  { path: '**', component: NotFoundComponent, data: { breadcrumb: '❌ Page Introuvable' } } // Doit etre en dernier position
  // {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
