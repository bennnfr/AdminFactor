
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {TableModule} from 'primeng/table';


// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

import { CommonModule } from '@angular/common';
import {PickListModule} from 'primeng/picklist';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { CrearUsuarioComponent } from './usuarios/crearusuario.component';
import { VerUsuariosComponent } from './usuarios/verusuarios.component';
import { EditarUsuarioComponent } from './usuarios/editarusuario.component';
import { DataTablesModule } from 'angular-datatables';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputSwitchModule} from 'primeng/inputswitch';
import { PipesModule } from '../pipes/pipes.module';
import { PrivilegiosUsuariosComponent } from './privilegiosusuarios/privilegiosusuarios.component';
import { PrivilegioUsuarioComponent } from './privilegiosusuarios/privilegiousuario.component';
import { CrearPrivilegioComponent } from './privilegiosusuarios/crearprivilegio.component';
import { ActualizaPrivilegioComponent } from './privilegiosusuarios/actualizaprivilegio.component';
import { RolesComponent } from './roles/roles.component';
import { CrearRolComponent } from './roles/crearrol.component';
import { ActualizaRolComponent } from './roles/actualizarol.component';
import { ParametrosComponent } from './parametrosgenerales/parametros.component';
import { CreaParametroComponent } from './parametrosgenerales/creaparametro.component';
import { ActualizaParametroComponent } from './parametrosgenerales/actualizaparametro.component';
import { OptionsComponent } from './options/options.component';
import { CreaOptionComponent } from './options/creaoption.component';
import { ActualizaOptionComponent } from './options/actualizaoption.component';
import { AsignaOptionsComponent } from './userOptions/asignaOptions.component';
import { UsuariosOptionsComponent } from './userOptions/usuariosoptions.component';
import { ListasComponent } from './listas/listas.component';
import { CreaListaComponent } from './listas/crealista.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        RxjsComponent,
        CrearUsuarioComponent,
        VerUsuariosComponent,
        EditarUsuarioComponent,
        PrivilegiosUsuariosComponent,
        PrivilegioUsuarioComponent,
        CrearPrivilegioComponent,
        ActualizaPrivilegioComponent,
        RolesComponent,
        CrearRolComponent,
        ActualizaRolComponent,
        ParametrosComponent,
        CreaParametroComponent,
        ActualizaParametroComponent,
        OptionsComponent,
        CreaOptionComponent,
        ActualizaOptionComponent,
        AsignaOptionsComponent,
        UsuariosOptionsComponent,
        ListasComponent,
        CreaListaComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        PipesModule,
        CommonModule,
        TableModule,
        BrowserAnimationsModule,
        DataTablesModule,
        InputSwitchModule,
        PickListModule
    ]
})
export class PagesModule { }
