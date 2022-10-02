import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbitrosComponent } from './arbitros/arbitros.component';
import { EquiposComponent } from './equipos/equipos.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { PartidosComponent } from './partidos/partidos.component';
import { TorneosComponent } from './torneos/torneos.component';
import { VistasComponent } from './vistas.component';

const routes: Routes = [
    {path: '', component: VistasComponent},
    {path: 'inicio', component: VistasComponent},
    {path: 'equipos', component: EquiposComponent},
    {path: 'jugadores', component: JugadoresComponent},
    {path: 'partidos', component: PartidosComponent},
    {path: 'arbitros', component: ArbitrosComponent},
    {path: 'torneos', component: TorneosComponent},
    {path: '*', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
