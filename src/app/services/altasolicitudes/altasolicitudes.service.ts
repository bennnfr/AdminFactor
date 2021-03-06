import { Injectable } from '@angular/core';
import { Usuario, Usuario2, Usuario3, UserOptions } from '../../models/usuario.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS, SECRET_KEY } from '../../config/config';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Perfisica, PerMoral, ContribuyenteFisica, ContribuyenteMoral, DocumentoPropiedad } from '../../models/personas.model';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { FacturaSimulacion } from 'src/app/models/facturas.model';


@Injectable()
export class AltaSolicitudesService {

  usuario: Usuario;
  token: string;
  usuario2: Usuario2;
  idUsuario: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  getCadenaProveedor( idu: string ) {

    const url = `${URL_SERVICIOS}/reports/user_id/${idu}/user_supplier?token=${this.token}&secret_key=${SECRET_KEY}`;

    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp;
      } )
    );
  }

  getFacturas(companyid, supplierid, currency) {

    const url = `${URL_SERVICIOS}/reports/company_id/${companyid}/supplier_id/${supplierid}/supplier_invoices?token=${this.token}&secret_key=${SECRET_KEY}&currency=${currency}`;

    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp;
      } )
    );

  }

  crearArreglof( contribuObj: any) {

    const facturas: any[] = [];
    const resul: any[] = [];

    if ( contribuObj === null ) { return []; }

    // tslint:disable-next-line: forin
    for ( const prop in contribuObj.data ) {
      resul.push( contribuObj.data[prop].attributes );
    }

    return resul;

  }

  getSimulacion( simul: FacturaSimulacion ) {

    const url = `${URL_SERVICIOS}/requests?request[folio]=${simul.folio}&request[total]=${simul.total}&request[capacity]=${simul.porcentaje}
                &request[request_date]=${simul.requestdate}&request[used_date]=${simul.useddate}&request[due_date]=${simul.duedate}
                &request[currency]=${simul.tmoneda}&request[status]=PENDIENTE&request[company_id]=${simul.companyid}
                &request[supplier_id]=${simul.supplierid}&request[user_id]=${simul.userid}&token=${this.token}&secret_key=${SECRET_KEY}&simulation=true`;

    return this.http.post( url, null ).pipe(
                map( (resp: any) => {
                  return this.crearArreglosimul(resp);
                }));

  }

  crearArreglosimul( contribuObj: any) {

    const facturas: any[] = [];
    const resul: any[] = [];

    if ( contribuObj === null ) { return []; }

    resul.push( contribuObj.data.attributes );

    return resul;

  }

  confirmacion( datos ) {

    datos.token = this.token;
    datos.secret_key = SECRET_KEY;

    const url = `${URL_SERVICIOS}/requests`;

    return this.http.post(url, datos);

  }

  getSolicitudesxusuario( idu ) {

  const url = `${URL_SERVICIOS}/reports/user_id/${idu}/user_requests?token=${this.token}&secret_key=${SECRET_KEY}`;

  return this.http.get(url).pipe(
    map( (resp: any) => {
      return resp;
    } )
  );

  }


  getUsuariosFinanciero() {

    const url = `${URL_SERVICIOS}/reports/job/FINANCIERA/financial_workers?token=${this.token}&secret_key=${SECRET_KEY}`;

    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp;
      } )
    );

    }

  updateSolicitudes( ids, params ) {

    params.token = this.token;
    params.secret_key = SECRET_KEY;


    const url = `${URL_SERVICIOS}/requests/${ids}`;

    return this.http.patch( url, params ).pipe(
      map( (resp: any) => { return resp;
      } ));

  }

  getEstatusFacturas() {

    const url = `${URL_SERVICIOS}/lists/domain/REQUEST_STATUS?token=${this.token}&secret_key=${SECRET_KEY}`;

    return this.http.get(url).pipe(
      map( (resp: any) => {
        return this.crearArreglostatus(resp);
      } )
    );

  }

  crearArreglostatus( contribuObj: any) {

    const facturas: any[] = [];
    const resul: any[] = [];

    if ( contribuObj === null ) { return []; }

    // tslint:disable-next-line: forin
    for ( const prop in contribuObj.data ) {
      resul.push( contribuObj.data[prop].attributes );
    }

    return resul;

  }

  // LISTAS
  getPaymentCurrency() {

    const url = `${URL_SERVICIOS}/lists/domain/PAYMENT_CURRENCY?token=${this.token}&secret_key=${SECRET_KEY}`;



    return this.http.get(url).pipe(
      map( (resp: any) => {
        return this.crearArregloList(resp);
      } )
    );

  }

  crearArregloList( contribuObj: any) {

    const rr: any[] = [];
    const resul: any[] = [];

    if ( contribuObj === null ) { return []; }
    Object.keys ( contribuObj ).forEach( key => {
      const rol: any = contribuObj[key];
      rr.push( rol );
    });
    // tslint:disable-next-line: forin
    for ( const prop in rr[0] ) {

      resul.push( rr[0][prop].attributes.value );

    }

    return resul;

  }

}
