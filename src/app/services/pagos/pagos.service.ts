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
export class PagosService {

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

  getProveedores() {

    const url = `${URL_SERVICIOS}/reports/payment_suppliers?token=${this.token}&secret_key=${SECRET_KEY}`;

    return this.http.get( url ).pipe(
      map ( (resp: any) => {
        return resp;
      }
      )
    );

  }

  getCadenas() {

    const url = `${URL_SERVICIOS}/reports/payment_companies?token=${this.token}&secret_key=${SECRET_KEY}`;

    return this.http.get( url ).pipe(
      map ( (resp: any) => {
        return resp;
      }
      )
    );

  }

  getFacturasPagoProveedor( idp, tpago ) {

    const url = `${URL_SERVICIOS}/reports/supplier_id/${idp}/currency/${tpago}/payment_supplier_invoices?token=${this.token}&secret_key=${SECRET_KEY}`;

    return this.http.get( url ).pipe(
      map ( (resp: any) => {
        return resp;
      }
      )
    );

  }

  getFacturasPagoCadena( idp, tpago ) {

    console.log(idp);
    console.log(tpago);

    const url = `${URL_SERVICIOS}/reports/company_id/${idp}/currency/${tpago}/payment_company_invoices?token=${this.token}&secret_key=${SECRET_KEY}`;

    return this.http.get( url ).pipe(
      map ( (resp: any) => {
        return resp;
      }
      )
    );

  }

  aplicarPago( params ) {

    const url = `${URL_SERVICIOS}/payments`;

    params.token = this.token;
    params.secret_key = SECRET_KEY;

    return this.http.post( url, params ).pipe(
      map ( (resp: string) => {
        return this.crearArregloid(resp);
      }
      )
    );

  }

  crearArregloid( contribuObj: any) {

    const facturas: any[] = [];
    let resul: string;

    if ( contribuObj === null ) { return []; }
    console.log(contribuObj);
    // tslint:disable-next-line: forin

    resul = contribuObj.data.attributes.id;

  //  console.log( usuarios[0][prop].attributes );


    console.log(resul);

    return resul;
  }

  patchFacturas( idf, spid ) {

    const params = {
      token: this.token,
      secret_key: SECRET_KEY,
      status: 'EJECUTADA',
      supplier_payment_id: spid
    };

    console.log(params);

    const url = `${URL_SERVICIOS}/invoices/${idf}`;

    return this.http.patch( url, params ).pipe(
      map( (resp: any) => { return resp;
      } ));
  }

  patchFacturascadena( idf, spid ) {

    const params = {
      token: this.token,
      secret_key: SECRET_KEY,
      status: 'LIQUIDADA',
      company_payment_id: spid
    };

    console.log(params);

    const url = `${URL_SERVICIOS}/invoices/${idf}`;

    return this.http.patch( url, params ).pipe(
      map( (resp: any) => { return resp;
      } ));
  }

}
