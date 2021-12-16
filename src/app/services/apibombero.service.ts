import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Camera, CameraResultType } from '@capacitor/camera';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


@Injectable({
  providedIn: 'root'
})
export class ApibomberoService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  apiURL = "https://raw.githubusercontent.com/MrCutux/SGVApp/MrCutux/apibomb.json";
  constructor(private http: HttpClient, 
  //private barcodeScanner: BarcodeScanner
  ) {

  }
  getBomberos(): Observable<any> {
    return this.http.get(this.apiURL).pipe(
      retry(3)
    );
  }

  user: any;
  rut: any;
  guardarUsuario(user: any) {
    this.user = user;
  }

  guardarRut(rut: any) {
    this.rut = rut;
  }

  mostrarRut() {
    return this.rut;
  }
  mostrarUsuario() {
    return this.user;
  }

  dato: any;
  obtenerDatos(obj: any) {
    //console.log(obj);
    this.dato = obj;

  }

  mostrarDatos() {
    console.log(this.dato);
  }

  camara() {
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });

    }
    takePicture();
  }

  camaraQr(){
    const startScan = async () => {
      BarcodeScanner.hideBackground(); // make background of WebView transparent
    
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    
      // if the result has content
      if (result.hasContent) {
        console.log(result.content); // log the raw scanned content
      }
    };
  }
  /* activarLectorQr(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  } */

}
