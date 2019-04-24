import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild("content") content : any;
  userName: string = "";
  message: string = "";
  mensajes = [];
  usuario:any;
  imagen:string="assets/imgs/chat.png";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.usuario=this.navParams.data.usuario;
    this.userName="Mesa "+this.usuario.numero;
    this.getMensajes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  getMensajes(){
    var menssagesRef = firebase.database().ref().child("chat").child("Mesa"+this.usuario.numero);
    menssagesRef.on("value",(snap) => {
      var data = snap.val();
      this.mensajes =[];
      for (var key in data){
        this.mensajes.push(data[key]);
      }
      if(this.mensajes.length != 0){
        this.imagen = "";
      }else{
        this.imagen="assets/imgs/chat.png";
      }
      //this.scrollToBottom();
    });
  }
  scrollToBottom(){
    var contentEnd = document.getElementById("content-end").offsetTop;
    this.content.scrollTo(0,contentEnd,300);
  }

  sendMessage(){
    if(this.message != "" && this.userName!="Cocina"){
      var menssagesRef = firebase.database().ref().child("chat").child("Mesa"+this.usuario.numero);
      menssagesRef.push({texto:this.message, nombre:this.userName});
      this.message="";
      
    }
  }
}
