import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { MenuPage } from '../menu/menu';
import { FinalPage } from '../final/final';
import { CalificacionPage } from '../calificacion/calificacion';

@IonicPage()
@Component({
  selector: 'page-factura',
  templateUrl: 'factura.html',
})
export class FacturaPage {
  platos=[];
  llaves=[];
  llave:any;
  usuario:any;
  total:number;
  pago:boolean=false;
  key:any;
  imagen:string="assets/imgs/nofactura.png"
  constructor(public navCtrl: NavController, public navParams: NavParams,  public toastCtrl: ToastController) {    
    this.llave=this.navParams.data.llave;
    this.usuario=this.navParams.data.usuario;
    this.getPlatos();  
    this.getDespacho();

  }

  ionViewDidLoad() {    
  }
  getPlatos(){
    this.total=0; 
    var mesasRef = firebase.database().ref().child(this.llave);
    mesasRef.on("value",(snap)=>{
      var data = snap.val();      
      this.platos=[];
      this.llaves=[];
      for(var key in data){           
        this.platos.push(data[key]);
        this.llaves.push(key);
        this.total=this.total+Number(data[key].precio);
      }
      if(this.platos.length !=0){
        this.imagen="";
      }else{
        this.imagen="assets/imgs/nofactura.png";
      }
    });        
  }
  pedir(usuario){
    this.navCtrl.setRoot(MenuPage,{usuario:usuario});
  }
  pagar(usuario){
    if(this.pago){
      var ayudaRef = firebase.database().ref().child("factura");
      ayudaRef.push({mesa:this.usuario.numero});
      var fecha = new Date();
      var platoRef = firebase.database().ref().child("reporte").child(fecha.getMonth()+1+'/'+fecha.getDate());
      for(let plato of this.platos){
        platoRef.push({nombre:plato.nombre,ingredientes:plato.ingredientes,src:plato.src,precio:plato.precio,mesa:plato.mesa,horaPedido:plato.horaPedido,horaDespacho:fecha.getHours()+':'+fecha.getMinutes()});         
      }
      firebase.database().ref().child(this.llave).remove();
      this.navCtrl.setRoot(CalificacionPage,{usuario:usuario,llave:this.llave});
      firebase.database().ref().child("listoPagar").child(this.key).remove();
    }else{
      const toast = this.toastCtrl.create({
        message: 'Tu plato aun no ha sido despachado',
        duration: 3000
      });
      toast.present();
    }
  }
  getDespacho(){
    var mesasRef = firebase.database().ref().child("listoPagar");    
    mesasRef.on("value",(snap)=>{
      var data = snap.val();            
      for(var key in data){
        if(data[key].mesa=="Mesa"+this.usuario.numero){  
          this.pago = true;             
          this.key=key;                                       
        }
      }      
    });  
  }
}
