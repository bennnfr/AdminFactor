import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AltaSolicitudesService, OptionsService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import swal2 from 'sweetalert2';
import { Car, Facturas } from 'src/app/models/usuario.model';
import { FacturaSimulacion, Invoices } from 'src/app/models/facturas.model';

declare var $;

@Component({
  selector: 'app-altasolicitudes',
  templateUrl: './altasolicitudes.component.html',
  styles: []
})
export class AltaSolicitudesComponent implements OnInit {

  cols: any[];
  selectedCars1: any[] = [];
  selectedFac: Facturas[];
  options: any[] = [];
  facturas: any[] = [];
  facturass: any[] = [];
  facturasfiltradas: any[] = [];
  simulacion: any[];
  idu: string;
  cadenaproveedor: any[];
  nombrecadena: string[];
  nombreproveedor: string[];
  companyid: string[];
  supplierid: string[];
  invoices: any[] = [];
  load: boolean;

  muestratabla = true;

  constructor(private _formBuilder: FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              public _optionsservice: OptionsService,
              public _solicitudesservice: AltaSolicitudesService) {}

  ngOnInit() {

    this.muestratabla = true;
    this.selectedCars1 = [];
    (document.getElementById('porcentajeoperacion') as HTMLInputElement).value = '';
    (document.getElementById('fechafactura') as HTMLInputElement).value = '';
    (document.getElementById('fechaoperacion') as HTMLInputElement).value = '';
    (document.getElementById('folio') as HTMLInputElement).value = '';
    this.simulacion = [];

    this.idu = localStorage.getItem('id');

    this._solicitudesservice.getCadenaProveedor(this.idu).subscribe( resp => {this.cadenaproveedor = resp;
                                                                              this.nombrecadena = this.cadenaproveedor[0].cadena;
                                                                              this.nombreproveedor = this.cadenaproveedor[0].proveedor;
                                                                              this.companyid = this.cadenaproveedor[0].company_id;
                                                                              this.supplierid = this.cadenaproveedor[0].supplier_id;
                                                                              this._solicitudesservice.getFacturas(this.companyid, this.supplierid).subscribe( resp2 => {this.facturas = resp2;
                                                                            } );


    } );

    this.cols = [
    { field: 'invoice_folio', header: 'Numero de Factura' },
    { field: 'uuid', header: 'UUID' },
    { field: 'status', header: 'Estatus' },
    { field: 'invoice_date', header: 'Fecha Factura' },
    { field: 'due_date', header: 'Fecha Vencimiento' },
    { field: 'total', header: 'Total' }
  ];

  }

  lipiarcampos() {
    this.ngOnInit();
  }

  filtrafac() {

    this.muestratabla = false;

    this.facturasfiltradas = [];

    const a = new Date((document.getElementById('fechafactura')as HTMLInputElement).value);
    a.setMinutes( a.getMinutes() + a.getTimezoneOffset() );
    let montha = '' + (a.getMonth() + 1);
    let daya = '' + a.getDate();
    const yeara = a.getFullYear();

    if (montha.length < 2) {
        montha = '0' + montha;
    }
    if (daya.length < 2) {
        daya = '0' + daya;
    }

    const fechaoperacion = [yeara, montha, daya].join('-');

    this._solicitudesservice.getFacturas(this.companyid, this.supplierid).subscribe( resp => { this.facturass = resp;
                                                                // tslint:disable-next-line: forin
                                                                                               for ( const prop in this.facturas ) {
                                                                                                if ( this.facturass[prop].invoice_date === fechaoperacion ) {
                                                                                                this.facturasfiltradas.push(this.facturass[prop]);
                                                                                                }
                                                                                              }
    } );

  }

