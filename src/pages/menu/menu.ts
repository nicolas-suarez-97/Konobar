import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PlatosPage } from '../platos/platos';
import { BebidasPage } from '../bebidas/bebidas';
import { PostresPage } from '../postres/postres';
import {  SuperTabs } from 'ionic2-super-tabs';
import { OrdenPage } from '../orden/orden';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { FacturaPage } from '../factura/factura';
import { LineaTiempoPage } from '../linea-tiempo/linea-tiempo';
import { ChatPage } from '../chat/chat';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(SuperTabs) superTabs: SuperTabs;
  numero: any;
  page1: any = PlatosPage;
  page2: any = BebidasPage;
  page3: any = PostresPage;
  usuario:any;
  llave:string;  
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private storage: Storage) {
    this.usuario=this.navParams.data.usuario;     
    this.storage.set('numero',this.usuario.numero);   
    this.getDespacho();
    this.llave="Mesa"+this.usuario.numero;   
  }
  
  ionViewDidLoad() {
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
  orden(usuario){
    this.navCtrl.push(OrdenPage,{usuario:usuario});
  }

  
  getDespacho(){
    var mesasRef = firebase.database().ref().child("despachado");    
    mesasRef.on("value",(snap)=>{
      var data = snap.val();            
      for(var key in data){
        if(data[key].mesa=="Mesa"+this.usuario.numero){                           
          const alert = this.alertCtrl.create({
            title: 'Tu pedido acaba de ser despachado',
            subTitle: 'Uno de nuestros meseros está llevando la comida a tu mesa, agradecemos tu comprensión',
            buttons: ['OK']
          });
          alert.present();
          firebase.database().ref().child("despachado").child(key).remove();
          this.facturar("Mesa"+this.usuario.numero,this.usuario);           
        }     
      }      
    });  
  }

  facturar(llave,usuario){
    this.navCtrl.push(FacturaPage,{llave:llave,usuario:usuario});
  }
  estado(){
    this.navCtrl.push(LineaTiempoPage,{usuario:this.usuario});
  }
  chat(){
    this.navCtrl.push(ChatPage,{usuario:this.usuario});
  }
}
