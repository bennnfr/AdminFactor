import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  PrivilegiosUsuariosService,
  RolesService,
  ParametrosGeneralesService,
  LoginGuardGuard,
  OptionsService,
  UserOptionsService,
  ListasService
 } from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    PrivilegiosUsuariosService,
    RolesService,
    ParametrosGeneralesService,
    LoginGuardGuard,
    OptionsService,
    UserOptionsService,
    ListasService
  ],
  declarations: []
})
export class ServiceModule { }
