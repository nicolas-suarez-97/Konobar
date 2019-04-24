import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InfoPlatoPage } from '../info-plato/info-plato';
import firebase from 'firebase';

/**
 * Generated class for the BebidasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bebidas',
  templateUrl: 'bebidas.html',
})
export class BebidasPage {
  platos=[];
  llaves=[];
  rootNavCtrl: NavController;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
    this.getPlatos();
  }

  
  getPlatos(){
    var mesasRef = firebase.database().ref().child("platos");
    mesasRef.on("value",(snap)=>{
      var data = snap.val();
      this.platos=[];
      this.llaves=[];
      for(var key in data){
        if(data[key].categoria=="Bebidas"){          
          this.platos.push(data[key]);
          this.llaves.push(key);
        }
      }
    });  
    for(let i in this.llaves){
      console.log(i);
      this.platos[i].llave=this.llaves[i];
    } 
    //console.log(this.platos);
  }
  ionViewDidLoad() {    
  }

  openPage(plato){
    this.rootNavCtrl.push(InfoPlatoPage,{plato:plato});
  }

}
