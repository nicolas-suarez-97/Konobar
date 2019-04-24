import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SlidesPage } from '../slides/slides';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-final',
  templateUrl: 'final.html',
})
export class FinalPage {
  usuario:any;
  llave:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.usuario=this.navParams.data.usuario;
    this.llave=this.navParams.data.llave;
  }

  ionViewDidLoad() {
    
  }

  setRoot(usuario){
    
    firebase.database().ref().child("lineaTiempo").child("MESA"+usuario.numero).remove();
    firebase.database().ref().child("chat").child("Mesa"+usuario.numero).remove();

    this.navCtrl.setRoot(SlidesPage,{usuario:usuario})
  }

}
