import { Injectable } from '@angular/core';
import { Usuario, Usuario2, Usuario3, UserOptions } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, SECRET_KEY } from '../../config/config';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Perfisica, PerMoral, ContribuyenteFisica, ContribuyenteMoral, DocumentoPropiedad } from '../../models/personas.model';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable()
export class ContribuyentesService {

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


  crearPersonaFisica( perfisica: Perfisica ) {

    const url = `${URL_SERVICIOS}/people?person[fiscal_regime]=${perfisica.rfiscalfisica}&person[rfc]=${perfisica.rfcfisica}&person[curp]=${perfisica.CURP}
                &person[imss]=${perfisica.IMSS}&person[first_name]=${perfisica.nombrefisica}&person[last_name]=${perfisica.apellidop}
                &person[second_last_name]=${perfisica.apellidom}&person[gender]=${perfisica.genero}&person[nationality]=${perfisica.nacionalidad}
                &person[birth_country]=${perfisica.pnacimiento}&person[birthplace]=${perfisica.lnacimiento}&person[birthdate]=${perfisica.fnacimiento}
                &person[martial_status]=${perfisica.estadocivil}&person[id_type]=${perfisica.tidentificacion}&person[identification]=${perfisica.nidentificacion}
                &person[phone]=${perfisica.telfijofisica}&person[mobile]=${perfisica.telmovilfisica}&person[email]=${perfisica.correofisica}
                &person[fiel]=${perfisica.FIELfisica}&token=${this.token}&secret_key=${SECRET_KEY}`;


    return this.http.post( url, null ).pipe(
              map( (resp: any) => {
                return this.crearArregloPersonaFisica(resp);
              }));
  }

  crearArregloPersonaFisica( usuariosObj: any) {

    const usuarios: any[] = [];
    const resul: any[] = [];

    if ( usuariosObj === null ) { return []; }
    Object.keys ( usuariosObj ).forEach( key => {
      const usuario: any = usuariosObj[key];
      usuarios.push( usuario );
    });
    // tslint:disable-next-line: forin
    console.log(usuarios);
  //  console.log( usuarios[0][prop].attributes );
    resul.push( usuarios[0].attributes );
    console.log(resul);

    return resul;

}

  crearContribuyenteFisica( contribuyentefisica: ContribuyenteFisica, idf: any ) {

    const url = `${URL_SERVICIOS}/contributors?contributor[contributor_type]=${contribuyentefisica.tipo}&contributor[bank]=${contribuyentefisica.banco}
                &contributor[account_number]=${contribuyentefisica.ncuentafisica}&contributor[clabe]=${contribuyentefisica.clabefisica}
                &contributor[extra1]=${contribuyentefisica.cbfisica}&contributor[person_id]=${idf}&token=${this.token}&secret_key=${SECRET_KEY}`;


    return this.http.post( url, null ).pipe(
              map( (resp: any) => {
                return resp.data.attributes.id;
              }));
  }

  crearPersonaMoral( perMoral: PerMoral ) {

    const url = `${URL_SERVICIOS}/legal_entities/?legal_entity[fiscal_regime]=${perMoral.rfiscalmoral}&legal_entity[rfc]=${perMoral.rfcmoral}
                &legal_entity[rug]=${perMoral.rug}&legal_entity[business_name]=${perMoral.nombremoral}&legal_entity[phone]=${perMoral.telfijomoral}
                &legal_entity[mobile]=${perMoral.telmovilmoral}&legal_entity[email]=${perMoral.correomoral}&legal_entity[business_email]=${perMoral.correoempresamoral}
                &legal_entity[fiel]=${perMoral.FIELmoral}&token=${this.token}&secret_key=${SECRET_KEY}`;


    return this.http.post( url, null ).pipe(
              map( (resp: any) => {
                return this.crearArregloPersonaMoral(resp);
              }));
  }

