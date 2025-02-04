import { Component, inject, OnInit } from '@angular/core';
import { PrediccionService } from '../../../prediccion/services/prediccion.service';
import { Predicciones } from '../../../prediccion/interfaces/list-predicciones.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  private prediccionService = inject(PrediccionService);
  private router = inject(Router);

  predicciones: Predicciones[] = [];

  ngOnInit(): void {
    this.prediccionService.getPredicciones().subscribe(prediccion => {
      this.predicciones = prediccion;
    });
  }


  getPrediccion(_id: string) {
    this.router.navigateByUrl('/prediccion/' + _id);
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }
}
