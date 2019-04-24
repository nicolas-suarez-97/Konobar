import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { InfoPlatoPage } from '../info-plato/info-plato';


@IonicPage()
@Component({
  selector: 'page-platos',
  templateUrl: 'platos.html',
})
export class PlatosPage {
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
        if(data[key].categoria=="Platos"){          
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
