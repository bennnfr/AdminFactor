import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { CrearUsuarioComponent } from './usuarios/crearusuario.component';

import { LoginGuardGuard } from '../services/service.index';
import { VerUsuariosComponent } from './usuarios/verusuarios.component';
import { EditarUsuarioComponent } from './usuarios/editarusuario.component';
import { PrivilegiosUsuariosComponent } from './privilegiosusuarios/privilegiosusuarios.component';
import { PrivilegioUsuarioComponent } from './privilegiosusuarios/privilegiousuario.component';
import { CrearPrivilegioComponent } from './privilegiosusuarios/crearprivilegio.component';
import { ActualizaPrivilegioComponent } from './privilegiosusuarios/actualizaprivilegio.component';




const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: 'crearusuario', component: CrearUsuarioComponent, data: { titulo: 'Crear Usuario' } },
            { path: 'verusuarios', component: VerUsuariosComponent, data: { titulo: 'Usuarios' } },
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Usuario' } },
            { path: 'editarusuario/:id', component: EditarUsuarioComponent, data: { titulo: 'Editar Usuario' } },
            { path: 'privilegiosusuarios', component: PrivilegiosUsuariosComponent, data: { titulo: 'Privilegios Usuarios' } },
            { path: 'privilegiousuario/:id', component: PrivilegioUsuarioComponent, data: { titulo: 'Privilegios de Usuario' } },
            { path: 'privilegiousuario/crearprivilegio/:id', component: CrearPrivilegioComponent, data: { titulo: 'Crear Privilegio' } },
            { path: 'privilegiousuario/actualizaprivilegio/:idu/:idp', component: ActualizaPrivilegioComponent, data: { titulo: 'Actualiza Privilegio' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
