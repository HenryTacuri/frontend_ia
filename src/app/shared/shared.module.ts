import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PrediccionService } from '../prediccion/services/prediccion.service';



@NgModule({
  declarations: [
    SidebarComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
  ],
  providers: [
    PrediccionService
  ]
})
export class SharedModule { }
