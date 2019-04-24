import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-info-plato',
  templateUrl: 'info-plato.html',
})
export class InfoPlatoPage {
  plato:any;
  nombre:string="";
  precio:number;
  descripción:string="";
  ingredientes:string="";
  ingred=[];  
  aux=[];
  categoria:string="";
  src:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage, public toastCtrl:ToastController) {
    this.plato=this.navParams.data.plato;
    this.nombre=this.plato.nombre;
    this.precio=this.plato.precio;
    this.descripción=this.plato.descripción;
    this.ingredientes=this.plato.ingredientes;
    this.categoria=this.plato.categoria;
    this.src=this.plato.src;
    this.ingred=this.ingredientes.split(",");
    this.aux=this.ingredientes.split(",");
    
    
  }

  ionViewDidLoad() {
  }

  agregar(){
    if(this.aux.length!=0){
      this.storage.get('numero').then((val) => {
        var platoRef = firebase.database().ref().child("ordenes").child('orden'+val);
        platoRef.push({nombre:this.nombre,precio:this.precio,ingredientes:this.aux.toString(),categoria:this.categoria,src:this.src});      
      });
      this.navCtrl.pop();
      const toast = this.toastCtrl.create({
        message: this.nombre+' Agregado Correctamente',
        duration: 3000
      });
      toast.present();
    }else{
      const toast = this.toastCtrl.create({
        message: 'No tienes ningún ingrediente seleccionado',
        duration: 3000
      });
      toast.present();
    }
  }
  seleccion(ing){
    var esta:Boolean=false;
    var pos;
    for(let i in this.aux){
      if(this.aux[i] == ing){
        esta = true;
        pos=Number(i);
      }
    }
    if(esta){
      this.aux.splice(pos,1);
    }else{
      this.aux.push(ing);
    }
  }

}
