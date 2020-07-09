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
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styles: []
})
export class FacturasComponent implements OnInit {

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

    this._reportesservice.getReporteFacturas().subscribe(resp => {this.facturas = resp; } );

    this.cols = [

    //  { field:  'id_factura', header: 'ID'},
      { field:  'folio_solicitud', header: 'Folio Solicitud'},
      { field:  'uuid_factura_descontada', header: 'UUID'},
      { field:  'emisor', header: 'Emisor'},
      { field:  'receptor', header: 'Receptor'},
      { field:  'moneda', header: 'Moeda'},
      { field:  'fecha_operacion', header: 'Fecha Operacion'},
      { field:  'porcentaje_operado', header: 'Porcentaje Operado'},
      { field:  'monto_operado', header: 'Monto Operado'},
      { field:  'disponible', header: 'Disponible'},
      { field:  'fecha_vencimiento', header: 'Fecha Vencimiento'},
      { field:  'fecha_emision', header: 'Fecha Emision'},
      { field:  'fecha_carga', header: 'Fecha Carga'},
      { field:  'estatus', header: 'Estatus'},
      { field:  'intereses', header: 'Intereses'},
      { field:  'comision_cadena', header: 'Comision Cadena'},
      { field:  'dia_pago_cadena', header: 'Dia Pago Cadena'},
      { field:  'amount', header: 'Amount'},
      { field:  'dias_al_vencimiento', header: 'Dias al Vencimiento'}
  ];

    this._selectedColumns = this.cols;
    this.colspdf = [

    //  { field:  'id_factura', header: 'ID'},
    { field:  'uuid_factura_descontada', header: 'UUID'},
    { field:  'emisor', header: 'Emisor'},
    { field:  'receptor', header: 'Receptor'},
    { field:  'moneda', header: 'Moeda'},
    { field:  'fecha_operacion', header: 'Fecha Operacion'},
    { field:  'porcentaje_operado', header: 'Porcentaje Operado'},
    { field:  'monto_operado', header: 'Monto Operado'},
    { field:  'disponible', header: 'Disponible'},
    { field:  'fecha_vencimiento', header: 'Fecha Vencimiento'},
    { field:  'fecha_emision', header: 'Fecha Emision'},
    { field:  'fecha_carga', header: 'Fecha Carga'},
    { field:  'estatus', header: 'Estatus'},
    { field:  'intereses', header: 'Intereses'},
    { field:  'comision_cadena', header: 'Comision Cadena'},
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
     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
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
