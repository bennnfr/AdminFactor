import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AltaSolicitudesService, OptionsService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import swal2 from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-estatussolicitudes',
  templateUrl: './estatussolicitudes.component.html',
  styles: []
})
export class EstatusSolicitudesComponent implements OnInit {


  selectedSol: any[] = [];
  cols: any[] = [];
  solicitudes: any[] = [];
  estatussolicitudes: any[] = [];
  usuarios: any[] = [];
  idu: string;

  constructor(private _formBuilder: FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              public _optionsservice: OptionsService,
              public _solicitudesservice: AltaSolicitudesService) {}

  ngOnInit() {

    const estatus: any = document.getElementById('estatus');

    estatus.options[estatus.selectedIndex].value = 0;

    this.selectedSol = [];

    this.idu = localStorage.getItem('id');

    this._solicitudesservice.getSolicitudesxusuario(this.idu).subscribe( resp => { this.solicitudes = resp; console.log(this.solicitudes)} );

    this._solicitudesservice.getUsuariosFinanciero().subscribe( resp => { this.usuarios = resp; } );

    this._solicitudesservice.getEstatusFacturas().subscribe( resp => { this.estatussolicitudes = resp; } );

    this.cols = [

    { field: 'fecha_factura', header: 'Fecha Factura' },
    { field: 'fecha_operacion', header: 'Fecha Operacion' },
    { field: 'fecha_vencimiento', header: 'Fecha Vencimiento' },
    { field: 'total', header: 'Total' },
    { field: 'usuario', header: 'Usuario' },
    { field: 'status', header: 'Estatus' },
    { field: 'cadena', header: 'Cadena' },
    { field: 'proovedor', header: 'Proveedor' }
  ];

  }

  guardarCambios() {

    let idu = '';

    const usuario: any = document.getElementById('usuario');
    const estatus: any = document.getElementById('estatus');

    const valorusuario = usuario.options[usuario.selectedIndex].value;
    const valorestatus = estatus.options[estatus.selectedIndex].value;

    if ( this.selectedSol.length === 0 ) {

      swal2.fire(
        'Debe seleccionar al menos una solicitud',
        '',
        'error'
        );

    } else if ( valorestatus === '0' ) {

      swal2.fire(
        'Debe seleccionar un estatus',
        '',
        'error'
        );

    } else if ( valorusuario === '' ) {

      swal2.fire(
        'Debe seleccionar un usuario',
        '',
        'error'
        );

    } else {

      for ( const prop in this.usuarios ) {

        if (this.usuarios[prop].name === valorusuario) {

          idu = this.usuarios[prop].id;

        }

      }

      // tslint:disable-next-line: forin
      for (const prop in this.selectedSol) {

        const ids = this.selectedSol[prop].id;

        const params = {
          token: '',
          secret_key: '',
          folio: this.selectedSol[prop].folio,
          user_id: idu,
          status: valorestatus

      };

        this._solicitudesservice.updateSolicitudes(ids, params).subscribe();
      }
      location.reload();
      swal2.fire(
        'Modificacion de Solicitudes',
        'Exitosa',
        'success'
        );



    }

  }


}







