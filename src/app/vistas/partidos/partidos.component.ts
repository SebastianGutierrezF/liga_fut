import { Component, OnInit } from '@angular/core';
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

  constructor(private cs: ConexionService) {
    this.cs.get("partidos", "getPartidos").subscribe((datos: any) => {
      datos.forEach((dato: Partido) => {
        const logos = dato.logo.split(',');
        this.partidos.push({logo1: logos[0], logo2: logos[1], fecha: dato.fecha, arbitro: dato.arbitro});
      });
      
    })
  }

  ngOnInit(): void {
  }

}
