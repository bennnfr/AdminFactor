import { Component, OnInit } from '@angular/core';
import { ContribuyentesService } from '../../services/service.index';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal2 from 'sweetalert2';

@Component({
  selector: 'app-mantcontribuyentes',
  templateUrl: './mantcontribuyentes.component.html',
  styles: []
})
export class MantcontribuyentesComponent implements OnInit {

  constructor(
               public _contribuyentesService: ContribuyentesService,
               public http: HttpClient ) { }

  token = localStorage.getItem('token');
  parametros: any[] = [];
  cols: any[];
  selectedFac: any[];
  router: Router;
  personasfisicas: any[];

  ngOnInit() {

    this._contribuyentesService.getContribuyentes().subscribe( resp => { this.parametros = resp; console.log(this.parametros);

                                                                         for ( const prop in this.parametros ) {
                                                                           console.log(this.parametros[prop]);

                                                                         if (this.parametros[prop].person_id !== null) {

                                                                          this._contribuyentesService.getPersonaFisica(this.parametros[prop].person_id).subscribe( (resp2) => { this.personasfisicas = resp2; console.log(this.personasfisicas);
                                                                                                                                                                                this.parametros[prop].regimenfiscal = this.personasfisicas[0].fiscal_regime;
                                                                                                                                                                                this.parametros[prop].rfc = this.personasfisicas[0].rfc;
                                                                                                                                                                                this.parametros[prop].nombre = this.personasfisicas[0].first_name;
                                                                                                                                                                                this.parametros[prop].apellidop = this.personasfisicas[0].last_name;
                                                                                                                                                                                this.parametros[prop].apellidom = this.personasfisicas[0].second_last_name;
                                                                                                                                                                                this.parametros[prop].fnac = this.personasfisicas[0].birthdate;
                                                                                                                                                                                this.parametros[prop].nidenti = this.personasfisicas[0].identification;
                                                                          } );
                                                                          } else {
                                                                            this.parametros.splice(parseInt(prop, 10) , 1);
                                                                          }
                                                                        }
console.log(this.parametros);
                                                                        } );

    this.cols = [

      { field: 'nombre', header: 'Nombre' },
      { field: 'bank', header: 'Banco' },
      { field: 'account_number', header: 'Numero de Cuenta' },
      { field: 'clabe', header: 'CLABE' }

  ];

  }

 /* borraParametro( id: string ) {

    swal2.fire({
      title: 'Desea Eliminar el Parametro',
      text: 'Seleccionado',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false
    }). then ( resp => {
      if ( resp.value) {

        this._parametrosService.borrarParametro( id ).subscribe( () => {

          swal2.fire({
            title: 'El Parametro',
            text: 'fue eliminado con exito',
            icon: 'success',
            showConfirmButton: true,
            showCancelButton: false,
            allowOutsideClick: false
          }). then ( res => {

            if ( res.value ) {
              this.ngOnInit();
            }

          } );

        } );

      }
    });

  } */

}
