import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DosComponent } from 'src/app/Components/dos/dos.component';
import { TresComponent } from 'src/app/Components/tres/tres.component';
import { UnoComponent } from 'src/app/Components/uno/uno.component';

import { FichaPage } from './ficha.page';

const routes: Routes = [
  {
    path: '',
    component: FichaPage,
    children:[{
      path:"uno",
      component: UnoComponent
    },
    {
      path:"dos",
      component: DosComponent
    },
    {
      path:"fallido",
      component: TresComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaPageRoutingModule {}
