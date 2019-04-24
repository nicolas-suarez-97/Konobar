import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { VerOrdenPage } from '../ver-orden/ver-orden';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CocinaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cocina',
  templateUrl: 'cocina.html',
})
export class CocinaPage {

  ordenes=[];
  llaves=[];
  ayuda=[];
  llavesAyuda=[]
  imagen:string="assets/imgs/nopedido.png";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getOrdenes();       
  }

  ionViewDidLoad() {
  }

  getOrdenes(){
    var mesasRef = firebase.database().ref().child("cocina");
    mesasRef.on("value",(snap)=>{
      var data = snap.val();      
      this.ordenes=[];
      this.llaves=[];
      for(var key in data){           
        this.ordenes.push(data[key]);
        this.llaves.push(key);
      } 
      if(this.ordenes.length != 0){
        this.imagen="";
      }else{
        this.imagen="assets/imgs/nopedido.png";
      }
    });   
  }
  verOrden(llave){    
    this.navCtrl.push(VerOrdenPage,{llave:llave});
    var fecha=new Date();
    var aux = String(llave).split("    ");
    firebase.database().ref().child("lineaTiempo").child(aux[1]).push({title: 'Tu pedido fue recibido en cocina',content: 'Uno de nuestros expertos esta haciendo tu pedido hecho a la medida ',
    icon: 'md-done-all',time: {subtitle: 'Cocina', title: fecha.getHours()+':'+fecha.getMinutes()}});
  }

  despachado(llave){
    firebase.database().ref().child("cocina").child(llave).update({estado:"Despachado"});

  }
  logout(){
    this.navCtrl.setRoot(LoginPage);
  }
  
}