  recalcula() {

  //  console.log(this.selectedCars1);
    if (this.selectedCars1.length === 0) {
      swal2.fire(
        'Debe seleccionar al menos una factura',
        '',
        'error'
     );
    } else {
    let total = 0 ;

    const moneda: any = document.getElementById('moneda');

    const valormoneda = moneda.options[moneda.selectedIndex].value;
    // tslint:disable-next-line: forin
    for ( const prop in this.selectedCars1 ) {

    total = total + parseFloat( this.selectedCars1[prop].total );

    }
    // Fecha operacion request date
    const d = new Date((document.getElementById('fechafactura')as HTMLInputElement).value);
    d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    const fechafactura = [year, month, day].join('-');
  //  console.log(fechafactura);

    // Fecha Factura used date
    const a = new Date((document.getElementById('fechaoperacion')as HTMLInputElement).value);
    a.setMinutes( a.getMinutes() + a.getTimezoneOffset() );
    let montha = '' + (a.getMonth() + 1);
    let daya = '' + a.getDate();
    const yeara = a.getFullYear();

    if (montha.length < 2) {
        montha = '0' + montha;
    }
    if (daya.length < 2) {
        daya = '0' + daya;
    }

    const fechaoperacion = [yeara, montha, daya].join('-');

    const simulacion = new FacturaSimulacion(

    total.toString(),
    (document.getElementById('porcentajeoperacion') as HTMLInputElement).value,
    fechafactura,
    fechaoperacion,
    this.selectedCars1[0].due_date,
    valormoneda,
    this.companyid.toString(),
    this.supplierid.toString(),
    this.idu,
    (document.getElementById('folio') as HTMLInputElement).value,
    );

   // console.log(simulacion);

    this._solicitudesservice.getSimulacion( simulacion ).subscribe( resp => {this.simulacion = resp;
                                                                             const fecha1 = new Date(this.simulacion[0].used_date);
                                                                             const fecha2 = new Date(this.simulacion[0].due_date);
                                                                             const milisegundosdia = 24 * 60 * 60 * 1000;
                                                                             const milisegundostranscurridos = Math.abs(fecha1.getTime() - fecha2.getTime());
                                                                             const diastranscurridos = Math.round(milisegundostranscurridos / milisegundosdia);
                                                                             this.simulacion[0].diastranscurridos = diastranscurridos;
                                                                            }, (err) => {
                                                                              console.log(err);
                                                                              swal2.fire(
                                                                                   'Error en la Simulacion',
                                                                                   err.error.errors[0],
                                                                                   'error'
                                                                                );
                                                                              this.ngOnInit();
                                                                             } );
  }

  }

  prueba() {
    this.load = true;
    let total = 0 ;
    this.invoices = [];
    const moneda: any = document.getElementById('moneda');

    const valormoneda = moneda.options[moneda.selectedIndex].value;
    // tslint:disable-next-line: forin
    for ( const prop in this.selectedCars1 ) {

      total = total + parseFloat( this.selectedCars1[prop].total );

      this.invoices.push(this.selectedCars1[prop].id);

      }

    const d = new Date((document.getElementById('fechafactura')as HTMLInputElement).value);
    d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    const fechafactura = [year, month, day].join('-');

    const a = new Date((document.getElementById('fechaoperacion')as HTMLInputElement).value);
    a.setMinutes( a.getMinutes() + a.getTimezoneOffset() );
    let montha = '' + (a.getMonth() + 1);
    let daya = '' + a.getDate();
    const yeara = a.getFullYear();

    if (montha.length < 2) {
        montha = '0' + montha;
    }
    if (daya.length < 2) {
        daya = '0' + daya;
    }

    const fechaoperacion = [yeara, montha, daya].join('-');


    const data = {
      token: '',
      secret_key: '',
      invoices: [],
      request: { folio: (document.getElementById('folio') as HTMLInputElement).value,
                 company_id: this.companyid.toString(),
                 supplier_id: this.supplierid.toString(),
                 user_id: this.idu,
                 total: total.toString(),
                 capacity: (document.getElementById('porcentajeoperacion') as HTMLInputElement).value,
                 request_date: fechafactura,
                 used_date: fechaoperacion,
                 due_date: this.selectedCars1[0].due_date,
                 currency: valormoneda,
                 status: 'PENDIENTE'
               }
  };

    // tslint:disable-next-line: forin
    for (const prop in this.invoices) {
      data.invoices[prop] = {id: this.invoices[prop].toString() };
    }

    swal2.fire({
      title: 'Cargando',
      allowOutsideClick: false
 });
    swal2.showLoading();

    this._solicitudesservice.confirmacion(data).subscribe( resp => {
                                                                    swal2.close();
                                                                    swal2.fire(
                                                                   'Creacion de Solicitud',
                                                                   'Exitosa',
                                                                   'success'
                                                                   );
                                                                    this.load = false;
                                                                    this.ngOnInit();
                                                                  }, (err) => {
                                                                     swal2.close();
                                                                     console.log(err);
                                                                     swal2.fire(
                                                                          'Error al Confirmar los Datos',
                                                                          '',
                                                                          'error'
                                                                       );
                                                                     this.load = false;
                                                                     this.ngOnInit();
                                                                    }
                                                                    );
  }

}







