import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContribuyentesService } from '../../services/service.index';
import { Privilegio, Usuario2 } from '../../models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Key } from 'readline';

declare function init_plugins();

@Component({
  selector: 'app-actualizaproveedor',
  templateUrl: './actualizaproveedor.component.html',
  styles: []
})
export class ActualizaProveedorComponent implements OnInit {

  forma: FormGroup;
  idl: string;
  cadena: any[] = [];

  constructor(
    private route: ActivatedRoute,
    public _contribuyentesService: ContribuyentesService,
    public router: Router
  ) { }


  ngOnInit() {

      this.idl = this.route.snapshot.paramMap.get('id');
      console.log(this.idl);

      this.forma = new FormGroup({
        Key: new FormControl( null , Validators.required )
      } );

      this._contribuyentesService.getProveedorxContribuyente( this.idl ).subscribe( resp => { this.cadena = resp; console.log(this.cadena) } );

  }


  actualizaCadena() {

    const params = {
    token: '',
    secret_key: '',
    business_name: (document.getElementById('business_name') as HTMLInputElement).value,
    sector: (document.getElementById('sector') as HTMLInputElement).value,
    subsector:  (document.getElementById('subsector') as HTMLInputElement).value,
    document:    (document.getElementById('document') as HTMLInputElement).value,
    credit_available:       (document.getElementById('credit_available') as HTMLInputElement).value,
    balance:   (document.getElementById('balance') as HTMLInputElement).value
  };
    console.log(this.idl);
    console.log(this.cadena[0].id);
    console.log(params);

    this._contribuyentesService.actualizaProveedorxContributente( this.idl, this.cadena[0].id , params).subscribe( () => {this.router.navigate(['/altacyp']),
    Swal.fire(
      'Modificacion de Proveedor',
      'Exitosa',
      'success'
   ); }, (err) => {
                            Swal.fire(
                              'Error al modificar Proveedor',
                              'Error',
                              'error'
                           );
                        } );

  } 


}
