import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { LineaTiempoPage } from '../linea-tiempo/linea-tiempo';

/**
 * Generated class for the OrdenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orden',
  templateUrl: 'orden.html',
})
export class OrdenPage {
  usuario:any;
  orden=[];
  llaves=[];
  total:number;
  imagen:string="assets/imgs/noorden.png";
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController) {
    this.usuario=this.navParams.data.usuario;    
    this.getOrden();
    
  }

  ionViewDidLoad() {
    
  }

  getOrden(){
    this.total=0;
    var mesasRef = firebase.database().ref().child("ordenes").child('orden'+this.usuario.numero);
    mesasRef.on("value",(snap)=>{
      var data = snap.val();
      this.orden=[];
      this.llaves=[];
      for(var key in data){    
        this.orden.push(data[key]);
        this.llaves.push(key);
        this.total=this.total+Number(data[key].precio);
      }
      if(this.orden.length != 0){
        this.imagen="";
      }else{
        this.imagen="assets/imgs/noorden.png";
      }
    });     
  }

  eliminar(item){
    var cont: number = 0;
    var llave:any;
    for(let i of this.orden){
      if(item.nombre == i.nombre){
        console.log(this.llaves[cont]);
        llave = this.llaves[cont];
      }
      cont =cont+1;
    }
    firebase.database().ref().child("ordenes").child('orden'+this.usuario.numero+'/'+llave).remove();
    this.total=0;
    for(let ord of this.orden){
      this.total = this.total+Number(ord.precio);
    }
  }
  confirmar(){
    var fecha = new Date();
    var platos =[];
    //COCINA//
    var platoRef = firebase.database().ref().child("cocina").child(fecha.getHours()+':'+fecha.getMinutes()+'    MESA'+this.usuario.numero);
    for(let ord of this.orden){
      console.log(ord);
      platoRef.push({nombre:ord.nombre,ingredientes:ord.ingredientes,src:ord.src, precio:ord.precio,mesa:this.usuario.usuario,horaPedido:fecha.getHours()+':'+fecha.getMinutes()});   
    }
    
    platoRef = firebase.database().ref().child('Mesa'+this.usuario.numero);
    var calif = firebase.database().ref().child("calificacion").child('MESA'+this.usuario.numero);
    for(let ord of this.orden){      
      platoRef.push({nombre:ord.nombre,ingredientes:ord.ingredientes,src:ord.src, precio:ord.precio,mesa:this.usuario.usuario,horaPedido:fecha.getHours()+':'+fecha.getMinutes()});      
      calif.push({nombre:ord.nombre,src:ord.src,rating:0});      
      platos.push(ord.nombre);
    }
    firebase.database().ref().child("ordenes").child('orden'+this.usuario.numero).remove();
    
    //LINEA TIEMPO
    this.navCtrl.pop();
    this.navCtrl.push(LineaTiempoPage,{usuario:this.usuario});
    platoRef = firebase.database().ref().child("lineaTiempo").child('MESA'+this.usuario.numero);
    platoRef.push( {title: "Tu pedido se ha enviado a la cocina",content: "Orden: "+platos.toString(),
    icon: "md-paper-plane", time: {subtitle: 'Cocina', title: fecha.getHours()+':'+fecha.getMinutes()}});


    const alert = this.alertCtrl.create({
      title: 'Tu pedido ha sido enviado a la cocina',
      subTitle: 'Te estaremos informando el estado de tu pedido',
      buttons: ['OK']
    });
    alert.present();
  } 
}
