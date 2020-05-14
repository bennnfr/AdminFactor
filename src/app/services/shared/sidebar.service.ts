import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Catalogos',
      icono: 'mdi mdi-file-document',
      submenu: [
      //  { titulo: 'Crear Usuario', url: '/crearusuario' },
        { titulo : 'Usuarios', url: '/verusuarios' },
        { titulo : 'Privilegios Usuarios', url: '/privilegiosusuarios' },
        { titulo : 'Roles', url: '/roles' },
        { titulo : 'Parametros Generales', url: '/parametros'  }
      //  { titulo: 'Promesas', url: '/promesas' },
      //  { titulo: 'RxJs', url: '/rxjs' }
      ]
    }
  ];

  menu2: any = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-view-dashboard',
      url: '/dashboard'
    }
  ];

  constructor() { }

}
