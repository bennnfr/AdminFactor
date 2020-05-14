import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginGuardGuard } from '../services/service.index';

// Generales
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Usuarios
import { CrearUsuarioComponent } from './usuarios/crearusuario.component';
import { VerUsuariosComponent } from './usuarios/verusuarios.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { EditarUsuarioComponent } from './usuarios/editarusuario.component';

// Privilegios Usuarios
import { PrivilegiosUsuariosComponent } from './privilegiosusuarios/privilegiosusuarios.component';
import { PrivilegioUsuarioComponent } from './privilegiosusuarios/privilegiousuario.component';
import { CrearPrivilegioComponent } from './privilegiosusuarios/crearprivilegio.component';
import { ActualizaPrivilegioComponent } from './privilegiosusuarios/actualizaprivilegio.component';

// Roles
import { RolesComponent } from './roles/roles.component';
import { CrearRolComponent } from './roles/crearrol.component';
import { ActualizaRolComponent } from './roles/actualizarol.component';

// Parametros Generales
import { ParametrosComponent } from './parametrosgenerales/parametros.component';
import { CreaParametroComponent } from './parametrosgenerales/creaparametro.component';
import { ActualizaParametroComponent } from './parametrosgenerales/actualizaparametro.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            // Generales
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            // Usuarios
            { path: 'crearusuario', component: CrearUsuarioComponent, data: { titulo: 'Crear Usuario' } },
            { path: 'verusuarios', component: VerUsuariosComponent, data: { titulo: 'Usuarios' } },
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Usuario' } },
            { path: 'editarusuario/:id', component: EditarUsuarioComponent, data: { titulo: 'Editar Usuario' } },
            // Privilegios Usuarios
            { path: 'privilegiosusuarios', component: PrivilegiosUsuariosComponent, data: { titulo: 'Privilegios Usuarios' } },
            { path: 'privilegiosusuarios/privilegiousuario/:id', component: PrivilegioUsuarioComponent, data: { titulo: 'Privilegios de Usuario' } },
            { path: 'privilegiousuarios/privilegiousuario/crearprivilegio/:id', component: CrearPrivilegioComponent, data: { titulo: 'Crear Privilegio' } },
            { path: 'privilegiousuarios/privilegiousuario/actualizaprivilegio/:idu/:idp', component: ActualizaPrivilegioComponent, data: { titulo: 'Actualiza Privilegio' } },
            // Roles
            { path: 'roles', component: RolesComponent, data: { titulo: 'Roles' } },
            { path: 'roles/crearrol', component: CrearRolComponent, data: { titulo: 'Crear Rol' } },
            { path: 'roles/actualizarol/:id', component: ActualizaRolComponent, data: { titulo: 'Actualiza Rol' } },
            // Parametros Generales
            { path: 'parametros', component: ParametrosComponent, data: { titulo: 'Parametros Generales' } },
            { path: 'parametros/creaparametro', component: CreaParametroComponent, data: { titulo: 'Crear Parametro General' } },
            { path: 'parametros/actualizarparametro/:id', component: ActualizaParametroComponent, data: { titulo: 'Actualizar Parametro General' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
