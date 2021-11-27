import { Component, OnInit } from '@angular/core';
import { ApibomberoService } from 'src/app/services/apibombero.service';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.scss'],
})
export class UnoComponent implements OnInit {
  bombero:any ={
    rut: "",
    nombre1: "",
    apellido1: "",
    apellido2: "",
    direccion: "",
    ciudad: "",
    fechanac: "",
    compañia: "",
    fechaingreso: "",
    nreg: "",
    cargo: "",
    estado: "",
  }
  usuario: any;
  constructor(private api: ApibomberoService) { }

  ngOnInit() {
    this.usuario = this.api.mostrarUsuario();
    this.obtenerDatos();
    console.log(this.bombero);
  }


  obtenerDatos(){
    this.api.getBomberos().subscribe((data) => {
      
      //console.log(data);
      this.verificarBombero(data);
    });
  }

  verificarBombero(b:any){
    const bombero:any = b;
    for (let i=0; i<bombero.length; i++){
     // console.log(bombero[i].usuario,bombero[i].password)
      if(this.usuario === bombero[i].usuario){
        console.log('Usuario verificado')
        this.bombero.rut = bombero[i].rut;
        this.bombero.nombre1 = bombero[i].nombre1;
        this.bombero.apellido1 = bombero[i].apellido1;
        this.bombero.apellido2 = bombero[i].apellido2;
        this.bombero.direccion = bombero[i].direccion;
        this.bombero.ciudad = bombero[i].ciudad;
        this.bombero.fechanac = bombero[i].fechanac;
        this.bombero.compañia = bombero[i].compañia;
        this.bombero.fechaingreso = bombero[i].fechaingreso;
        this.bombero.nreg = bombero[i].nreg;
        this.bombero.cargo = bombero[i].cargo;
        this.bombero.estado = bombero[i].estado;
        
      }
      else{
        console.log('error');
      }
    }
  }
}
