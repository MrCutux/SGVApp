import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresarGuard implements CanActivate {
  constructor(private router:Router){ 
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.length == 1){
        this.router.navigate(['/home'])
        console.log("Ingresado: True");
        return true;
      }else{
        // this.router.navigate(['/login']);
        console.log("Ingresado: False");
        return false;
      }
  }
  
}
