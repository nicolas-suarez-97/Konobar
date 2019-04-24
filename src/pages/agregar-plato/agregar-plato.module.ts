import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarPlatoPage } from './agregar-plato';

@NgModule({
  declarations: [
    AgregarPlatoPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarPlatoPage),
  ],
})
export class AgregarPlatoPageModule {}
