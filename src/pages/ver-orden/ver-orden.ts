import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-ver-orden',
  templateUrl: 'ver-orden.html',
})
export class VerOrdenPage {
  orden:any;
  llaves=[];
  platos=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.orden=this.navParams.data.llave;
    this.getOrden();
  }

  ionViewDidLoad() {
  }

  getOrden(){
    var mesasRef = firebase.database().ref().child("cocina").child(this.orden);
    mesasRef.on("value",(snap)=>{
      var data = snap.val();      
      this.platos=[];
      this.llaves=[];
      for(var key in data){   
        console.log(data[key]);
        this.platos.push(data[key]);
        this.llaves.push(key);
      }
    });   
  }
  despachado(){
    var mesa=this.platos[0].mesa;
    var fecha=new Date();
    
    var platoRef = firebase.database().ref().child("despachado");
    platoRef.push({mesa:mesa,horaDespacho:fecha.getHours()+':'+fecha.getMinutes()});   

    platoRef = firebase.database().ref().child("listoPagar");
    platoRef.push({mesa:mesa,horaDespacho:fecha.getHours()+':'+fecha.getMinutes()});   

    firebase.database().ref().child("cocina").child(this.orden).remove();

    var aux = String(this.orden).split("    ");
    firebase.database().ref().child("lineaTiempo").child(aux[1]).push({title: 'Tu pedido acaba de ser despachado',content: 'Uno de nuestros meseros va a llevar tu pedido a la mesa',
    icon: 'md-done-all',time: {subtitle: 'Cocina', title: fecha.getHours()+':'+fecha.getMinutes()}});
    this.navCtrl.pop();
  }
  

  demorado(){
    var fecha=new Date();
    var aux = String(this.orden).split("    ");
    firebase.database().ref().child("lineaTiempo").child(aux[1]).push({title: 'Hay una pequeña demora en tu pedido',content: 'Disculpa los inconvenientes, estamos trabajando lo más rápido posible para llevar tu pedido a la mesa',
    icon: 'md-alert',time: {subtitle: 'Cocina', title: fecha.getHours()+':'+fecha.getMinutes()}});
  }
}
