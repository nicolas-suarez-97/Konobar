import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the EditarUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-usuario',
  templateUrl: 'editar-usuario.html',
})
export class EditarUsuarioPage {
  usuario: string="";
  contrasena:string="";
  numero:number=0;
  categoria:string="";
  
  user:any;
  llave:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.user=this.navParams.data.usuario;
    this.llave = this.navParams.data.llave;

    this.usuario=this.user.usuario;
    this.contrasena=this.user.contrasena;
    this.numero=this.user.numero;
    this.categoria=this.user.categoria;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarUsuarioPage');
  }

  modificar(){    
    firebase.database().ref().child('usuarios/'+this.llave).update({categoria:this.categoria,usuario:this.usuario,contrasena:this.contrasena,numero:this.numero});
    this.navCtrl.pop();
    
    const toast = this.toastCtrl.create({
      message: 'Usuario modificado correctamente',
      duration: 3000
    });
    toast.present();
    
  }
}
