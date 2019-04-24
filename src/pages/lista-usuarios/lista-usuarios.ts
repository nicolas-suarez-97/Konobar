import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { AgregMesaPage } from '../agreg-mesa/agreg-mesa';
import firebase from 'firebase';
import { EditarUsuarioPage } from '../editar-usuario/editar-usuario';

/**
 * Generated class for the ListaUsuariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-usuarios',
  templateUrl: 'lista-usuarios.html',
})
export class ListaUsuariosPage {
  usuarios=[];
  llaves=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.getUsuarios();
  }

  getUsuarios(){
    var mesasRef = firebase.database().ref().child("usuarios");
    mesasRef.on("value",(snap)=>{
      var data = snap.val();
      this.usuarios=[];
      this.llaves=[];
      for(var key in data){
        this.usuarios.push(data[key]);
        this.llaves.push(key);
      }
    });    
    for(let i in this.llaves){
      console.log(i);
      this.usuarios[i].llave=this.llaves[i];
    }
  }

  ionViewDidLoad() {
    
  }
  agregarUsuario(){
    this.navCtrl.push(AgregMesaPage);
  }
  editar(usuario){
    var cont: number = 0;
    var llave:any;
    for(let i of this.usuarios){
      if(usuario.usuario == i.usuario){
        console.log(this.llaves[cont]);
        llave = this.llaves[cont];
      }
      cont =cont+1;
    }
    this.navCtrl.push(EditarUsuarioPage,{usuario:usuario,llave:llave});
    
  }
  borrar(usuario){
    if(usuario.categoria!="admin"){
      let confirm = this.alertCtrl.create({
        title: 'Alerta',
        message: '¿Desea borrar permanentemente este registro?',
        buttons: [
          {
            text: 'No',
            handler: () => {            
            }
          },
          {
            text: 'Si',
            handler: () => {            
              var cont: number = 0;
              var llave:any;
              for(let i of this.usuarios){
                if(usuario.usuario == i.usuario){
                  console.log(this.llaves[cont]);
                  llave = this.llaves[cont];
                }
                cont =cont+1;
              }
              firebase.database().ref().child('usuarios/'+llave).remove();
            }
          }
        ]
      });
      confirm.present();
    }

  }
  

}
