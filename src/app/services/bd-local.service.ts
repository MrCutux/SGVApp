import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ISolicitud } from '../interfaces/isolicitud';
import { ILogin } from '../interfaces/ilogin';

@Injectable({
  providedIn: 'root'
})
export class BdLocalService {

  solicitud: ISolicitud[]=[];
  login: ILogin[]=[];
  private _storage: Storage | null = null;
  constructor(private storage: Storage, public toastController: ToastController) {
    this.init();
    this.cargarSolicitud()
    this.cargarLogin()
   }
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async cargarSolicitud(){
    const miSolicitud=await this.storage.get('solicitud');
    if(miSolicitud){
      this.solicitud=miSolicitud;
    }
  }

  async cargarLogin(){
    const miLogin=await this.storage.get('login');
    if(miLogin){
      this.login=miLogin;
    }
  }

  guardarSolicitud(rut: string, tipo: string, texto: string){
    //verificamos si el dato existe o no por medio de lambda
    const existe=this.solicitud.find(s=>s.strRut===rut);
    if (!existe) {
      this.solicitud.unshift({strRut:rut,strTipo:tipo,strTexto:texto});
      this._storage.set('solicitud',this.solicitud);
      this.presentToast("Solicitud enviada exitosamente")
    } else {
      this.presentToast("Error: Solicitud ya existe")
    }
  }

  guardarLogin(user: string, pass: string){
    //verificamos si el dato existe o no por medio de lambda
    const existe=this.login.find(l=>l.strUser===user);
    if (!existe) {
      this.login.unshift({strUser:user,strPass:pass});
      this._storage.set('login',this.login);
      this.presentToast("Usuario agregado exitosamente")
    } else {
      this.presentToast("Error: Usuario ya existe")
    }
  }

  validarLogin(user: string, pass: string){
    //verificamos si el dato existe o no por medio de lambda
    const existe=this.login.find(l=>l.strUser===user);
    if (existe) {
      this.login.unshift({strUser:user,strPass:pass});
    } else {
      this.presentToast("Error: Usuario no existe")
    }
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      translucent: true,
      color: 'medium',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}