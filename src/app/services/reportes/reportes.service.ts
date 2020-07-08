import { Injectable } from '@angular/core';
import { Usuario, Usuario2 } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, SECRET_KEY } from '../../config/config';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable()
export class ReportesService {

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

  getReporteFacturas() {

  const url = `${URL_SERVICIOS}/reports/general_report_invoices?token=${this.token}&secret_key=${SECRET_KEY}`;

  return this.http.get(url).pipe(
    map( (resp: any) => {
      return resp;
    } )
  );

  }

  getReporteDaily( date ) {

    const url = `${URL_SERVICIOS}/reports/used_date/${date}/daily_operations?token=${this.token}&secret_key=${SECRET_KEY}`;

    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp;
      } )
    );

  }

  getBanorte( date ) {

    const url = `${URL_SERVICIOS}/reports/used_date/${date}/layout_banorte?token=${this.token}&secret_key=${SECRET_KEY}`;

    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp;
      } )
    );

  }

  getCompanyPayments( date, idc ) {

    const url = `${URL_SERVICIOS}/reports/report_date/${date}/company_id/${idc}/company_payments?token=${this.token}&secret_key=${SECRET_KEY}`;

    return this.http.get( url ).pipe(
      map ( (resp: any) => {
        return resp;
      }
      )
    );

  }

  getCompapanyes() {

    const url = `${URL_SERVICIOS}/reports/payment_companies?token=${this.token}&secret_key=${SECRET_KEY}`;

    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp;
      } )
    );

  }

}
