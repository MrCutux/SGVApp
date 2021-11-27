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
  
  // Objeto usuario
  usuario: any ={
    user:'',
    pass:''
  };
  /* user:string;
  pass:string; */

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
    
  }

  validar(){
    //verificamos si las variables están indefinidas
    let flag: boolean=true;
    if(typeof this.usuario.user === 'undefined' || typeof this.usuario.pass === 'undefined'){
      this.presentAlert('Usuario / Contraseña vacío');
      flag=false;
    }
    else{
      if(this.usuario.user.length === 0){
        flag = false;
        this.presentAlert('Campo usuario: vacío');
      }
      if(this.usuario.pass.length === 0){
        flag = false;
        this.presentAlert('Campo contraseña: vacío');
      }
    }
    if(flag){
      this.ingresar() 
      this.apibombero.obtenerDatos(this.usuario);
          
    }
  } 

  inicio(){
    //declaramos e instanciamos un elemento NAvigationExtras (para pasar parámetros)
    let navigationExtras: NavigationExtras={
      state:{user: this.usuario.user, pass: this.usuario.pass} //asignamos un elemento con clave y valor
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
    let objeto = bombero;
    // Bandera
    let flag: boolean = true;
      for (const key in objeto) {
        if (Object.prototype.hasOwnProperty.call(objeto, key)) {
          const bombero = objeto[key];
          //console.log(arreglo.length);
          for (let i = 0; i < bombero.length; i++) {
              //console.log(bombero[i].usuario);
              if(this.usuario.user === bombero[i].usuario && this.usuario.pass === bombero[i].password){
                console.log("Verificado");
                this.inicio();
                break;
              }
              if (this.usuario.user !== bombero[i].usuario || this.usuario.pass !== bombero[i].password ){
                
                flag = false;
              }
            
          }
          
          
        }
      }

      // Condicion
      if(flag === false){
        console.log("El usuario o contraseña no existe");
      }
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

