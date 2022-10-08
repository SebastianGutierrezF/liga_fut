import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Arbitro } from 'src/app/interfaces/arbitro';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-arbitros',
  templateUrl: './arbitros.component.html',
  styleUrls: ['./arbitros.component.css']
})
export class ArbitrosComponent implements OnInit {
  arbitros: Arbitro[] = [];
  formulario: FormGroup = this.fb.group({
    id_a: [,],
    nombre_a: [, [Validators.required, Validators.maxLength(40)]],
    apellidos_a: [,  [Validators.required, Validators.maxLength(40)]],
    contacto_a: [,  [Validators.required, Validators.maxLength(10)]],
    email_a: [,  [Validators.required, Validators.maxLength(40)]],
    colocacion_a: [,  [Validators.required, Validators.maxLength(30)]]
  })

  constructor(private cs: ConexionService, private fb: FormBuilder) {
    this.update();
  }

  update() {
    this.cs.get('arbitros', 'getArbitros').subscribe((data: any) => {
      this.arbitros = data;
    })
  }

  ngOnInit(): void {
  }

  enviarDatos() {
    if (this.formulario.controls['id_a'].value == null) {
      this.agregarArbitro();
    } else {
      this.editarArbitro();
    }
  }

  agregarArbitro() {
    this.cs.post('arbitros', 'agregarArbitro', this.formulario.value).subscribe((dato: any) => {
      if (dato) {
        alert(`Arbitro ${this.formulario.controls['nombre_a'].value} ha sido agregado.`);
        this.formulario.reset();
        this.update();
      } else {
        alert(`Ocurrio un error al agregar el arbitro.`);
      }
    })
  }

  editarArbitro() {
    this.cs.post('arbitros', 'editarArbitro', this.formulario.value).subscribe((dato: any) => {      
      if (dato) {
        alert(`Arbitro ${this.formulario.controls['nombre_a'].value} ha sido editado.`);
        this.formulario.reset();
        this.update();
        const boton = document.getElementById('sendButton');
        boton!.textContent = "Agregar";
      } else {
        alert(`Ocurrio un error al editar el arbitro.`)
      }
    })

  }

  borrarArbitro(id: string, nombre: string) {  
    this.cs.post('arbitros', 'borrarArbitro', {'id_a': id}).subscribe((dato: any) => {     
      if (dato) {
        alert(`Arbitro ${nombre} ha sido borrado.`);
        this.update();
      } else {
        alert(`Ocurrio un error al borrar el arbitro o se encuentra asignado a un partido actualmente.`)
      }
    })
  }

  parcharValores(arbitro: Arbitro) {
    this.formulario.patchValue(arbitro);
    const boton = document.getElementById('sendButton');
    boton!.textContent = "Editar";
  }

}
