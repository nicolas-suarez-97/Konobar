import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AgregMenuPage } from '../agreg-menu/agreg-menu';
import { ReportePage } from '../reporte/reporte';
import { LoginPage } from '../login/login';
import { ListaUsuariosPage } from '../lista-usuarios/lista-usuarios';
import { CocinaPage } from '../cocina/cocina';
import { LineaTiempoPage } from '../linea-tiempo/linea-tiempo';

/** CONTROLADOR DE LA VISTA ADMINISTRADOR **/
@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() { 
    
  }
  /* MÉTODO QUE MUESTRA LA LISTA DE USUARIOS */
  agregarMesa(){
    this.navCtrl.push(ListaUsuariosPage);
  }
  /* MÉTODO QUE MUESTRA LA LISTA DE PLATOS*/
  agregarMenu(){
    this.navCtrl.push(AgregMenuPage);
  }
  /* MÉTODO QUE MUESTRA EL REPORTE FINANCIERO */
  reporteFinanciero(){
    this.navCtrl.push(ReportePage);
  }

  inventario(){
    this.navCtrl.push(LineaTiempoPage);
  }
  /* MÉTODO QUE MUESTRA LA LISTA DE ORDENES  */
  ordenes(){
    this.navCtrl.push(CocinaPage);
  }

  salir(){
    this.navCtrl.setRoot(LoginPage);
  }
}
