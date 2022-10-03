import { Component, OnInit } from '@angular/core';
import { Arbitro } from 'src/app/interfaces/arbitro';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-arbitros',
  templateUrl: './arbitros.component.html',
  styleUrls: ['./arbitros.component.css']
})
export class ArbitrosComponent implements OnInit {
  arbitros: Arbitro[] = [];

  constructor(private cs: ConexionService) {
    this.cs.get('arbitros', 'getArbitros').subscribe((data: any) => {
      this.arbitros = data;
    })
  }

  ngOnInit(): void {
  }

}
