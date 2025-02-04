import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './prediccion/pages/home/home.component';
import { PrediccionComponent } from './prediccion/pages/prediccion/prediccion.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'prediccion/:id', component: PrediccionComponent},
  {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
