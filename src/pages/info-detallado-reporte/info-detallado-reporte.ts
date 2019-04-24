import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the InfoDetalladoReportePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-detallado-reporte',
  templateUrl: 'info-detallado-reporte.html',
})
export class InfoDetalladoReportePage {

  mes:any;
  dia:any;
  platos=[];
  total:number;
  nombreMes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mes=this.navParams.data.mes;
    this.dia=this.navParams.data.dia;
    this.getReporte();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoDetalladoReportePage');
  }
  getReporte(){
    this.total=0;
    var mesasRef = firebase.database().ref().child("reporte").child(this.mes).child(this.dia);
    mesasRef.on("value",(snap)=>{
      var data = snap.val();
      this.platos=[];      
      for(var key in data){
        this.platos.push(data[key]);   
        this.total=this.total+Number(data[key].precio);    
      }
    });       
  }
}
