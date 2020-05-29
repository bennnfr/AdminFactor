import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { UserOptionsService, UsuarioService } from '../../services/service.index';
import { NavigationEnd, Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  optionsfiltradas: any[] = [];
  options: any[] = [];
  sourceCars: any[];
  usuarioOptions: any[] = [];
  cols: any[];
  selectedColumns: any[];
  seleccion: any[];
  colso: any[];
  resul: any[] = [];
  agregar = false;
  seleccionOptions: any[] = [];

  constructor( public _optionsservice: UserOptionsService,
               public _usuariosservice: UsuarioService,
               public router: Router ) {

                }



  ngOnInit() {


    this._optionsservice.getOptions()
    .subscribe( resp => { this.options = resp;
                          this._usuariosservice.getUsuarioOptions('2')
                          .subscribe( resp2 => {this.usuarioOptions = resp2;

                                                if (this.usuarioOptions.length === 0) {
                                                  this.seleccionOptions = this.options;
                                                } else {
                                                // tslint:disable-next-line: forin
                                                for (const i in this.options) {
                                                  // tslint:disable-next-line: forin
                                                for (const j in this.usuarioOptions) {
                                                  console.log(i);
                                                  console.log(j);
                                                 // console.log(parseInt(this.options[i].id, 10));
                                                 // console.log(parseInt(this.usuarioOptions[j].option_id, 10));
                                                  if ( parseInt(this.options[i].id, 10) === parseInt(this.usuarioOptions[j].option_id, 10) ) {
                                                  //  console.log('NO AGREGAR ' + this.options[i].id);
                                                    this.agregar = false;
                                                    break;

                                                  } else {
                                                  //  console.log('AGREGAR');
                                                    this.agregar = true;

                                                  }

                                                                                     }
                                                if (this.agregar) {
                                                 // this.options.splice(this.options[i], 1);
                                                  this.seleccionOptions.push(this.options[i]);
                                                  this.agregar = false;
                                                }
                                                                                  }
                                                                                }
                                               // console.log(this.seleccionOptions);
console.log(this.usuarioOptions);
                                                } );
    } );
  //  this._optionsservice.getOptions().subscribe( resp => { this.options = resp; } );
  //  this._usuariosservice.getUsuarioOptions('2').subscribe(resp => {this.usuarioOptions = resp; } );

    this.cols = [

      { field: 'id', header: 'Opciones Disponibles' }
  ];

    this.colso = [

    { field: 'option_id', header: 'Opciones Asignadas al Usuario' }
];

  }

  agregaOption( ido: string ) {
    this._optionsservice.agregaOption( '2', ido ).subscribe( );

  }

  quitarOption( idq: string ) {
    this._optionsservice.quitarOption(idq).subscribe();

  }

}







