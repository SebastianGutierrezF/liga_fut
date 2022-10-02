import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit {
  partidos = [{logo1: "", logo2: "", fecha: ""}]

  constructor(private cs: ConexionService) {
    this.cs.get("partidos", "getPartidos").subscribe((dato: any) => {
      this.partidos = dato;
    })
  }

  ngOnInit(): void {
  }

}
