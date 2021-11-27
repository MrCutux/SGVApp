import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  apiURL="http://192.168.56.1:3000";
  constructor(private http: HttpClient) { 

  }
  getBomberos():Observable<any>{
    return this.http.get(this.apiURL+'/bomberos/').pipe(
      retry(3)
    );
}
createBomberos(bomberos):Observable<any>{
  return this.http.post(this.apiURL+'/bomberos/',bomberos,this.httpOptions)
  .pipe(
    retry(3)
  )
}
updateBombero(id,alumno):Observable<any>{
  return this.http.put(this.apiURL+'/companniasv/'+id,alumno,this.httpOptions).pipe(retry(3));
}
deleteBombero(id):Observable<any>{
  return this.http.delete(this.apiURL+'/companniasv'+id,this.httpOptions);
}

user:any;
guardarUsuario(user:any){
  this.user = user;
}

mostrarUsuario(){
  return this.user;
}
}
