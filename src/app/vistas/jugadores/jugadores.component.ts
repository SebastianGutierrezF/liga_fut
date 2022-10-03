import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/interfaces/jugador';
import { JugadorObj } from 'src/app/interfaces/jugador-obj';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {
  equiposJugadores: JugadorObj[] = [];

  constructor(private cs: ConexionService) {
    this.cs.get('jugadores', 'getJugadores').subscribe((datos: any) => {
      datos.forEach((dato: Jugador) => {
        let obj: JugadorObj = {equipo: dato.equipo, logo: dato.logo, jugadores: []}
        dato.jugadores.split(',').forEach((jugador: string) => {
          obj.jugadores.push(jugador);
        })
        this.equiposJugadores.push(obj);
      });
    })
  }

  ngOnInit(): void {
  }

}
