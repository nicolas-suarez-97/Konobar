import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { FinalPage } from '../final/final';

/**
 * Generated class for the CalificacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calificacion',
  templateUrl: 'calificacion.html',
})
export class CalificacionPage {
  platos=[];
  llaves=[];
  usuario:any;
  llave:any;
  valor:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.usuario=this.navParams.data.usuario;
    this.llave=this.navParams.data.llave;
    this.getCalificaciones();
  }

  getCalificaciones(){
    var mesasRef = firebase.database().ref().child("calificacion").child("MESA"+this.usuario.numero);
    mesasRef.on("value",(snap)=>{
      var data = snap.val();      
      this.platos=[];
      this.llaves=[];
      for(var key in data){           
        this.platos.push(data[key]);
        this.llaves.push(key);
      }     
      console.log(this.platos); 
    });   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CalificacionPage');
  }

  skip(){
    firebase.database().ref().child("calificacion").child("MESA"+this.usuario.numero).remove();
    this.navCtrl.setRoot(FinalPage,{usuario:this.usuario,llave:this.llave});
  }
  enviar(){
    firebase.database().ref().child("calificacion").child("MESA"+this.usuario.numero).remove();
    this.navCtrl.setRoot(FinalPage,{usuario:this.usuario,llave:this.llave});
  }
  calif(plato){
    var cont: number = 0;
    var llave:any;
    for(let i of this.platos){
      if(plato.nombre == i.nombre){        
        llave = this.llaves[cont];
      }
      cont =cont+1;
    }
    firebase.database().ref().child("calificacion").child("MESA"+this.usuario.numero+"/"+llave).update({rating:plato.rating});
  }
}
