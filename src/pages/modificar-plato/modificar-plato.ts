import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the ModificarPlatoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificar-plato',
  templateUrl: 'modificar-plato.html',
})
export class ModificarPlatoPage {
  plato:any;
  llave:any;
  nombre:string="";
  precio:number=0;
  src:string="";
  ingredientes:string="";
  descripcion:string="";
  categoria:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.plato=this.navParams.data.plato;  
    this.llave=this.navParams.data.llave;
    this.nombre=this.plato.nombre;
    this.precio=this.plato.precio;
    this.descripcion=this.plato.descripcion;
    this.ingredientes=this.plato.ingredientes;
    this.categoria=this.plato.categoria;
    this.src=this.plato.src;
    
  }

  ionViewDidLoad() {    
  }

  modificar(){    
    firebase.database().ref().child('platos/'+this.plato.llave).update({nombre:this.nombre,precio:this.precio,descripcion:this.descripcion,ingredientes:this.ingredientes,categoria:this.categoria,src:this.src});
    this.navCtrl.pop();

    
    const toast = this.toastCtrl.create({
      message: 'Plato modificado correctamente',
      duration: 3000
    });
    toast.present();
  }
}
