import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../guards/login.guard';
import { ArbitrosComponent } from './arbitros/arbitros.component';
import { EquiposComponent } from './equipos/equipos.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { PartidosComponent } from './partidos/partidos.component';
import { TorneosComponent } from './torneos/torneos.component';
import { VistasComponent } from './vistas.component';

const routes: Routes = [
    {path: 'inicio', component: VistasComponent, canActivate: [LoginGuard]},
    {path: 'equipos', component: EquiposComponent, canActivate: [LoginGuard]},
    {path: 'jugadores', component: JugadoresComponent, canActivate: [LoginGuard]},
    {path: 'partidos', component: PartidosComponent, canActivate: [LoginGuard]},
    {path: 'arbitros', component: ArbitrosComponent, canActivate: [LoginGuard]},
    {path: 'torneos', component: TorneosComponent, canActivate: [LoginGuard]},
    {path: '*', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
