import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdLocalService } from 'src/app/services/bd-local.service';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.page.html',
  styleUrls: ['./formularios.page.scss'],
})
export class FormulariosPage implements OnInit {

  rut:string;
  tipo:string;
  texto:string;

  constructor(private router: Router, public bdlocalservice: BdLocalService, public alertController: AlertController) {
    this.router.navigate(['formularios'])
   }

  ngOnInit() {
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'ion-text-center',
      header: msg,
      animated: true,
      translucent: true,
      buttons: [
        {
          text: 'Intentar denuevo',
          role: 'cancel',
          cssClass: 'large primary ion-padding-horizontal',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        }
      ]
    });
    alert.present();
  }
  guardar(){
    let flag: boolean=true;
    if(typeof this.rut === 'undefined' || typeof this.tipo === 'undefined'){
      this.presentAlert('Rellene los campos');
      flag=false;
      return;
    }
    else{
      if(this.rut.length === 0){
        flag = false;
        this.presentAlert('Debe ingresar un rut valido');
        return;
      }
      if(this.tipo.length === 0){
        flag = false;
        this.presentAlert('Debe ingresar un tipo de solicitud');
        return;
      }
      if(this.texto.length === 10){
        this.presentAlert('Escriba el motivo de la solicitud')
        flag = false;
        return;
      }
    }
    if(flag){
      this.bdlocalservice.guardarSolicitud(this.rut,this.tipo,this.texto);
    }  
    
  }

  segmentChanged(event: any){
    console.log(event);
    let ruta=event.detail.value
    this.router.navigate(['formularios/'+ruta]);
  }
  bomberos: any[]=[
    {id:1,tipo:"Actualizar datos"},
    {id:2,tipo:"Eliminar datos"},
    {id:3,tipo:"Agregar datos"},
    {id:4,tipo:"Solicitar datos"}
  ];
  //metodo de limpieza de datos de los input
  limpiar(){
    this.rut=undefined
    this.tipo=undefined
    this.texto=undefined
  }
}
