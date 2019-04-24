import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-agreg-mesa',
  templateUrl: 'agreg-mesa.html',
})
export class AgregMesaPage {
  mesas = [];
  usuario: string="";
  contrasena:string="";
  numero:number=0;
  categoria:string="";
  max:number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getUsuarios();
    for(let m of this.mesas){
      if(this.max < m.numero){
        this.max = m.numero;
      }
    } 
    this.max = Number(this.max)+1;    
  }
  /** MÉTODO QUE ALMACENA LOS DATOS EXISTENTES DE USUARIOS */
  getUsuarios(){
    var mesasRef = firebase.database().ref().child("usuarios");
    mesasRef.on("value",(snap)=>{
      var data = snap.val();
      this.mesas=[];
      for(var key in data){
        this.mesas.push(data[key]);
      }
    });    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregMesaPage');
  }
  /**MÉTODO QUE ASIGNA VALORES PREDETERMINADOS PARA EL USUARIO MESA */
  mesa(){
    this.categoria="mesa";
    this.numero=this.max;
    this.usuario="Mesa"+this.max;
    this.contrasena="Mesa"+this.max;
  }
  /**MÉTODO QUE ASIGNA VALORES PREDETERMINADOS PARA EL USUARIO MESERO */
  empleado(){
    this.categoria="mesero";
    this.numero = null;
    this.usuario="";
    this.contrasena="";
  }
  /**MÉTODO QUE ASIGNA VALORES PREDETERMINADOS PARA EL USUARIO COCINA */
  cocina(){
    this.categoria="cocina";
    this.numero = null;
    this.usuario="";
    this.contrasena="";
  }
  /** MÉTODO QUE ENVIA LOS DATOS A LA BASE DE DATOS ACERCA DEL USUARIO QUE SE VA A CREAR */
  agregar(){
    if(this.usuario!="" && this.contrasena!=""){
      console.log("Se agregó");
      var mesasRef = firebase.database().ref().child("usuarios");
      mesasRef.push({categoria:this.categoria,usuario:this.usuario,contrasena:this.contrasena,numero:this.numero});
      this.navCtrl.pop();
    }else{
      
    }
  }

}
