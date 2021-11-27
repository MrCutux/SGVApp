import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Camera, CameraResultType } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class ApibomberoService {
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' :'*'
    })
  }
  apiURL="https://raw.githubusercontent.com/MrCutux/SGVApp/master/apibomb.json";
  constructor(private http: HttpClient) { 

  }
  getBomberos():Observable<any>{
    return this.http.get(this.apiURL).pipe(
      retry(3)
    );
}

user:any;
guardarUsuario(user:any){
  this.user = user;
}

mostrarUsuario(){
  return this.user;
}

dato: any;
obtenerDatos(obj: any){
  //console.log(obj);
  this.dato = obj;

}

mostrarDatos(){
  console.log(this.dato);
}

camara(){
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    
  }
  takePicture();
 
}

}
