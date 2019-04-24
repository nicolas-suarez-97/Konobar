import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModificarFacturaPage } from './modificar-factura';

@NgModule({
  declarations: [
    ModificarFacturaPage,
  ],
  imports: [
    IonicPageModule.forChild(ModificarFacturaPage),
  ],
})
export class ModificarFacturaPageModule {}
