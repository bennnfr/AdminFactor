import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Catalogos',
      icono: 'mdi mdi-file-document',
      submenu: [

        { titulo : 'Usuarios', url: '/verusuarios' },
        { titulo : 'Privilegios Usuarios', url: '/privilegiosusuarios' },
        { titulo : 'Roles', url: '/roles' },
        { titulo : 'Parametros Generales', url: '/parametros'  },
        { titulo : 'Opciones', url: '/options' },
        { titulo : 'Listas', url: '/listas' },
        { titulo : 'Opciones Usuarios', url: '/usuariosoptions' },
        { titulo : 'Roles opciones', url: '/rolesoptions' }

      ]
    },
    {
      titulo: 'Contribu',
      icono: 'mdi mdi-file-document',
      submenu: [

        { titulo : 'Alta', url: '/altacontribuyentes' },
        { titulo : 'Mantenimiento', url: '/mantenimientocontribuyentes' }

      ]
    },
    {
      titulo: 'Solicitudes',
      icono: 'mdi mdi-file-document',
      submenu: [

        { titulo : 'Alta', url: '/altasolicitudes' },
        { titulo : 'Estatus', url: '/estatussolicitudes' }
      ]
    },
    {
      titulo: 'Reportes',
      icono: 'mdi mdi-file-document',
      submenu: [

        { titulo : 'Facturas', url: '/reportefacturas' },
        { titulo : 'Reporte Diario', url: '/reportediario' }
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
