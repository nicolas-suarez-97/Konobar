import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { ChatCocinaPage } from '../chat-cocina/chat-cocina';
import { LoginPage } from '../login/login';

/**
 * Generated class for the AyudaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class AyudaPage {
  llaves=[];
  ayuda=[];
  facturas=[];
  llavesFact=[];
  chats=[];
  logoAyuda:string="assets/imgs/LogoAyuda.png";
  logoFactura:string="assets/imgs/logoFactura.png";
  logoChat:string="assets/imgs/chat.png";
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.getAyuda();
    this.getFactura();
    this.getChats();
  }

  ionViewDidLoad() {    
  }
  getAyuda(){
    var mesasRef = firebase.database().ref().child("ayuda");
    mesasRef.on("value",(snap)=>{
      var data = snap.val();
      this.ayuda=[];
      this.llaves=[];
      for(var key in data){
        if(data[key]!=null){
          const alert = this.alertCtrl.create({
            title: 'Ayuda!',
            subTitle: 'Mesa'+data[key].mesa,
            buttons: ['OK']
          });
          alert.present();
        }
        this.ayuda.push(data[key]);
        this.llaves.push(key);
      }
      if(this.ayuda.length !=0){
        this.logoAyuda="";
      }else{
        this.logoAyuda="assets/imgs/LogoAyuda.png";
      }
    });        
  }

  getFactura(){
    var mesasRef = firebase.database().ref().child("factura");
    mesasRef.on("value",(snap)=>{
      var data = snap.val();
      this.facturas=[];
      this.llavesFact=[];
      for(var key in data){
        if(data[key]!=null){
          const alert = this.alertCtrl.create({
            title: 'Factura!',
            subTitle: 'Mesa'+data[key].mesa,
            buttons: ['OK']
          });
          alert.present();
        }
        this.facturas.push(data[key]);
        this.llavesFact.push(key);
      }
      if(this.facturas.length !=0){
        this.logoFactura="";
      }else{
        this.logoFactura="assets/imgs/logoFactura.png";
      }
    });  
  }

  solucionar(ay){
    var cont: number = 0;
    var llave:any;
    for(let i of this.ayuda){
      if(ay.mesa == i.mesa){        
        llave = this.llaves[cont];
      }
      cont =cont+1;
    }
    firebase.database().ref().child("ayuda").child(llave).remove();
  }

  solucionarFac(fac){
    var cont: number = 0;
    var llave:any;
    for(let i of this.facturas){
      if(fac.mesa == i.mesa){        
        llave = this.llavesFact[cont];
      }
      cont =cont+1;
    }
    firebase.database().ref().child("factura").child(llave).remove();
  }
  getChats(){
    var menssagesRef = firebase.database().ref().child("chat");
    menssagesRef.on("value",(snap) => {
      var data = snap.val();
      this.chats =[];
      for (var key in data){
        this.chats.push(key);
      }
      if(this.chats.length!=0){
        this.logoChat="";
      }else{
        this.logoChat="assets/imgs/chat.png";
      }
      
    });
  }
  abrir(chat){
    this.navCtrl.push(ChatCocinaPage,{chat:chat});
  }
  salir(){
    this.navCtrl.setRoot(LoginPage);
  }
}
