import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Prediccion } from '../interfaces/prediccion.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Predicciones } from '../interfaces/list-predicciones.interface';

@Injectable({
  providedIn: 'root'
})
export class PrediccionService {

  private readonly baseUrl: string = 'https://nestia-production.up.railway.app';

  constructor(private htpp: HttpClient) { }

  predecir(dataPrediccion: Prediccion) {
    const url = `${this.baseUrl}/prediccion`;

    return this.htpp.post<any>(url, dataPrediccion).pipe(
      catchError(err => throwError(() => err.error.message))
    );
  }

  getPredicciones(): Observable<Predicciones[]> {
    const url = `${this.baseUrl}/prediccion`;

    return this.htpp.get<any>(url).pipe(
      map((prediccion) => prediccion),
    );

  }

  getPrediccionById(id: string): Observable<Predicciones> {
    const url = `${this.baseUrl}/prediccion/${id}`;

    return this.htpp.get<any>(url).pipe(
      map((prediccion) => prediccion),
    );
  }

}
