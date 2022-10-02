import { Component, OnInit } from '@angular/core';
import { Torneo } from 'src/app/interfaces/torneo';
import { TorneoObj } from 'src/app/interfaces/torneo-obj';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.css']
})
export class TorneosComponent implements OnInit {
  torneos: TorneoObj[] = [];

  constructor(private cs: ConexionService) {
    // this.torneos.pop();
    this.cs.get('torneos', 'getTorneos').subscribe((datos: any) => {
      datos.forEach((dato: Torneo) => {
        let obj: TorneoObj = {torneo: dato.torneo, partidos: []};
        dato.partidos.split(', ').forEach((partido: string) => {
          obj.partidos.push(partido);
        })
        this.torneos.push(obj);
      });
    })
  }

  ngOnInit(): void {
  }

}
