import { ViewBankDetailsComponent } from './view-bank-details/view-bank-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouriteBanksComponent } from './favourite-banks/favourite-banks.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"",redirectTo:"/home", pathMatch:"full"},
  {path:"favourites", component:FavouriteBanksComponent},
  {path:"viewBankDetails/:id", component:ViewBankDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
