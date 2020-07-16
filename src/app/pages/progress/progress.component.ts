import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { UserOptionsService, UsuarioService } from '../../services/service.index';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $;

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  xml() {

    const XmlReader = require('xml-reader');
    const reader = XmlReader.create();

    const xml =
        `<?xml version="1.0" encoding="UTF-8" standalone="no"?><cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/3" xmlns:nomina12="http://www.sat.gob.mx/nomina12" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Certificado="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" Descuento="1105.08" Fecha="2020-06-19T09:40:22" Folio="000137080003300001" FormaPago="99" LugarExpedicion="31125" MetodoPago="PUE" Moneda="MXN" NoCertificado="00001000000404398933" Sello="KlBHmfvuse6PAcYRDX+tYu0lFOnpx5gKEbsyoK9osywFjM+23yFCxQd3W6n4GyIR97RGWl8gnboVDOWuRPj0G4W5qTshEQpFhWqZ4eCiSE2tZyrv+/eFEmfz2s/6tIslCkJJXpjc6gDv81M5eznw1hTFgEWABCgq9GYwQ8zW1VKiH5ZKZRPElMIEz5Ib58eqF/A2r6S8j7TzgPDnZjp2PN4EQJH0GNd4x1MVwh7/r/jiGei+MKg+q1q8XrPSLfjRLgadz5Rtrn0BOCYAMuDH5LnVXvkecd7Lf0AAFGE0CDkEh4ykOt06EYMkM5+Z/0X+1fxhgugxY/S7Z0EZAgoocQ==" SubTotal="5880.00" TipoDeComprobante="N" Total="4774.92" Version="3.3" xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd http://www.sat.gob.mx/nomina12 http://www.sat.gob.mx/sitio_internet/cfd/nomina/nomina12.xsd"><cfdi:Emisor Nombre="SERMEK, S.C." RegimenFiscal="601" Rfc="SER011219787"/><cfdi:Receptor Nombre="FLORES RODRIGUEZ BENJAMIN" Rfc="FORB860210TQ5" UsoCFDI="P01"/><cfdi:Conceptos><cfdi:Concepto Cantidad="1" ClaveProdServ="84111505" ClaveUnidad="ACT" Descripcion="Pago de nómina" Descuento="1105.08" Importe="5880.00" ValorUnitario="5880.00"/></cfdi:Conceptos><cfdi:Complemento><tfd:TimbreFiscalDigital xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" FechaTimbrado="2020-06-19T11:14:39" NoCertificadoSAT="00001000000407908743" RfcProvCertif="CFA110411FW5" SelloCFD="KlBHmfvuse6PAcYRDX+tYu0lFOnpx5gKEbsyoK9osywFjM+23yFCxQd3W6n4GyIR97RGWl8gnboVDOWuRPj0G4W5qTshEQpFhWqZ4eCiSE2tZyrv+/eFEmfz2s/6tIslCkJJXpjc6gDv81M5eznw1hTFgEWABCgq9GYwQ8zW1VKiH5ZKZRPElMIEz5Ib58eqF/A2r6S8j7TzgPDnZjp2PN4EQJH0GNd4x1MVwh7/r/jiGei+MKg+q1q8XrPSLfjRLgadz5Rtrn0BOCYAMuDH5LnVXvkecd7Lf0AAFGE0CDkEh4ykOt06EYMkM5+Z/0X+1fxhgugxY/S7Z0EZAgoocQ==" SelloSAT="wSBPzzDxSwwSIceNEeaa/z1QwMeQSQrSRbsTi2KkdCNqsy3nTebRMhbsMGSfrg09uLwhIgSJ/hociTeo/ZFXCN6MlczWMrDuOglukr+Wwmnvn6Kt3osjvt1MR+dukoTyCLohepdTVm0TnKIzvzQ6bXdEriRgUIx/koImgsFI9qd7dzN79AYULnr8DFx+ba3inOeueb7GwGmAElFAR7QDjgvJQvh3M5a0BxobTX/KCyRnMTE+DrUC3MjUSNmMUq3mi5u4Wqj9ChGl5IO86tdPeCHbrF3XcGIg4c9nT8Kz96Rr7k+IU5aWSzb8cEO8XMkCOzCYIHbzj1K81/6oSnGWgA==" UUID="31795957-f01d-466e-a5bb-038d1deaa902" Version="1.1" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/timbrefiscaldigital/TimbreFiscalDigitalv11.xsd"/><nomina12:Nomina FechaFinalPago="2020-06-14" FechaInicialPago="2020-06-08" FechaPago="2020-06-18" NumDiasPagados="7.000" TipoNomina="O" TotalDeducciones="1105.08" TotalPercepciones="5880.00" Version="1.2"><nomina12:Emisor RegistroPatronal="A8061933108"/><nomina12:Receptor Antigüedad="P31W" Banco="072" ClaveEntFed="CHH" CuentaBancaria="1089497923" Curp="FORB860210HCHLDN02" FechaInicioRelLaboral="2019-11-05" NumEmpleado="13708" NumSeguridadSocial="33098612741" PeriodicidadPago="02" Puesto="10 INGENIERO DESARROLLADOR TI" RiesgoPuesto="1" SalarioBaseCotApor="760.41" SalarioDiarioIntegrado="700.00" TipoContrato="03" TipoJornada="99" TipoRegimen="02"/><nomina12:Percepciones TotalExento="0.00" TotalGravado="5880.00" TotalSueldos="5880.00"><nomina12:Percepcion Clave="1010" Concepto="Salario semanal" ImporteExento="0.00" ImporteGravado="4900.00" TipoPercepcion="001"/><nomina12:Percepcion Clave="1240" Concepto="Bono Puntualidad" ImporteExento="0.00" ImporteGravado="490.00" TipoPercepcion="010"/><nomina12:Percepcion Clave="1248" Concepto="Bono Asistencia" ImporteExento="0.00" ImporteGravado="490.00" TipoPercepcion="038"/></nomina12:Percepciones><nomina12:Deducciones TotalImpuestosRetenidos="964.67" TotalOtrasDeducciones="140.41"><nomina12:Deduccion Clave="_391" Concepto="Aportación trabaj  IMSS" Importe="140.41" TipoDeduccion="001"/><nomina12:Deduccion Clave="_491" Concepto="Total de impuestos" Importe="964.67" TipoDeduccion="002"/></nomina12:Deducciones><nomina12:OtrosPagos><nomina12:OtroPago Clave="_481" Concepto="Subsidio al empleo efvo" Importe="0.00" TipoOtroPago="002"><nomina12:SubsidioAlEmpleo SubsidioCausado="0.00"/></nomina12:OtroPago></nomina12:OtrosPagos></nomina12:Nomina></cfdi:Complemento><cfdi:Addenda>
<sap:SAPAddenda xmlns:sap="http://www.sap.com.mx/cfdi/addenda" cancelacion="0" e-mail="BFLORES@FACTORGFC.COM" status="0"/>
</cfdi:Addenda></cfdi:Comprobante>`;

    reader.on('done', data => console.log(data));
    reader.parse(xml);
    console.log(reader.parse(xml));

  }

}







