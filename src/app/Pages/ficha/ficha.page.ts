import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.page.html',
  styleUrls: ['./ficha.page.scss'],
})
export class FichaPage implements OnInit {

 
  
  constructor(private router: Router) {
    this.router.navigate(['ficha'])
   }

  ngOnInit() {
    
  }
  segmentChanged(event: any){
    console.log(event);
    let ruta=event.detail.value
    this.router.navigate(['ficha/'+ruta]);
  }
  //
  
  
}
