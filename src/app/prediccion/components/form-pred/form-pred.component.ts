import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prediccion } from '../../interfaces/prediccion.interface';
import { PrediccionService } from '../../services/prediccion.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-pred',
  templateUrl: './form-pred.component.html',
  styleUrl: './form-pred.component.css'
})
export class FormPredComponent {


  private fb = inject(FormBuilder);
  private prediccionService = inject(PrediccionService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    ProductRelated: ['', [Validators.required, Validators.min(0)]],
    ProductRelated_Duration: ['', [Validators.required, Validators.min(0)]],
    BounceRates: ['', [Validators.required, Validators.min(0)]],
    ExitRates: ['', [Validators.required, Validators.min(0)]],
    PageValues: ['', [Validators.required, Validators.min(0)]],
    Month: ['', [Validators.required, Validators.minLength(1)]],
    Region: ['', [Validators.required, Validators.min(0)]],
    VisitorType: ['', [Validators.required, Validators.minLength(1)]],
    Weekend: ['', [Validators.required, Validators.min(0)]]
  });


  onSubmit(): void {

    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      Swal.fire({
        title: "Formulario inválido, por favor revise los campos",
        icon: "warning",
        draggable: true
      });
      return;
    }

    const prediccion: Prediccion = this.myForm.value;

    this.prediccionService.predecir(prediccion).subscribe(data => {
      console.log(data)
      if(data.Revenue === 1) {
        Swal.fire({
          title: "Se realiza una compra",
          icon: "success",
          showDenyButton: true,
          confirmButtonText: "Ver explicaciones",
          denyButtonText: `Cancelar`,
          draggable: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/prediccion/' + data._id);
          } else if (result.isDenied) {
            this.myForm.reset();
            location.reload();
          }
        });
      } else {
        Swal.fire({
          title: "No se realiza una compra",
          icon: "error",
          showDenyButton: true,
          confirmButtonText: "Ver explicaciones",
          denyButtonText: `Cancelar`,
          draggable: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/prediccion/' + data._id);
          } else if (result.isDenied) {
            this.myForm.reset();
            location.reload();
          }
        });
      }
    });

    //this.myForm.reset();
  }

}
