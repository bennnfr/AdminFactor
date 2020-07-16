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
// Options
import { OptionsComponent } from './options/options.component';
import { CreaOptionComponent } from './options/creaoption.component';
import { ActualizaOptionComponent } from './options/actualizaoption.component';
// User Options
import { UsuariosOptionsComponent } from './userOptions/usuariosoptions.component';
import { AsignaOptionsComponent } from './userOptions/asignaoptions.component';
// Listas
import { ListasComponent } from './listas/listas.component';
import { CreaListaComponent } from './listas/crealista.component';
import { ActualizaListaComponent } from './listas/actualizalista.component';
// Role Options
import { RolesOptionsComponent } from './roleOptions/rolesoptions.component';
import { AsignaOptionsRolesComponent } from './roleOptions/asignaoptionsroles.component';
// Alta contribuyentes
import { AltacontribuyentesComponent } from './altacontribuyentes/altacontribuyentes.component';
// Mantenimiento Contribuyentes
import { MantcontribuyentesComponent } from './mantenimientocontribuyentes/mantcontribuyentes.component';
// Alta Solicitudes
import { AltaSolicitudesComponent } from './alta solicitudes/altasolicitudes.component';
// Estatus Solicitudes
import { EstatusSolicitudesComponent } from './estatussolicitudes/estatussolicitudes.component';
// Reportes
import { FacturasComponent } from './reportes/facturas.component';
import { DailyoperationsComponent } from './reportes/dailyoperations.component';
import { LayoutBanorteComponent } from './reportes/layoutbanorte.component';
import { PagosCompanyComponent } from './reportes/pagoscompany.component';
import { FacturasDetallesComponent } from './reportes/facturasdetalles.component';
import { FacturaDetalleComponent } from './reportes/facturadetalle.component';
import { ReporteSolicitudesComponent } from './reportes/reportesolicitudes.component';
import { ReporteSolicitudesDetallesComponent } from './reportes/reportesolicitudesdetalles.component';
// Pagos
import { AproveedorComponent } from './pagos/aproveedor.component';
import { DeCadenaComponent } from './pagos/decadena.component';
import { ReporteSolicitudDetalleComponent } from './reportes/reportesolicituddetalle.component';








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
            // Options
            { path: 'options', component: OptionsComponent, data: { titulo: 'Opciones' } },
            { path: 'options/creaoption', component: CreaOptionComponent, data: { titulo: 'Crear Opcion' } },
            { path: 'options/actualizaoption/:id', component: ActualizaOptionComponent, data: { titulo: 'Actualizar Opcion' } },
            // User Options
            { path: 'usuariosoptions', component: UsuariosOptionsComponent, data: { titulo: 'Usuarios Opciones' } },
            { path: 'usuariosoptions/asignaroptions/:id', component: AsignaOptionsComponent, data: { titulo: 'Asignar Opciones a Usuario' } },
            // Listas
            { path: 'listas', component: ListasComponent, data: { titulo: 'Listas' } },
            { path: 'listas/crealista', component: CreaListaComponent, data: { titulo: 'Crear Lista' } },
            { path: 'listas/actualizalista/:id', component: ActualizaListaComponent, data: { titulo: 'Actualizar Lista' } },
            // role Options
            { path: 'rolesoptions', component: RolesOptionsComponent, data: { titulo: 'Roles Opciones' } },
            { path: 'rolesoptions/asignaoptionsroles/:id', component: AsignaOptionsRolesComponent, data: { titulo: 'Asigna Opciones Rol' } },
            // Alta contribuyentes
            { path: 'altacontribuyentes', component: AltacontribuyentesComponent, data: { titulo: 'Alta de contribuyentes' } },
            // Mantenimiento Contribuyentes
            { path: 'mantenimientocontribuyentes', component: MantcontribuyentesComponent, data: { titulo: 'Mantenimiento Contribuyentes' } },
            // Alta solicitudes
            { path: 'altasolicitudes', component: AltaSolicitudesComponent, data: { titulo: 'Alta Solicitudes' } },
            // Estatus Solicitudes
            { path: 'estatussolicitudes', component: EstatusSolicitudesComponent, data: { titulo: 'Flujo de solicitudes' } },
            // Reportes
            { path: 'reportefacturas', component: FacturasComponent, data: { titulo: 'Reporte General de Facturas' } },
            { path: 'reportediario', component: DailyoperationsComponent, data: { titulo: 'Reporte Diario' } },
            { path: 'banorte', component: LayoutBanorteComponent, data: { titulo: 'Layout Banorte' } },
            { path: 'pagoscompany', component: PagosCompanyComponent, data: { titulo: 'Pagos Cadena' } },
            { path: 'facturasdetalles', component: FacturasDetallesComponent, data: { titulo: 'Detalles de Facturas' } },
            { path: 'facturasdetalles/facturadetalle/:id', component: FacturaDetalleComponent, data: { titulo: 'Detalles de Factura' } },
            { path: 'reportesolicitudes', component: ReporteSolicitudesComponent, data: { titulo: 'Solicitudes' } },
            { path: 'reportesolicitudesdetalles', component: ReporteSolicitudesDetallesComponent, data: { titulo: 'Detalles de Solicitudes' } },
            { path: 'reportesolicitudesdetalles/reportesolicituddetalle/:id', component: ReporteSolicitudDetalleComponent, data: { titulo: 'Detalles de Solicitud' } },
            // Pagos
            { path : 'pagos/aproveedor', component: AproveedorComponent, data: { titulo: 'Pago a Proveedor' } },
            { path : 'pagos/decadena', component: DeCadenaComponent, data: { titulo: 'Pago de Cadena' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
