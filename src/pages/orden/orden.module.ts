import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdenPage } from './orden';

@NgModule({
  declarations: [
    OrdenPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdenPage),
  ],
})
export class OrdenPageModule {}
