import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inscrito } from 'src/app/interfaces/inscrito';
import { Torneo } from 'src/app/interfaces/torneo';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.css']
})
export class TorneosComponent implements OnInit {
  inscritosForm = false;
  torneos: Torneo[] = [];
  inscritos: Inscrito[] = [];
  partidos: any[] = [];
  formulario: FormGroup = this.fb.group({
    id_t: [,],
    id_p: [,],
    nombre: [, [Validators.required, Validators.maxLength(40)]],
    fechain_t: [, Validators.required],
    fechafin_t: [, Validators.required]
  })
  formInscritos: FormGroup = this.fb.group({
    id_t: [,],
    id_p: [, Validators.required]
  })

  constructor(private cs: ConexionService, private fb: FormBuilder) {
    this.update();
  }

  update() {
    this.cs.get('torneos', 'getTorneos').subscribe((datos: any) => {     
      this.torneos = datos;
    })
    this.cs.get('torneos', 'getNombresPartidos').subscribe((data: any) => {
      this.partidos = data;
    })
  }

  ngOnInit(): void {
  }

  notValid(campo: string) {
    return this.formulario.touched && this.formulario.controls[campo].invalid;
  }

  verInscritos(id_t: string, nombre: string) {
    this.cs.post('torneos', 'inscritos', {'id_t': id_t}).subscribe((data: any) => {      
      this.inscritos.splice(0);
      this.inscritos = data;
      if (nombre != '') {
        if (data.length == 0) {
          document.getElementById('inscritos')!.textContent = 'No tiene inscritos';
        } else {
          document.getElementById('inscritos')!.textContent = nombre;
        }
      }
      this.update();
      this.formInscritos.controls['id_t'].setValue(id_t);
      this.inscritosForm = true;
    })
  }

  agregarInscrito() {
    this.cs.post('torneos', 'agregarInscrito', this.formInscritos.value).subscribe((data: any) => {
      if (data) {
        alert("Se agrego el partido al torneo.");
        this.verInscritos(this.formInscritos.controls['id_t'].value, '');
        this.formInscritos.reset();
        this.update();
      } else {
        alert("Ocurrio un error intentar agregar el partido al torneo.");
      }
    })
  }

  quitarInscrito(id_p: string, id_t: string) {
    this.cs.post('torneos', 'quitarInscrito', {'id_p': id_p, 'id_t': id_t}).subscribe((data: any) => {
      if (data) {
        alert('El partido ha sido eliminado del torneo');
        this.formInscritos.reset();
        this.update();
      } else {
        alert('Hubo un error al eliminar el partido del torneo');
      }
      this.verInscritos(id_t, '');
    })
  }

  enviarDatos() {
    if (this.formulario.controls['id_t'].value == null) {
      this.agregarTorneo();
    } else {
      this.editarTorneo();
    }
  }

  borrarTorneo(id_t: string) {        
    this.cs.post('torneos', 'borrarTorneo', {'id_t': id_t}).subscribe((data: any) => {
      if (data) {
        alert(`El torneo ${this.formulario.controls['nombre'].value} ha sido borrado`);
        this.update();
        this.formulario.reset();
      } else {
        alert('Ocurrio un error al intentar borrar el torneo');
      }
    })
  }

  editarTorneo() {
    this.cs.post('torneos', 'editarTorneo', this.formulario.value).subscribe((data: any) => {
      if (data) {
        alert(`El torneo ${this.formulario.controls['nombre'].value} ha sido editado`);
        this.update();
        this.formulario.reset();
        document.getElementById('selectPartido')!.hidden = false;
        document.getElementById('agregarEditar')!.textContent = "Agregar";
      } else {
        alert('Ocurrio un error al intentar editar el torneo');
      }
    })
  }
  
  agregarTorneo() {    
    this.cs.post('torneos', 'agregarTorneo', this.formulario.value).subscribe((data: any) => {
      if (data) {
        alert(`El torneo ${this.formulario.controls['nombre'].value} ha sido agregado`);
        this.update();
        this.formulario.reset();
      } else {
        alert('Ocurrio un error al intentar agregar el torneo');
      }
    })
  }

  parcharValores(torneo: Torneo) {
    document.getElementById('selectPartido')!.hidden = true;
    document.getElementById('agregarEditar')!.textContent = "Editar";
    this.formulario.patchValue(torneo);
  }

}
