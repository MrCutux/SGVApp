import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController, AlertController, AnimationController, Animation } from '@ionic/angular';
import { ApibomberoService } from 'src/app/services/apibombero.service';
import { BdLocalService } from 'src/app/services/bd-local.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  user:string;
  pass:string;

  constructor(
    public toastController: ToastController, 
    private router:Router, 
    public alertController: AlertController,
    private animationCtrl: AnimationController,
    public bdlocalservice: BdLocalService,
    public apibombero: ApibomberoService
    ) {
      
    }

  ngOnInit(){}

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
    this.limpiar();
  }

  validar(){
    //verificamos si las variables están indefinidas
    let flag: boolean=true;
    if(typeof this.user === 'undefined' || typeof this.pass === 'undefined'){
      this.presentAlert('Usuario / Contraseña vacío');
      flag=false;
    }
    else{
      if(this.user.length === 0){
        flag = false;
        this.presentAlert('Campo usuario: vacío');
      }
      if(this.pass.length === 0){
        flag = false;
        this.presentAlert('Campo contraseña: vacío');
      }
    }
    if(flag){
      this.ingresar()      
    }
  } 

  inicio(){
    //declaramos e instanciamos un elemento NAvigationExtras (para pasar parámetros)
    let navigationExtras: NavigationExtras={
      state:{user: this.user, pass: this.pass} //asignamos un elemento con clave y valor
    };
    //utilizamos API enrutador para llamar a la siguiente página
    //le damos el navigationExtras como parámetro para enviar el dato
    this.router.navigate(['/inicio'],navigationExtras);
  }
  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  getUsuarios() {
    this.apibombero.getBomberos().subscribe((data) => {
      this.verificarBombero(data);
      //console.log(data)
    });
  }

  ingresar(){
    this.getUsuarios();
    
  }

  verificarBombero(b:any){
    const bombero:any = b;
    for (let i=0; i<bombero.length; i++){
     // console.log(bombero[i].usuario,bombero[i].password)
      /* if(this.user !== bombero[i].usuario){
        this.presentToast('Usuario incorrecto');
      }
      if(this.pass !== bombero[i].password){
        this.presentToast('Contraseña incorrecta');
      } */
      if(this.user === bombero[i].usuario && this.pass === bombero[i].password){
        console.log('Usuario verificado')
        this.presentToast('Bienvenido');
        this.inicio();
      }
      else{
        console.log('error');
      }
    }
  }

  limpiar(){
    this.user=undefined
    this.pass=undefined
  }

}

  /* ingresar(){
    //mensaje toast
    this.bdlocalservice.validarLogin(this.user,this.pass)
    if(this.bdlocalservice.validarLogin){
      this.inicio()
    }else{
      this.presentToast("El usuario no ha sido encontrado")
      return;
    };
    this.inicio(),
    this.presentToast("Bienvenido "+this.user);
  }  */

  /* guardar(){
    this.bdlocalservice.guardarLogin(this.user,this.pass)
  }

  check(){
    this.bdlocalservice.validarLogin(this.user,this.pass)
  } */

