import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlatosPage } from './platos';

@NgModule({
  declarations: [
    PlatosPage,
  ],
  imports: [
    IonicPageModule.forChild(PlatosPage),
  ],
})
export class PlatosPageModule {}
