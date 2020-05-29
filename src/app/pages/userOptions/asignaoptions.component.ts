import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { UserOptionsService, UsuarioService } from '../../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
declare var $;

@Component({
  selector: 'app-asignaoptions',
  templateUrl: './asignaoptions.component.html',
  styles: []
})
export class AsignaOptionsComponent implements OnInit, OnDestroy {

  optionsfiltradas: any[] = [];
  options: any[] = [];
  datosTabla: Observable<any[]> = new Observable();
  sourceCars: any[];
  usuarioOptions: any[] = [];
  cols: any[];
  selectedColumns: any[];
  seleccion: any[];
  colso: any[];
  resul: any[] = [];
  agregar = false;
  seleccionOptions: any[] = [];
  idu: string;
  nombreUsuaOp: string;
  subscription: Subscription;

  constructor( public _optionsservice: UserOptionsService,
               public _usuariosservice: UsuarioService,
               public router: Router,
               public http: HttpClient,
               private route: ActivatedRoute ) {

                }
                
  ngOnInit() {

    this.usuarioOptions = [];
    this.options = [];
    this.seleccionOptions = [];

    this.idu = this.route.snapshot.paramMap.get('id');

    this.nombreUsuaOp = localStorage.getItem('usuarioOpcion');

  /* this.subscription = this._optionsservice.getOptions()
    .subscribe( resp => { this.options = resp;
                          this._usuariosservice.getUsuarioOptions(this.idu)
                          .subscribe( resp2 => {this.usuarioOptions = resp2;
                                                if (this.usuarioOptions.length === 0) {
                                                  this.seleccionOptions = this.options;
                                                } else {
                                                // tslint:disable-next-line: forin
                                                for (const i in this.options) {
                                                  // tslint:disable-next-line: forin
                                                for (const j in this.usuarioOptions) {

                                                    console.log(i + ' ' + this.options[i].id);
                                                    console.log(j + ' ' + this.usuarioOptions[j].option_id);
                                                    console.log('separador');

                                                  if ( parseInt(this.options[i].id, 10) === parseInt(this.usuarioOptions[j].option_id, 10) ) {                              
                                                    this.agregar = false;
                                                    break;
                                                  } else {                                      
                                                    this.agregar = true;
                                                    
                                                    
                                                  }
                                                                                     }
                                                if (this.agregar) {
                                                  this.seleccionOptions.push(this.options[i]);
                                                  this.agregar = false;
                                                }
                                                                                }
                                                        }
                                                      //  console.log(this.usuarioOptions);
                                    });
                                    
                          } ); */

                       
    this._optionsservice.getOptions().subscribe( resp => { this.options = resp; } );
    this._usuariosservice.getUsuarioOptions(this.idu).subscribe(resp => {this.usuarioOptions = resp; } );

    this.cols = [

      { field: 'id', header: 'Opciones Disponibles' }
  ];

    this.colso = [

    { field: 'option_id', header: 'Opciones Asignadas al Usuario' }
];

  }

  ngOnDestroy() {

  }

  regreso() {
    this._optionsservice.getOptions().subscribe( resp => { this.options = resp; return this} );
  }

  agregaOption( ido: string ) {
    this._optionsservice.agregaOption( this.idu, ido ).subscribe();
    setTimeout(() => {
      this.refresh();
    }, 2000);
    

  }

  quitarOption( idq: string ) {
    this._optionsservice.quitarOption(idq).subscribe();
    
    setTimeout(() => {
      this.refresh();
    }, 2000);

  }

  refresh() {
    
   // this.ngOnInit();   
   window.location.reload();
  }

}







