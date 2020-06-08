import { Injectable } from '@angular/core';
import { Usuario, Usuario2, Usuario3 } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, SECRET_KEY } from '../../config/config';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable()
export class RolesOptionsService {

  usuario: Usuario;
  token: string;
  usuario2: Usuario2;
  idUsuario: string;

  constructor(
    public http: HttpClient,
    public router: Router,
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

  getRolesOptions( id: string ) {

    const url = `${URL_SERVICIOS}/roles/${id}?token=${this.token}&secret_key=${SECRET_KEY}`;

    return this.http.get( url ).pipe(
    map( (resp: any) => {return this.crearArregloRolesOptions(resp);
    }));

    }
  crearArregloRolesOptions( optionsObj: any) {

    const roles: any[] = [];
    const resul: any[] = [];

    if ( optionsObj === null ) { return []; }
    Object.keys ( optionsObj ).forEach( key => {
      const rol: any = optionsObj[key];
      roles.push( rol );
    });
    console.log(roles[0].relations.role_options);
    // tslint:disable-next-line: forin
    for (const prop in roles[0].relations.role_options) {
   // console.log( roles[0].relations.role_options[prop].attributes );
    resul.push( roles[0].relations.role_options[prop].attributes );
    }
    console.log(resul);

    return resul;


}

  agregaRol( idu: string, ido: string ) {

    const url = `${URL_SERVICIOS}/role_options?role_id=${idu}&option_id=${ido}&token=${this.token}&secret_key=${SECRET_KEY}`;

    return this.http.post(url, null).pipe(
      map( (resp: any) => resp )
    );

  }

  quitarRol( idq: string ) {

    const url = `${URL_SERVICIOS}/role_options/${idq}?token=${this.token}&secret_key=${SECRET_KEY}`;

    return this.http.delete(url).pipe(
      map( (resp: any) => resp )
    );
  }

}