  crearArregloPersonaMoral( usuariosObj: any) {

    const usuarios: any[] = [];
    const resul: any[] = [];

    if ( usuariosObj === null ) { return []; }
    Object.keys ( usuariosObj ).forEach( key => {
      const usuario: any = usuariosObj[key];
      usuarios.push( usuario );
    });
    // tslint:disable-next-line: forin
    console.log(usuarios);
  //  console.log( usuarios[0][prop].attributes );
    resul.push( usuarios[0].attributes );
    console.log(resul);

    return resul;

}

crearContribuyenteMoral( contribuyentemoral: ContribuyenteMoral, idm: any ) {

  const url = `${URL_SERVICIOS}/contributors?contributor[contributor_type]=${contribuyentemoral.tipo}&contributor[bank]=${contribuyentemoral.banco}
              &contributor[account_number]=${contribuyentemoral.ncuentamoral}&contributor[clabe]=${contribuyentemoral.clabemoral}
              &contributor[extra1]=${contribuyentemoral.cbmoral}&contributor[legal_entity_id]=${idm}&token=${this.token}&secret_key=${SECRET_KEY}`;


  return this.http.post( url, null ).pipe(
            map( (resp: any) => {
              return resp.data.attributes.id;
            }));
}

getContribuyentes() {

  const url = `${URL_SERVICIOS}/contributors?token=${this.token}&secret_key=${SECRET_KEY}`;

  return this.http.get(url).pipe(
    map( (resp: any) => {
      return this.crearArregloContribuyente(resp);
    } )
  );

}

crearArregloContribuyente( contribuObj: any) {

  const contribuyentes: any[] = [];
  const resul: any[] = [];
  console.log(contribuObj.data);
  if ( contribuObj === null ) { return []; }
 /* Object.keys ( contribuObj ).forEach( key => {
    const rol: any = contribuObj[key];
    contribuyentes.push( rol );
  }); */
  console.log(contribuyentes[0]);
  // tslint:disable-next-line: forin
  for (const prop in contribuObj.data) {
  console.log(contribuObj.data[prop].attributes);
  resul.push( contribuObj.data[prop].attributes );
  }

  console.log(resul);

  return resul;

}

getPersonaFisica( idf: string ) {

  const url = `${URL_SERVICIOS}/people/${idf}?token=${this.token}&secret_key=${SECRET_KEY}`;

  return this.http.get(url).pipe(
    map( (resp: any) => {
      return this.crearArreglopf(resp);
    } )
  );

}

crearArreglopf( contribuObj: any) {

  const contribuyentes: any[] = [];
  const resul: any[] = [];

  if ( contribuObj === null ) { return []; }
  Object.keys ( contribuObj ).forEach( key => {
    const rol: any = contribuObj[key];
    contribuyentes.push( rol );
  });
  // tslint:disable-next-line: forin

//  console.log( usuarios[0][prop].attributes );
  resul.push( contribuyentes[0].attributes );


 // console.log(resul);

  return resul;

}

crearDP( dp: DocumentoPropiedad ) {
const url = `${URL_SERVICIOS}/contributors/${dp.idcontribuyente}/property_documents?property_document[document_type]=${dp.tescritura}
             &property_document[description]=${dp.descritura}&property_document[pd_number]=${dp.nescritura}&property_document[pd_book]=${dp.lescritura}
             &property_document[pd_date]=${dp.fescritura}&property_document[rug]=${dp.rug}&property_document[document]=${dp.aescritura}
             &token=${this.token}&secret_key=${SECRET_KEY}`;

return this.http.post( url, null ).pipe(
              map( (resp: any) => {
                return resp;
              }));
}

// LISTAS

getFiscalRegime() {

  const url = `${URL_SERVICIOS}/lists/domain/PERSON_FISCAL_REGIME?token=${this.token}&secret_key=${SECRET_KEY}`;

  return this.http.get(url).pipe(
    map( (resp: any) => {
      return this.crearArregloList(resp);
    } )
  );

}

getPersonGender() {

  const url = `${URL_SERVICIOS}/lists/domain/PERSON_GENDER?token=${this.token}&secret_key=${SECRET_KEY};`;

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

getContribuyentesMain() {

  const url = `${URL_SERVICIOS}/reports/contributors_main?token=${this.token}&secret_key=${SECRET_KEY}`;

  return this.http.get(url).pipe(
    map( (resp: any) => {
      return resp;
    } )
  );

}


}
