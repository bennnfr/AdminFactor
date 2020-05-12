import { Component, OnInit } from '@angular/core';
import { UsuarioService, PrivilegiosUsuariosService } from '../../services/service.index';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal2 from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
declare var $;


@Component({
  selector: 'app-privilegiosusuarios',
  templateUrl: './privilegiosusuarios.component.html',
  styles: []
})
export class PrivilegiosUsuariosComponent implements OnInit {

  constructor( public _usuarioservice: UsuarioService,
               public _privilegiosusuarios: PrivilegiosUsuariosService,
               public http: HttpClient) { }

  token = localStorage.getItem('token');
  doc = new jsPDF();
  usuarios: any[] = [];
  usuario: string;
  cols: any[];
  selectedFac: any[];
  router: Router;
  fileName = 'ListaDeUsuarios.xlsx';
  selectedColumns: any[];
  exportColumns: any[];

  ngOnInit() {

    this._usuarioservice.getUsuarios().subscribe(resp => {this.usuarios = resp; } );

    this.cols = [

      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'email', header: 'Correo' },
      { field: 'privilegios', header: 'Privilegios' }

  ];

  }

}
