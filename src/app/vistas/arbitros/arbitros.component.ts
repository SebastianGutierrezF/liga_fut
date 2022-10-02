import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-arbitros',
  templateUrl: './arbitros.component.html',
  styleUrls: ['./arbitros.component.css']
})
export class ArbitrosComponent implements OnInit {
  arbitros = [{
    nombre: "Ruperto", apellidos: "Puerto", contacto: "5534675435",
    email: "rpuerto@gmail.com", colocacion: "Centro"
  }];

  constructor(private cs: ConexionService) {
    this.cs.get('arbitros', 'getArbitros').subscribe((data: any) => {
      this.arbitros = data;
    })
  }

  ngOnInit(): void {
  }

}
