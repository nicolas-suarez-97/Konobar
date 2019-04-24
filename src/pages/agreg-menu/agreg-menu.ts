import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AgregarPlatoPage } from '../agregar-plato/agregar-plato';
import firebase from 'firebase';
import { ModificarPlatoPage } from '../modificar-plato/modificar-plato';

/** CONTROLADOR DE LA VISTA DEL LISTADO DE PLATOS */
@IonicPage()
@Component({
  selector: 'page-agreg-menu',
  templateUrl: 'agreg-menu.html',
})
export class AgregMenuPage {

  platos=[];
  llaves=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.getPlatos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregMenuPage');
  }
  /** MÉTODO QUE RECOGE TODOS LOS DATOS DE LA BASE DE DATOS Y LOS ALMACENA EN UN ARREGLO */
  getPlatos(){
    var platosRef = firebase.database().ref().child("platos");
    platosRef.on("value",(snap)=>{
      let data = snap.val();
      this.platos=[];
      this.llaves=[];
      for(var key in data){
        this.platos.push(data[key]);
        this.llaves.push(key);        
      }
    });
    for(let i in this.llaves){      
      this.platos[i].llave=this.llaves[i];
    }
  }
  agregarPlato(){
    this.navCtrl.push(AgregarPlatoPage);
  }
  /** MODIFICACIÓN DEL PLATO SELECCIONADO */
  editar(plato){
    var cont: number = 0;
    var llave:any;
    for(let i of this.platos){
      if(plato.nombre == i.nombre){
        console.log(this.llaves[cont]);
        llave = this.llaves[cont];
      }
      cont =cont+1;
    }
    plato.llave=llave;    
    this.navCtrl.push(ModificarPlatoPage,{plato:plato,llave:llave});
  }
  /** MÉTODO QUE BORRA DE LA BASE DE DATOS EL ARCHIVO SELECCIONADO */
  borrar(plato){
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
            for(let i of this.platos){
              if(plato.nombre == i.nombre){
                console.log(this.llaves[cont]);
                llave = this.llaves[cont];
              }
              cont =cont+1;
            }
            firebase.database().ref().child('platos/'+llave).remove();         
          }
        }
      ]
    });
    confirm.present();
  }
}

