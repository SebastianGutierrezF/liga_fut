import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Equipo } from 'src/app/interfaces/equipo';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  @ViewChild("logo", {static: false}) logoInput: ElementRef | undefined;
  equipos: Equipo[] = [];
  formulario: FormGroup = this.fb.group({
    id_e: [,],
    nombre_e: [, [Validators.required, Validators.maxLength(40)]],
    logo_e: [, [Validators.required]]
  })

  constructor(private cs: ConexionService, private fb: FormBuilder) {
    this.update();
  }

  update() {
    this.cs.get('equipos', 'getEquipos').subscribe((data: any) => {
      this.equipos = data;
    })
  }

  ngOnInit(): void {
  }

  enviarDatos() {
    if (this.formulario.controls['id_e'].value == null) {
      this.agregarEquipo();
    } else {
      this.editarEquipo();
    }
  }

  notValid(campo: string) {
    return this.formulario.touched && this.formulario.controls[campo].invalid;
  }

  leerArchivo(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formulario.patchValue({
          logo_e: reader.result
        });
      }
    }
  }

  agregarEquipo() {
    this.cs.post('equipos', 'agregarEquipo', this.formulario.value).subscribe((dato: any) => {
      if (dato) {
        alert(`Equipo ${this.formulario.controls['nombre_e'].value} ha sido agregado.`);
        this.formulario.reset();
        this.update();
        this.logoInput!.nativeElement.value = '';
      } else {
        alert(`Ocurrio un error al agregar el equipo.`);
      }
    })
  }

  editarEquipo() {
    this.cs.post('equipos', 'editarEquipo', this.formulario.value).subscribe((dato: any) => {
      if (dato) {
        alert(`Equipo ${this.formulario.controls['nombre_e'].value} ha sido editado.`);
        this.formulario.reset();
        this.update();
        document.getElementById('sendButton')!.textContent = "Agregar";
      } else {
        alert(`Ocurrio un error al editar el equipo.`)
      }
    })
  }

  borrarEquipo(id: string, nombre: string) {
    this.cs.post('equipos', 'borrarEquipo', { 'id_e': id }).subscribe((dato: any) => {
      if (dato) {
        alert(`Equipo ${nombre} ha sido borrado.`);
        this.update();
      } else {
        alert(`Ocurrio un error al borrar el equipo o se encuentra asignado a un partido actualmente.`)
      }
    })
  }

  parcharValores(equipo: Equipo) {
    this.formulario.patchValue(equipo);
    this.logoInput!.nativeElement.value = '';
    document.getElementById('sendButton')!.textContent = "Editar";
  }

}
