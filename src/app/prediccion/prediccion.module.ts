import { NgModule } from "@angular/core";
import { HomeComponent } from './pages/home/home.component';
import { FormPredComponent } from './components/form-pred/form-pred.component';
import { ReactiveFormsModule } from "@angular/forms";
import { PrediccionComponent } from './pages/prediccion/prediccion.component';

@NgModule({
  declarations: [
    HomeComponent,
    FormPredComponent,
    PrediccionComponent,
  ],
  imports: [
    ReactiveFormsModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class PrediccionModule { }
