import { NgModule } from '@angular/core';
import { AppRoutingModule } from './vistas-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { ArbitrosComponent } from './arbitros/arbitros.component';
import { EquiposComponent } from './equipos/equipos.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { PartidosComponent } from './partidos/partidos.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TorneosComponent } from './torneos/torneos.component';
import { VistasComponent } from './vistas.component';

@NgModule({
  declarations: [
    ArbitrosComponent,
    EquiposComponent,
    JugadoresComponent,
    PartidosComponent,
    TopNavComponent,
    TorneosComponent,
    VistasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
})
export class VistasModule { }
