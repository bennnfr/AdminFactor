import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { UserOptionsService, UsuarioService, ContribuyentesService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Perfisica, PerMoral, ContribuyenteFisica, ContribuyenteMoral, DocumentoPropiedad } from '../../models/personas.model';
import { Subscription, Observable } from 'rxjs';
import swal2 from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-altacontribuyentes',
  templateUrl: './altacontribuyentes.component.html',
  styles: []
})
export class AltacontribuyentesComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  fisica = false;
  moral = false;
  correoFisica = false;
  correoMoral = false;
  correoMoralEmpresa = false;
  RFCFisica = false;
  RFCMoral = false;
  CURP = false;
  /************* */
  btncontribuyente = false;
  /****************** */
  noaguardado = true;
  seleccionfom = false;
  capturanuevofisica = true;
  capturanuevomoral = true;

  subscription: Subscription;

  resppersonafisica: any[];
  resppersonamoral: any[];
  respcontribmoral: string;

  idcontr = '';
  iddp = '';

  tpersona: any[] = [];
  tgenero: any[] = [];

  estados: any[] = [];
  municipios: any[] = [];
  addresstype: any[] = [];
  suburbtype: any[] = [];
  suburb: any[] = [];
  contribuyenteslist: any[] = [];
  idestado = '';
  ide = '';
  idm = '';

  constructor(private _formBuilder: FormBuilder,
              public router: Router,
              public _contribuyentesservice: ContribuyentesService) {}

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this._contribuyentesservice.getFiscalRegime().subscribe( resp => {this.tpersona = resp; } );

    this._contribuyentesservice.getPersonGender().subscribe( resp => this.tgenero = resp );


    this._contribuyentesservice.getStates().subscribe( resp => { this.estados = resp; } );
    this._contribuyentesservice.getAdresstype().subscribe( resp => { this.addresstype = resp; } );
    this._contribuyentesservice.getAsentamientotype().subscribe( resp => { this.suburbtype = resp; } );

   // this._contribuyentesservice.getContribuyentesMain().subscribe( resp => {this.contribuyenteslist = resp; console.log(this.contribuyenteslist)} );

  }

  LimpiarFisica() {

    (document.getElementById('rfiscalfisica') as HTMLInputElement).value = '';

  }

  capturarnuevo() {
    window.location.reload();
  }

  render() {

    // Obtener el elemento por el id
    const persona: any = document.getElementById('tipopersona');

    // Obtener el valor de la opción seleccionada
    const valorPersona = persona.options[persona.selectedIndex].value;

    if (valorPersona === 'PERSONA FÍSICA') {
    this.fisica = true;
    this.moral = false;
    } else if (valorPersona === 'PERSONA MORAL') {
      this.fisica = false;
      this.moral = true;
    } else {
      this.fisica = false;
      this.moral = false;
    }
  }

  // Funcion para validar la CURP
  validaCurp() {
  const regex = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;

  const curp = (document.getElementById('CURP') as HTMLInputElement).value;
  const resultado = regex.test(curp);

  if ( curp.length > 0 ) {
    if ( resultado === false ) {
      document.getElementById('CURP').focus();
      this.CURP = true;
    } else {
      this.CURP = false;
    }
    } else {
      this.CURP = false;
    }

  }

  // Funcion para validar el correo electronico persona fisica
  validaEmail() {
  const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const correoFisica = (document.getElementById('correofisica') as HTMLInputElement).value;
  const resultado = regex.test(correoFisica);

  if ( correoFisica.length > 0 ) {
  if ( resultado === false ) {
    document.getElementById('correofisica').focus();
    this.correoFisica = true;
  } else {
    this.correoFisica = false;
  }
  } else {
    this.correoFisica = false;
  }

  }

  // Funcion para validar el correo electronico persona moral
  validaEmailmoral() {
    const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const correoMoral = (document.getElementById('correomoral') as HTMLInputElement).value;
    const resultado = regex.test(correoMoral);

    if ( correoMoral.length > 0 ) {
    if ( resultado === false ) {
      document.getElementById('correomoral').focus();
      this.correoMoral = true;
    } else {
      this.correoMoral = false;
    }
    } else {
      this.correoMoral = false;
    }

    }

    // Funcion para validar el correo electronico persona moral empresa
  validaEmailmoralEmpresa() {
    const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const correoMoral = (document.getElementById('correomoralempresa') as HTMLInputElement).value;
    const resultado = regex.test(correoMoral);

    if ( correoMoral.length > 0 ) {
    if ( resultado === false ) {
      document.getElementById('correomoralempresa').focus();
      this.correoMoralEmpresa = true;
    } else {
      this.correoMoralEmpresa = false;
    }
    } else {
      this.correoMoralEmpresa = false;
    }

    }

  // Funcion para validar el RFC, recibe fisica o moral dependiendo de la persona
  validaRFC(persona: string) {


    if (persona === 'fisica') {
      const regex = /^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}/;
      const RFCFisica = (document.getElementById('rfcFisica') as HTMLInputElement).value;
      const resultado = regex.test(RFCFisica);

      if (RFCFisica.length > 0) {
        if ( resultado === false ) {
          document.getElementById('rfcFisica').focus();
          this.RFCFisica = true;
        } else {
          this.RFCFisica = false;
        }
    } else {
      this.RFCFisica = false;
    }
    }

    if (persona === 'moral') {
      const regex = /^[A-Z]{3}[0-9]{6}[A-Z0-9]{3}/;
      const RFCMoral = (document.getElementById('rfcmoral') as HTMLInputElement).value;
      const resultado = regex.test(RFCMoral);

      if (RFCMoral.length > 0) {
        if ( resultado === false ) {
          document.getElementById('rfcmoral').focus();
          this.RFCMoral = true;
        } else {
          this.RFCMoral = false;
        }
    } else {
      this.RFCMoral = false;
    }
    }

  }

  registrarcontribuyentefisica() {

    // Obtener el elemento por el id
    const fielfisica: any = document.getElementById('fielfisica');
    const generofisica: any = document.getElementById('generofisica');

    // Obtener el valor de la opción seleccionada
    let valorfielfisica = fielfisica.options[fielfisica.selectedIndex].value;
    const valorgenerofisica = generofisica.options[generofisica.selectedIndex].value;

    if (valorfielfisica === 'SI') {
      valorfielfisica = true;
    } else if (valorfielfisica === 'NO') {
      valorfielfisica = false;
    } else {
      valorfielfisica = '';
    }

    const d = new Date((document.getElementById('fnacimiento')as HTMLInputElement).value);
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

    const fechanac = [year, month, day].join('-');

    const personafisica = new Perfisica(
     // document.getElementById('rfiscalfisica').value,
     (document.getElementById('rfiscalfisica') as HTMLInputElement).value,
     (document.getElementById('rfcFisica')as HTMLInputElement).value,
     (document.getElementById('nombrefisica')as HTMLInputElement).value,
     (document.getElementById('apellidop')as HTMLInputElement).value,
     (document.getElementById('apellidom')as HTMLInputElement).value,
     fechanac,
     (document.getElementById('nidentificacion')as HTMLInputElement).value,
     (document.getElementById('correofisica')as HTMLInputElement).value,
     (document.getElementById('CURP')as HTMLInputElement).value,
     (document.getElementById('IMSS')as HTMLInputElement).value,
     valorgenerofisica,
     (document.getElementById('nacionalidad')as HTMLInputElement).value,
     (document.getElementById('pnacimiento')as HTMLInputElement).value,
     (document.getElementById('lnacimiento')as HTMLInputElement).value,
     (document.getElementById('estadocivil')as HTMLInputElement).value,
     (document.getElementById('tidentificacion')as HTMLInputElement).value,
     (document.getElementById('telfijofisica')as HTMLInputElement).value,
     (document.getElementById('telmovilfisica')as HTMLInputElement).value,
     valorfielfisica,

    );

    const contribuyentefisica = new ContribuyenteFisica(

      'PERSONA FISICA',
      (document.getElementById('bancofisica') as HTMLInputElement).value,
      (document.getElementById('cuentabancariafisica')as HTMLInputElement).value,
      (document.getElementById('CLABEfisica')as HTMLInputElement).value,
      (document.getElementById('clavelineafisica')as HTMLInputElement).value,
    );

    this.subscription = this._contribuyentesservice.crearPersonaFisica( personafisica ).subscribe( resp => { this.resppersonafisica = resp; console.log(this.resppersonafisica[0].id);

                                                                                                             this._contribuyentesservice.crearContribuyenteFisica( contribuyentefisica, this.resppersonafisica[0].id )
                                                                                                             .subscribe( respm => {this.respcontribmoral = respm; console.log(this.respcontribmoral); this.idcontr = this.respcontribmoral; } );

                                                                                                             swal2.fire(
                                                                                                              'El contribuyente se guardo con exito',
                                                                                                              '',
                                                                                                              'success'
                                                                                                           );
                                                                                                             window.location.reload();
    } );

  }

  registrarcontribuyentemoral() {

   // if (this.noaguardado) {
    // Obtener el elemento por el id
    const fielmoral: any = document.getElementById('fielmoral');


    // Obtener el valor de la opción seleccionada
    let valorfielmoral = fielmoral.options[fielmoral.selectedIndex].value;

    if (valorfielmoral === 'SI') {
      valorfielmoral = true;
    } else if (valorfielmoral === 'NO') {
      valorfielmoral = false;
    } else {
      valorfielmoral = '';
    }

    const personamoral = new PerMoral (
     (document.getElementById('rfiscalmoral')as HTMLInputElement).value,
     (document.getElementById('rfcmoral')as HTMLInputElement).value,
     (document.getElementById('nombremoral')as HTMLInputElement).value,
     (document.getElementById('rug')as HTMLInputElement).value,
     (document.getElementById('telfijomoral')as HTMLInputElement).value,
     (document.getElementById('telmovilmoral')as HTMLInputElement).value,
     (document.getElementById('correomoral')as HTMLInputElement).value,
     (document.getElementById('correomoralempresa')as HTMLInputElement).value,
     (document.getElementById('actividadprincipal')as HTMLInputElement).value,
     valorfielmoral,
    );

    console.log(personamoral);

    const contribuyentemoral = new ContribuyenteMoral(

      'PERSONA MORAL',
      (document.getElementById('bancomoral') as HTMLInputElement).value,
      (document.getElementById('cuentabancariamoral')as HTMLInputElement).value,
      (document.getElementById('CLABEmoral')as HTMLInputElement).value,
      (document.getElementById('clavelineamoral')as HTMLInputElement).value,
    );
    console.log(document.getElementById('btnguardamoral') as HTMLInputElement);

  /*  if ( document.getElementById('btnguardamoral').click ) {
      console.log('hola');
      this.noaguardado = false;
      this.btncontribuyente = false;
      this.seleccionfom = true;
      this.capturanuevomoral = false;
    } */

    this._contribuyentesservice.crearPersonaMoral(personamoral).subscribe( resp => {this.resppersonamoral = resp; console.log(this.resppersonamoral);
                                                                                    this._contribuyentesservice.crearContribuyenteMoral( contribuyentemoral, this.resppersonamoral[0].id )
                                                                                    .subscribe( respm => {this.respcontribmoral = respm; console.log(this.respcontribmoral); this.idcontr = this.respcontribmoral;} );
                                                                                    swal2.fire(
                                                                                      'El contribuyente se guardo con exito',
                                                                                      '',
                                                                                      'success'
                                                                                   );
                                                                                    window.location.reload();




    } );
/*  } else {
    swal2.fire(
      'Los Datos ya fueron guardados',
      '',
      'error'
   ); } */
  }

  /***************************************************************************************************************************************************/

  registrardp() {

    const d = new Date((document.getElementById('dppd_date')as HTMLInputElement).value);
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

    const fechaesc = [year, month, day].join('-');

    const params = {

    document_type: (document.getElementById('dpdocument_type')as HTMLInputElement).value,
    description: (document.getElementById('dpdescription')as HTMLInputElement).value,
    pd_number: (document.getElementById('dppd_number')as HTMLInputElement).value,
    pd_book: (document.getElementById('dppd_book')as HTMLInputElement).value,
    pd_date: fechaesc,
    rug: (document.getElementById('dprug')as HTMLInputElement).value,
    document: (document.getElementById('dpdocument')as HTMLInputElement).value,
    token: '',
    secret_key: ''

    };

    console.log(params);

    this._contribuyentesservice.crearDP(this.idcontr, params).subscribe( resp => { console.log(resp);
                                                                                   this.iddp = resp;
                                                                                   swal2.fire(
                                                                    'Los datos se guardaron con exito',
                                                                    '',
                                                                    'success'
                                                                     );
    }, (err) => {
      console.log(err);
      swal2.fire(
           'Error al guardar los datos',
           '',
           'error'
        );
     });
  }

  /***************************************************************************************************************************************************************************** */

  registraSignatory() {

    console.log(this.idcontr);
    console.log(this.iddp);

    const params = {
    token: '',
    secret_key: '',
    contributor_signatory_id: this.idcontr,
    property_document_id: this.iddp,
    partnership: (document.getElementById('fpartnership')as HTMLInputElement).value
  };

    console.log(params);

    this._contribuyentesservice.creaFirmantexContribuyente(this.idcontr, params).subscribe( resp => { console.log(resp);
                                                                                                      swal2.fire(
'Los datos se guardaron con exito',
'',
'success'
);
}, (err) => {
console.log(err);
swal2.fire(
'Error al guardar los datos',
'',
'error'
);
});

  }
  /**************************************************************************************************************************************** */

  filtramunicipios() {

    const estado: any = document.getElementById('estado');

    const valorestado = estado.options[estado.selectedIndex].value;

    for (const prop in this.estados) {
      if ( this.estados[prop].name === valorestado ) {
        this.idestado = this.estados[prop].id;
        break;
      }
    }

    this._contribuyentesservice.getMunicipios( this.idestado ).subscribe(resp => {this.municipios = resp; });

  }

  buscacp() {

    const cp = (document.getElementById('postal_code') as HTMLInputElement).value;

    this._contribuyentesservice.getColoniasxcp( cp ).subscribe( resp => { this.suburb = resp; } );

  }

  registrardireccion() {

    const estado: any = document.getElementById('estado');
    const municipio: any = document.getElementById('municipio');
    const adresstype: any = document.getElementById('adress_type');
    const suburbtype: any = document.getElementById('suburb_type');
    const suburbb: any = document.getElementById('suburb');

    const valorestado = estado.options[estado.selectedIndex].value;
    const valormunicipio = municipio.options[municipio.selectedIndex].value;
    const valoradresstype = adresstype.options[adresstype.selectedIndex].value;
    const valorsuburbtype = suburbtype.options[suburbtype.selectedIndex].value;
    const valorsuburb = suburbb.options[suburbb.selectedIndex].value;

    for (const prop in this.estados) {
      if ( this.estados[prop].name === valorestado ) {
        this.ide = this.estados[prop].id;
        break;
      }
    }

    for (const prop in this.municipios) {
      if ( this.municipios[prop].name === valormunicipio ) {
        this.idm = this.municipios[prop].id;
        break;
      }
    }

    const params = {

      token: '',
      secret_key: '',
      municipality_id: this.idm,
      state_id: this.ide,
      address_type: valoradresstype,
      street: (document.getElementById('street')as HTMLInputElement).value,
      external_number: (document.getElementById('external_number')as HTMLInputElement).value,
      apartment_number: (document.getElementById('apartment_number')as HTMLInputElement).value,
      suburb_type: valorsuburbtype,
      suburb: valorsuburb,
      postal_code: (document.getElementById('postal_code')as HTMLInputElement).value,
      address_reference: (document.getElementById('address_reference')as HTMLInputElement).value

    };

    console.log(params);

    this._contribuyentesservice.creaDireccionxContribuyente(this.idcontr, params).subscribe( resp => { console.log(resp);
                                                                                                       swal2.fire(
'Los datos se guardaron con exito',
'',
'success'
);
}, (err) => {
console.log(err);
swal2.fire(
'Error al guardar los datos',
'',
'error'
);
});

  }

}









