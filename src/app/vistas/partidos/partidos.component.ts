import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Arbitro } from 'src/app/interfaces/arbitro';
import { Equipo } from 'src/app/interfaces/equipo';
import { Partido } from 'src/app/interfaces/partido';
import { PartidoObj } from 'src/app/interfaces/partido-obj';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit {
  partidos: PartidoObj[] = [];
  equipos: Equipo[] = [];
  arbitros: Arbitro[] = [];
  formulario: FormGroup = this.fb.group({
    id_p: [,],
    id_a: [, Validators.required],
    id_e1: [, Validators.required],
    id_e2: [, Validators.required],
    fecha: [, Validators.required],
    hora: [, Validators.required],
  });

  constructor(private cs: ConexionService, private fb: FormBuilder) {
    this.update();
  }

  ngOnInit(): void {
  }

  update() {
    this.partidos.splice(0);
    this.cs.get("partidos", "getPartidos").subscribe((datos: any) => {
      datos.forEach((dato: Partido) => {
        let equipos: any[] = []; 
        let logos: any[] = [];
        if (dato.equipos && dato.logos) {
          logos = dato.logos.split(',');  
          equipos = dato.equipos.split(',');     
        }
        this.partidos.push({
          logo1: logos[1], logo2: logos[3], fecha: dato.fecha, hora: dato.hora,
          arbitro: dato.arbitro, id_p: dato.id_p, id_a: dato.id_a, id_e1: equipos[0], id_e2: equipos[1]});
      });
    });    
    this.cs.get('partidos', 'equiposCompletos').subscribe((data: any) => {
      this.equipos = data;
    });
    this.cs.get('arbitros', 'getArbitros').subscribe((data: any) => {
      this.arbitros = data;
    })
  }

  parcharValores(partido: PartidoObj) {   
    this.formulario.patchValue(partido);    
    document.getElementById('agregarEditar')!.textContent = 'Editar';
  }

  enviarDatos() {
    if (this.formulario.controls['id_p'].value == null) {
      this.agregarPartido();
    } else {
      this.editarPartido();
    }
  }

  sinEquipos() {
    return !this.equipos || this.equipos.length == 0;
  }

  agregarPartido() {
    if (this.formulario.controls['id_e1'].value == this.formulario.controls['id_e2'].value) {
      alert(`Debes seleccionar equipos diferentes.`);
    } else {
      this.cs.post('partidos', 'agregarPartido', this.formulario.value).subscribe((dato: any) => {
        if (dato) {
          alert(`El partido ha sido agregado.`);
          this.formulario.reset();
          this.update();
        } else {
          alert(`Ocurrio un error al agregar el partido.`);
        }
      })
    }
  }

  editarPartido() {
    this.cs.post('partidos', 'editarPartido', this.formulario.value).subscribe((datos: any) => {
      if (datos) {
        alert(`El partido ha sido editado.`);
        this.formulario.reset();
        this.update();
        document.getElementById('agregarEditar')!.textContent = "Agregar";
      } else {
        alert(`Ocurrio un error al editar el partido.`)
      }
    })
  }

  borrarPartido(partido: string) {    
    this.cs.post('partidos', 'borrarPartido', {'id_p': partido}).subscribe((datos: any) => {
      if (datos) {
        alert(`El partido ha sido eliminado.`);
        this.formulario.reset();
        this.update();
      } else {
        alert(`Ocurrio un error al intentar eliminar el partido.`)
      }
    })
  }

  notValid(campo: string) {
    return this.formulario.touched && this.formulario.controls[campo].invalid;
  }

}
