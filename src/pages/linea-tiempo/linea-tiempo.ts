import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { ChatPage } from '../chat/chat';
import { FacturaPage } from '../factura/factura';

/**
 * Generated class for the LineaTiempoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-linea-tiempo',
  templateUrl: 'linea-tiempo.html',
})
export class LineaTiempoPage {
  items = [
    /*{
      title: 'Tu pedido se ha enviado a la cocina',
      content: 'Tu orden de: papas gaseosa hamburguesa papitas ensalada salsa etc...',
      icon: 'calendar',
      time: {subtitle: 'Cocina', title: '11:04'}
    },
    {
      title: 'Tu pedido fue recibido en cocina',
      content: 'Uno de nuestros expertos esta haciendo tu pedido hecho a la medida ',
      icon: 'calendar',
      time: {subtitle: 'Cocina', title: '11:06'}
    },
    {
      title: 'Tu pedido está siendo revisado ',
      content: 'Tu pedido está siendo revisado para pasar el control de calidad',
      icon: 'calendar',
      time: {subtitle: 'Control Calidad', title: '11:20'}
    },
    {
      title: 'Tu orden fue despachada ',
      content: 'En cualquier momento el mesero llegará con tu orden!',
      icon: 'calendar',
      time: {subtitle: 'Mesero', title: '11:22'}
    }*/
  ]
  usuario:any;
  imagen:string="assets/imgs/noorden.png";
  llave:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.usuario=this.navParams.data.usuario;
    console.log(this.usuario);
    this.getItems();
    this.llave="Mesa"+this.usuario.numero; 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LineaTiempoPage');
  }

  getItems(){
    var mesasRef = firebase.database().ref().child("lineaTiempo").child('MESA'+this.usuario.numero);
    mesasRef.on("value",(snap)=>{
      var data = snap.val();
      this.items=[];      
      for(var key in data){    
        this.items.push(data[key]);        
      }
      if(this.items.length==0){
        this.imagen="assets/imgs/noorden.png";
      }else{
        this.imagen="";
      }
    });   
  }
  ayuda(){
    var ayudaRef = firebase.database().ref().child("ayuda");
    ayudaRef.push({mesa:this.usuario.numero});     
    const alert = this.alertCtrl.create({
      title: 'Vamos a enviar a alguien para que te ayude',
      subTitle: 'Agradecemos tu comprensión y paciencia',
      buttons: ['OK']
    });
    alert.present();
  }
  chat(){
    this.navCtrl.push(ChatPage,{usuario:this.usuario})
  }
  facturar(llave,usuario){
    
    this.navCtrl.push(FacturaPage,{llave:llave,usuario:usuario});
  }
}
