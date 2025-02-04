import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrediccionService } from '../../services/prediccion.service';
import { Predicciones } from '../../interfaces/list-predicciones.interface';
import { GoogleGenerativeAI } from "@google/generative-ai";

@Component({
  selector: 'app-prediccion',
  templateUrl: './prediccion.component.html',
  styleUrl: './prediccion.component.css'
})
export class PrediccionComponent implements  OnInit {

  _idPrediccion: string = '';
  private route = inject(ActivatedRoute);
  private prediccionService = inject(PrediccionService);
  prediccion?: Predicciones;

  explicacionResultados: string = 'Explicación de los resultados';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this._idPrediccion = id ? id : '0';
      this.getPrediccion();
    });
  }

  getPrediccion() {
    this.prediccionService.getPrediccionById(this._idPrediccion).subscribe(resp => {
      this.prediccion = resp;
    });

  }

  async reproducirAudio() {

    const API_KEY = 'AIzaSyD1kDpZPAq09qvKbczJb5MSgqDAQ-kFu6k';
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});

    try {


      const result = await model.generateContent(`ahora mejora este texto ${this.explicacionResultados} para dar una explicación por voz, de igual
      forma el texto debe de ser limpio ya que despues el texto se procesara como un string.
      `);
      const response = await result.response;

      const messageVoice = new SpeechSynthesisUtterance(response.text());
      speechSynthesis.speak(messageVoice);
    } catch (error) {
        console.error('Error al generar contenido:', error);
    }

  }


  async stopAutio() {
    speechSynthesis.cancel();
  }

  async expliacionResultadosIA() {
    const API_KEY = 'AIzaSyD1kDpZPAq09qvKbczJb5MSgqDAQ-kFu6k';
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});

    const caracteristicas = JSON.stringify(this.prediccion);

    const variablesDataset = {
      ProductRelated: "Número de páginas relacionadas con productos visitadas por el usuario.",
      ProductRelated_Duration: "Tiempo invertido en la categoría de páginas.",
      BounceRates: "Porcentaje de visitantes que salen sin interactuar en la página.",
      ExitRates: "Porcentaje de vistas que terminan en esta página.",
      PageValues: "Valor promedio de la página basado en la página objetivo y/o finalización de transacción.",
      Month: "Mes en que se visitó la página.",
      Region: "Región del usuario.",
      VisitorType: "Tipo de visitante.",
      Weekend: "La sesión de la visita fue en fin de semana."
    }

    const variablesRelevantes = {
      ProductRelated_duration: "Tiempo invertido en la categoría de páginas.",
      ExitRates: "Porcentaje de vistas que terminan en esta página.",
      ProductRelated: "Número de páginas relacionadas con productos visitadas por el usuario.",
      BounceRates: "Porcentaje de visitantes que salen sin interactuar en la página.",
      PagesValues: "Valor promedio de la página basado en la página objetivo y/o finalización de transacción.",
      Region_1: "Region de tipo 1 que visito el usuario.",
      Region_3: "Region de tipo 3 que visito el usuario.",
      Weekend_0: "La sesión de la visita fue en fin de semana.",
      Weekend_1: "La sesión de la visita no fue en fin de semana.",
      Region_2: "Region de tipo 2 que visito el usuario."
    }

    const promt: string = `

    Estoy trabajando con el dataset Online Shoppers Intention, en el cual he seleccionado estas
    variables para realizar una predicción de si un usuario realiza una compra o no, la varibles
    seleccionadas son las siguientes:

    ${variablesDataset}

    Las variables más relevantes para realizar la predicción son, el orden de importancia esta
    dado por números del 1 al 10, siendo 1 el menos importante y 10 el más importante:

    ${variablesRelevantes}

    Ahora el resultado de una predicción es el siguiente, explicame el por que del resultado en
    base a las variables más relevantes:

    ${caracteristicas}

    Nota importante para los valores de la variable Revenue, 1 es si el usuario realizo una compra y
    0 es si el usuario no realizo una compra.

    La respuesta es para que pueda entender un cliente, es decir la respuesta no debe de ser extensa, es
    decir, solo debe de ser de un parrafo de máximo de 10 lineas, el texto debe de ser limpio, ya que
    despues el texto se procesara como un string.
    `;

    try {


      const result = await model.generateContent(promt);
      const response = await result.response;

      this.explicacionResultados = response.text();
    } catch (error) {
        console.error('Error al generar contenido:', error);
    }

  }

}
//AIzaSyD1kDpZPAq09qvKbczJb5MSgqDAQ-kFu6k
/*
Estoy trabajando con el dataset Online Shoppers Intention, en el cual he seleccionado estas variables para realizar una
predicción de si un usuario realiza una compra o no, la varibles seleccionadas son las siguientes:

1. ProductRelated: "Número de páginas relacionadas con productos visitadas por el usuario."
2. ProductRelated_Duration: "Tiempo invertido en la categoría de páginas."
3. BounceRates: "Porcentaje de visitantes que salen sin interactuar en la página."
4. ExitRates: "Porcentaje de vistas que terminan en esta página."
5. PageValues: "Valor promedio de la página basado en la página objetivo y/o finalización de transacción."
6. Month: "Mes en que se visitó la página."
7. Region: "Región del usuario."
8. VisitorType: "Tipo de visitante."
9. Weekend: "La sesión de la visita fue en fin de semana."

Las variables más relevantes para realizar la predicción son, el orden de importancia esta dado por números del 1 al 10,
siendo 1 el menos importante y 10 el más importante:

10. ProductRelated_duration: Tiempo invertido en la categoría de páginas
9. ExitRates: Porcentaje de vistas que terminan en esta página.
8. ProductRelated: Número de páginas relacionadas con productos visitadas por el usuario.
7. BounceRates: Porcentaje de visitantes que salen sin interactuar en la página.
6. PagesValues: Valor promedio de la página basado en la página objetivo y/o finalización de transacción.
5. Region_1: Region de tipo 1 que visito el usuario.
4. Region_3: Region de tipo 3 que visito el usuario.
3. Weekend_0: La sesión de la visita fue en fin de semana.
2. Weekend_1: La sesión de la visita no fue en fin de semana.
1. Region_2: Region de tipo 2 que visito el usuario.

Ahora el resultado de una predicción es el siguiente, explicame el por que del resultado en base a las variables más
relevantes:

"ProductRelated": 1,
"ProductRelated_Duration": 0.000000,
"BounceRates": 0.20,
"ExitRates": 0.20,
"PageValues": 0.0,
"Month": "Feb",
"Region": 9,
"VisitorType": "Returning_Visitor",
"Weekend": 0,
"Revenue": 0 --> Esta es la variable de salida, 1 es si el usuario realizo una compra y 0 es si el usuario no realizo una
compra.


La respuesta es para que pueda entender un cliente, es decir la respuesta no debe de ser extensa, es decir solo debe de
de un parrafo de máximo de 10 lineas, el texto debe de ser limpio, ya que despues el texto se procesara como un string.


ahora mejora el texto para dar una explicación por voz, de igual forma el texto debe de ser limpio ya que despues el texto
se procesara como un string.
*/
