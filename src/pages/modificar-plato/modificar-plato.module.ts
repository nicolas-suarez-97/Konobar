import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModificarPlatoPage } from './modificar-plato';

@NgModule({
  declarations: [
    ModificarPlatoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModificarPlatoPage),
  ],
})
export class ModificarPlatoPageModule {}
