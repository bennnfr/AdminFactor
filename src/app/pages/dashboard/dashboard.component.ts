import { Component, OnInit } from '@angular/core';
import { UsuarioService, DashboardService } from '../../services/service.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  usuarios: string;
  data: any;
  data2: any;
  data3: any;
  options: any;
  options2: any;
  datos: any[] = [];
  nombrecadena: string;
  totalintereses = '0';
  posemana = '0';

  constructor(public _usuarioservice: UsuarioService,
              public _dashboardservice: DashboardService) {

   }

  ngOnInit() {

    this._dashboardservice.getDatos().subscribe( resp => { this.datos = resp; console.log(this.datos);

                                                           this.totalintereses = this.datos[0].total_intereses;

                                                           this.posemana = this.datos[0].promedio_operacion_semana;

                                                           this.nombrecadena = this.datos[0].cadena;

                                                           this.options = {
                                                            title: {
                                                                display: true,
                                                                text: 'Porcentaje Descuento: ' + this.datos[0].porcentaje_descuento + '%',
                                                                fontSize: 16
                                                            },
                                                            legend: {
                                                                position: 'bottom'
                                                            }
                                                        };
                                                           this.options2 = {
                                                            title: {
                                                                display: true,
                                                                text: 'Saldo: ' + '$' + this.datos[0].saldo,
                                                                fontSize: 16
                                                            },
                                                            legend: {
                                                                position: 'bottom'
                                                            }
                                                        };

                                                           this.data = {
                                                                        labels: ['Proveedores ' + this.datos[0].numero_proveedores, 'Afiliados ' + this.datos[0].afiliados],
                                                                        datasets: [
                                                                                    {
                                                                                    data: [this.datos[0].numero_proveedores, this.datos[0].afiliados],
                                                                                    backgroundColor: [
                                                                                    "#030720",
                                                                                    "#434750"
                                                                                    ],
                                                                                    hoverBackgroundColor: [
                                                                                    "#030720",
                                                                                    "#434750"
                                                                                    ]
                                                                                    }]
                                                                                    };

                                                           this.data2 = {
                                                                          labels: [''],
                                                                          datasets: [
                                                                                      {
                                                                                      label: 'Total Facturas ' + this.datos[0].total_facturas,
                                                                                      backgroundColor: '#030720',
                                                                                      borderColor: '#1E88E5',
                                                                                      data: [this.datos[0].total_facturas]
                                                                                      },
                                                                                      {
                                                                                      label: 'Facturas en Descuento ' + this.datos[0].total_facturas_en_descuento,
                                                                                      backgroundColor: '#434750',
                                                                                      borderColor: '#7CB342',
                                                                                      data: [this.datos[0].total_facturas_en_descuento]
                                                                                      }
                                                                                      ]
                                                                                      };
                                                           this.data3 = {
                                                                           labels: [''],
                                                                           datasets: [
                                                                                      {
                                                                                      label: 'Limite Credito ' + this.datos[0].limite_credito,
                                                                                      backgroundColor: '#030720',
                                                                                      borderColor: '#1E88E5',
                                                                                      data: [this.datos[0].limite_credito]
                                                                                      },
                                                                                      {
                                                                                      label: 'Credito Disponible ' + this.datos[0].credito_disponible,
                                                                                      backgroundColor: '#434750',
                                                                                      borderColor: '#7CB342',
                                                                                      data: [this.datos[0].credito_disponible]
                                                                                      }
                                                                                    ]
    };

} );

  }

}
