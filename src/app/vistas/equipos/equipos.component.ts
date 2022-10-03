import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  equipos = [{equipo: "", logo: ""}];

  constructor(private cs: ConexionService) {
    this.cs.get('equipos', 'getEquipos').subscribe((data: any) => {
      this.equipos = data;
    })
    
  }

  ngOnInit(): void {
  }

}
