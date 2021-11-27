import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormulariosPageRoutingModule } from './formularios-routing.module';

import { FormulariosPage } from './formularios.page';
import { UnoComponent } from 'src/app/Components/uno/uno.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormulariosPageRoutingModule
  ],
  declarations: [FormulariosPage,UnoComponent]
})
export class FormulariosPageModule {}
