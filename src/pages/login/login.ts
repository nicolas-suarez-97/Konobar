import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AdminPage } from '../admin/admin';
import firebase from 'firebase';
import { SlidesPage } from '../slides/slides';
import { AyudaPage } from '../ayuda/ayuda';
import { CocinaPage } from '../cocina/cocina';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userName: string="";
  password: string="";
  usuarios = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.getUsuarios();
  }

  ionViewDidLoad() {    
  }

  getUsuarios(){
    var usuariosRef = firebase.database().ref().child("usuarios");
    usuariosRef.on("value",(snap)=>{
      var data = snap.val();
      this.usuarios = [];
      for(var key in data){
        this.usuarios.push(data[key]);
      }
    });
  }
  login(){
    var usuBool=false;
    var passBool = false;
    for(let usu of this.usuarios){

      if(this.userName==usu.usuario){
        usuBool=true;
        if(this.password==usu.contrasena){
          if(usu.categoria == "admin"){
            passBool=true;
            this.openAdminPage();
          }
          if(usu.categoria == "cocina"){
            passBool=true;
            this.openCocinaPage();
          }
          if(usu.categoria == "mesa"){
            passBool=true;
            this.openMenuPage(usu);
          }
          if(usu.categoria == "mesero"){
            passBool=true;
            this.openAyudaPage();
          }
        }
      }
    }
    if(!usuBool){
      const alert = this.alertCtrl.create({
        title: 'Alerta',
        subTitle: 'El usuario ingresado no existe',
        buttons: ['OK']
      });
      alert.present();
    }else{
      if(!passBool){
          const alert = this.alertCtrl.create({
            title: 'Alerta',
            subTitle: 'Contrseña Incorrecta',
            buttons: ['OK']
          });
          alert.present();

      }
    }
  }
  openMenuPage(usuario){
    
    this.navCtrl.setRoot(SlidesPage,{usuario:usuario});
  }
  openAdminPage(){
    this.navCtrl.setRoot(AdminPage);
  }
  openCocinaPage(){
    this.navCtrl.setRoot(CocinaPage);
  }
  openAyudaPage(){
    this.navCtrl.setRoot(AyudaPage);
  }

}
