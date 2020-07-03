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
  selector: 'app-dailyoperations',
  templateUrl: './dailyoperations.component.html',
  styles: []
})
export class DailyoperationsComponent implements OnInit {

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
  selectedColumnsp: any[];
  selectedColumnspdf: any[];
  exportColumns: any[];

  _selectedColumns: any[];

  ngOnInit() {

    this._reportesservice.getReporteDaily().subscribe(resp => {this.facturas = resp; console.log(this.facturas); } );

    this.cols = [

    //  { field:  'id_factura', header: 'ID'},
      { field:  'folio_solicitud', header: 'Folio Solicitud'},
      { field:  'folio_factura', header: 'Folio Factura'},
      { field:  'proveedor', header: 'Proveedor'},
      { field:  'deudor', header: 'Deudor'},
      { field:  'fecha_operacion', header: 'Fecha Operacion'},
      { field:  'fecha_vencimiento', header: 'Fecha Vencimiento'},
      { field:  'dias', header: 'Dias'},
      { field:  'importe', header: 'Importe'},
      { field:  'moneda', header: 'Moneda'},
      { field:  'tasa_interbancaria', header: 'Tasa Interbancaria'},
      { field:  'sobre_tasa', header: 'Sobre Tasa'},
      { field:  'tasa_factor', header: 'Tasa Factor'},
      { field:  'intereses_factor', header: 'Intereses Factor'},
      { field:  'importe_sin_intereses', header: 'Importe sin Intereses'},
      { field:  'por_disposicion_solicitud', header: 'Por Dispocision Solicitud'},
      { field:  'id_solicitud', header: 'Id Solicitud'}
  ];

    this._selectedColumns = this.cols;
    this.colspdf = [

    //  { field:  'id_factura', header: 'ID'},
      { field:  'folio_solicitud', header: 'Folio Solicitud'},
      { field:  'uuid_factura_descontada', header: 'UUID'},
      { field:  'emisor', header: 'Emisor'},
      { field:  'receptor', header: 'Receptor'},
      { field:  'moneda', header: 'Moeda'},
      { field:  'fecha_operacion', header: 'Fecha Operacion'},
      { field:  'porcentaje_operado', header: 'Porcentaje Operado'},
      { field:  'monto_operado', header: 'Monto Operado'}
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


  exportexcel() {
     /* table id is passed over here */
     const element = document.getElementById('tablaFacturas');
     console.log(element);
     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     console.log(wb);
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
     /* save to file */
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
