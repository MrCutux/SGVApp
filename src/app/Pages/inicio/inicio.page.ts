import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApibomberoService } from 'src/app/services/apibombero.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {
  mostrar = false;
  user: any;
  rut: any;
  compannia: any;
  username = localStorage.getItem('nombreusuario');
  code: any;
  constructor(private activeroute: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController,
    private api: ApibomberoService,
    private barcodeScanner: BarcodeScanner) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) { //verifico si extras viene con valor
        this.user = this.router.getCurrentNavigation().extras.state.user;
        this.rut = this.router.getCurrentNavigation().extras.state.rut;
        api.guardarRut(this.rut);
        api.guardarUsuario(this.user) //Comprobamos en consola que es lo que tiene el parámetro
      }
    });
  } 
  mostrarSpinner() {
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
      this.presentAlert('No se pudo llevar a cabo');
    }, 3000)
  };

  activarCamara() {
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

  solicitud() {
    this.router.navigate(['/formularios'],)
  }

  ficha() {
    this.router.navigate(['/ficha/uno'],)
  }

  asistencia() {
    this.router.navigate(['/asistencia'])
  }

  salir() {
    //location.
    this.router.navigate(['/home'],)
    localStorage.clear();
    console.log('LOCAL STORAGE CLEAR');
  }
  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }
}