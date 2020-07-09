import { Component, OnInit, Input } from '@angular/core';
import { ReportesService } from '../../services/service.index';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal2 from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
declare var $;



@Component({
  selector: 'app-pagoscompany',
  templateUrl: './pagoscompany.component.html',
  styles: []
})
export class PagosCompanyComponent implements OnInit {

  constructor( public _reportesservice: ReportesService,
               public http: HttpClient) { }

  token = localStorage.getItem('token');
  doc = new jsPDF();
  facturas: any[] = [];
  usuario: string;
  cols: any[];
  colspdf: any[];
  selectedFac: any[];
  router: Router;
  fileName = 'ListaDeFacturas.xlsx';
  idc: string;
  selectedColumnsp: any[];
  selectedColumnspdf: any[];
  exportColumns: any[];
  companyes: any[];

  _selectedColumns: any[];

  ngOnInit() {

    this._reportesservice.getCompapanyes().subscribe( resp => { this.companyes = resp; console.log(this.companyes); } );

    this.cols = [

    //  { field:  'id_factura', header: 'ID'},
      { field:  'id_factura', header: 'ID Factura'},
      { field:  'cadena', header: 'Operacion'},
      { field:  'no_factura', header: 'Clave'},
      { field:  'proveedor', header: 'Cuenta Origen'},
      { field:  'importe', header: 'Cuenta Destino'},
      { field:  'moneda', header: 'Importe'},
      { field:  'fecha_operacion', header: 'Referencia'},
      { field:  'fecha_vencimiento', header: 'Descripcion'},
      { field:  'fecha_carga', header: 'RFC Ordenante'},
      { field:  'dias_transcurridos', header: 'IVA'},
      { field:  'folio_solicitud', header: 'Fecha Aplicacion'}
  ];

    this._selectedColumns = this.cols;
    this.colspdf = [

    //  { field:  'id_factura', header: 'ID'},
    { field:  'id_factura', header: 'ID Factura'},
      { field:  'cadena', header: 'Operacion'},
      { field:  'no_factura', header: 'Clave'},
      { field:  'proveedor', header: 'Cuenta Origen'},
      { field:  'importe', header: 'Cuenta Destino'},
      { field:  'moneda', header: 'Importe'},
      { field:  'fecha_operacion', header: 'Referencia'},
      { field:  'fecha_vencimiento', header: 'Descripcion'},
      { field:  'fecha_carga', header: 'RFC Ordenante'},
      { field:  'dias_transcurridos', header: 'IVA'},
      { field:  'folio_solicitud', header: 'Fecha Aplicacion'}
];
    this.selectedColumnsp = this.cols;
    this.exportColumns = this.colspdf.map(col => ({title: col.header, dataKey: col.field}));

  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
}

set selectedColumns(val: any[]) {
  // restore original order
  this._selectedColumns = this.cols.filter(col => val.includes(col));
}

generarReporte() {

  const company: any = document.getElementById('cadena');

  const valorcompany = company.options[company.selectedIndex].value;
  console.log(this.companyes);

  for ( const prop in this.companyes ) {

    if ( this.companyes[prop].nombre_cadena === valorcompany ) {

      this.idc = this.companyes[prop].id_cadena;
      break;
    }

  }

  const d = new Date((document.getElementById('fechaconsulta')as HTMLInputElement).value);
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

  const fecharepor = [year, month, day].join('-');

  swal2.fire({
    title: 'Cargando',
    allowOutsideClick: false
});
  swal2.showLoading();

  this._reportesservice.getCompanyPayments(fecharepor, this.idc).subscribe(resp => {swal2.close(); this.facturas = resp; console.log(this.facturas);

                                                                                    if (this.facturas.length === 0) {
                                                                                      swal2.fire(
                                                                                        'No se encontraron datos',
                                                                                        '',
                                                                                        'error'
                                                                                      );
                                                                                    }

                                                                                    }, (err) => {
                                                                                    swal2.close();
                                                                                    swal2.fire(
                                                                                         'Ocurrio un error al procesar la informacion',
                                                                                         '',
                                                                                         'error'
                                                                                      );
                                                                                    this.ngOnInit();
                                                                                    } );


}


  exportexcel() {
     /* table id is passed over here */
     const element = document.getElementById('tablaFacturas');
     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
     /* save to file */
     if ( this.facturas.length > 0 ) {

      this.fileName = this.facturas[0].charge_report_folio + '.xlsx';

     }
     XLSX.writeFile(wb, this.fileName);
  }


  exportpdf() {

   import('jspdf').then( jsPDF => {
    import('jspdf-autotable').then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.exportColumns, this.facturas);
        doc.save('ListaFacturas.pdf');
    });
});

  }

}
