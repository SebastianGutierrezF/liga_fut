import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Jugador } from 'src/app/interfaces/jugador';
import { JugadorEquipo } from 'src/app/interfaces/jugador-equipo';
import { JugadorEquipoObj } from 'src/app/interfaces/jugador-equipo-obj';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {
  equiposJugadores: JugadorEquipoObj[] = [];
  jugadores: Jugador[] = [];
  showForm: boolean = false;
  formulario: FormGroup = this.fb.group({
    id_j: [,],
    ide_jq: [, Validators.required],
    nombre_j: [, [Validators.required, Validators.maxLength(40)]],
    apellidos_j: [, [Validators.required, Validators.maxLength(40)]],
    fechan_j: [, Validators.required]
  })

  constructor(private cs: ConexionService, private fb: FormBuilder) {
    this.update();
  }

  ngOnInit(): void {
  }

  update() {
    this.equiposJugadores.splice(0);
    this.cs.get('jugadores', 'getJugadoresEquipos').subscribe((datos: any) => {
      datos.forEach((dato: JugadorEquipo) => {
        let obj: JugadorEquipoObj = {ide_jq: dato.ide_jq, equipo: dato.equipo, logo: dato.logo, jugadores: []}
        if (dato.jugadores) {
          dato.jugadores.split(',').forEach((jugador: string) => {
            obj.jugadores.push(jugador);
          })
        }
        this.equiposJugadores.push(obj);
      });
    })
    this.cs.get('jugadores', 'getJugadores').subscribe((datos: any) => {
      this.jugadores = datos;      
    })
  }

  parcharValores(jugador: string) {
    this.showForm = true;
    const idJugador = jugador.split(' ')[0];
    const selected = this.jugadores.find((jugador) => {
      return jugador.id_j == idJugador;
    })
    if (selected) {
      setTimeout(() => {
        this.formulario.patchValue(selected);
        document.getElementById('formTitle')!.textContent = "Editar jugador";
        document.getElementById('agregarEditar')!.textContent = 'Editar';
      }, 500);
    }
  }

  enviarDatos() {
    const fechaNac = moment(this.formulario.controls['fechan_j'].value);
    const now = moment();
    if (now.diff(fechaNac, 'years') < 18) {
      alert('El jugador debe sar mayor de 18 años.');
      return;
    }
    if (this.formulario.controls['id_j'].value == null) {
      this.agregarJugador();
    } else {
      this.editarJugador();
    }
  }

  agregarJugador() {
    this.cs.post('jugadores', 'agregarJugador', this.formulario.value).subscribe((dato: any) => {
      if (dato) {
        alert(`Jugador ${this.formulario.controls['nombre_j'].value} ha sido agregado.`);
        this.formulario.reset();
        this.update();
        this.showForm = false;
      } else {
        alert(`Ocurrio un error al agregar el jugador.`);
      }
    })
  }

  editarJugador() {
    this.cs.post('jugadores', 'editarJugador', this.formulario.value).subscribe((datos: any) => {
      if (datos) {
        alert(`Jugador ${this.formulario.controls['nombre_j'].value} ha sido editado.`);
        this.formulario.reset();
        this.update();
        document.getElementById('formTitle')!.textContent = "Agregar jugador";
        document.getElementById('agregarEditar')!.textContent = "Agregar";
        this.showForm = false;
      } else {
        alert(`Ocurrio un error al editar el jugador.`)
      }
    })
  }

  borrarJugador(jugador: string) {
    const idJugador = jugador.split(' ')[0];
    const nombreJ = jugador.split(' ')[1];    
    this.cs.post('jugadores', 'borrarJugador', {'id_j': idJugador}).subscribe((datos: any) => {
      if (datos) {
        alert(`Jugador ${nombreJ} ha sido eliminado.`);
        this.formulario.reset();
        this.update();
      } else {
        alert(`Ocurrio un error al intentar borrar el jugador.`)
      }
    })
  }

  toggleFormulario() {
    if (this.showForm) { this.showForm = false } else this.showForm = true;
  }

  notValid(campo: string) {
    return this.formulario.touched && this.formulario.controls[campo].invalid;
  }

}
