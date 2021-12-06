import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApibomberoService } from 'src/app/services/apibombero.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  rut:string;
  nombre:string;

  constructor(private router: Router, 
    private api: ApibomberoService) {
    //this.router.navigate(['formularios'])
    this.rut = this.api.mostrarRut();
    this.nombre = this.api.mostrarUsuario();
    
  }
  ngOnInit() {
  }

  activarLectorQr(){
    console.log('activando lector qr');
    this.api.camaraQr();
  }
}
