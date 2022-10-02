import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {
  equiposJugadores = [
    {nombre: "", logo: "", jugadores: ["Messi", "Ronaldiño"]},
  ];

  constructor(private cs: ConexionService) {
    this.cs.get('jugadores', 'getJugadores').subscribe((dato: any) => {
      this.equiposJugadores = dato;
    })
  }

  ngOnInit(): void {
  }

}
