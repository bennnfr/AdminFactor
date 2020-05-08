import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
declare var $;

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  @ViewChild( 'datatable', null ) table: ElementRef;
  dataTable: any;
  usuarios: any[] = [];
  progreso1: number = 20;
  progreso2: number = 30;

  constructor( public _usuarioservice: UsuarioService ) {  }

  cols: any[];
  selectedColumns: any[];

  ngOnInit() {

    this._usuarioservice.getUsuarios().subscribe(resp => {this.usuarios = resp; } );

    this.cols = [

      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'email', header: 'Correo' },
      { field: 'job', header: 'Puesto' },
      { field: 'gender', header: 'Genero' },
      { field: 'status', header: 'Estatus' },
      { field: 'herramientas', header: 'Herramientas' }
  ];
    this.selectedColumns = this.cols;
  }
}

   // this.dataTable = $( this.table.nativeElement );
   // this.dataTable.dataTable();





