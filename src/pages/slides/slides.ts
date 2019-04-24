import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import firebase from 'firebase';


/**
 * Generated class for the SlidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html',
})
export class SlidesPage {
  slides = [
    {
      title: "¿Qué es Konobar?",
      description: "Este es un aplicativo que te permitira realizar tu orden ",
      image: "assets/imgs/chef.jpg",
    },
    {
      title: "¿No sabes qué hacer?",
      description: "No te preocupes, si tienes inconvenientes oprime este botón y alguien te ayudara",
      image: "assets/imgs/Campana.png",
    }
  ];

  usuario:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.usuario=this.navParams.data.usuario;  
    
  }

  ionViewDidLoad() {
    
  }
  setRoot(usuario){    
    this.navCtrl.setRoot(MenuPage,{usuario:usuario});
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
}
