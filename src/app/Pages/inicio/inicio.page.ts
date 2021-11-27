import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApibomberoService } from 'src/app/services/apibombero.service';

@Component({
  selector: 'app-inicio', 
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  mostrar = false;
  user:any;
  compannia:any;
  constructor(private activeroute: ActivatedRoute,
     private router:Router,
     public toastController: ToastController,
     public alertController: AlertController, 
     private api: ApibomberoService) {
    this.activeroute.queryParams.subscribe(params=> {
      if(this.router.getCurrentNavigation().extras.state){ //verifico si extras viene con valor
        this.user=this.router.getCurrentNavigation().extras.state.user;
        api.guardarUsuario(this.user) //comprobamos en consola que es lo que tiene el parámetro
      }
    });
   }

  mostrarSpinner(){
    this.mostrar =   true;
    setTimeout(() => {
      this.mostrar = false;
      this.presentAlert('No se pudo llevar a cabo');
    }, 3000)
    
  };

  activarCamara(){
    this.api.camara();
  }
 async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'ion-text-center',
      header: msg,
      animated: true,
      translucent: true,
      buttons: [
        {
          text: 'OK',
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
  ngOnInit() {
  }

  solicitud(){
    this.router.navigate(['/formularios'],)
  }

  ficha(){
    this.router.navigate(['/ficha/uno'],)
  }

  salir(){
    //location.
    this.router.navigate(['/home'],)
    
    
  }

  

  getCompannia(){
    
  }
}
