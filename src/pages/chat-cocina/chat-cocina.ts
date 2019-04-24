import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the ChatCocinaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-cocina',
  templateUrl: 'chat-cocina.html',
})
export class ChatCocinaPage {
  @ViewChild("content") content : any;
  userName: string = "Cocina";
  message: string = "";
  mensajes = [];
  chat:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chat=this.navParams.data.chat;
    this.getMensajes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatCocinaPage');
  }
  getMensajes(){
    var menssagesRef = firebase.database().ref().child("chat").child(this.chat);
    menssagesRef.on("value",(snap) => {
      var data = snap.val();
      this.mensajes =[];
      for (var key in data){
        this.mensajes.push(data[key]);
      }
      //this.scrollToBottom();
    });
  }
  scrollToBottom(){
    var contentEnd = document.getElementById("content-end").offsetTop;
    this.content.scrollTo(0,contentEnd,300);
  }

  sendMessage(){
    if(this.message != "" ){
      var menssagesRef = firebase.database().ref().child("chat").child(this.chat);
      menssagesRef.push({texto:this.message, nombre:this.userName});
      this.message="";
      
    }
  }

}
