import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { Chart } from 'chart.js';
import { InfoDetalladoReportePage } from '../info-detallado-reporte/info-detallado-reporte';

/**
 * Generated class for the InfoDiaReportePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-dia-reporte',
  templateUrl: 'info-dia-reporte.html',
})
export class InfoDiaReportePage {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('barCanvas') barCanvas;
  doughnutChart: any;
  barChart: any;
  mes:any;
  nombreMes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  dias=[];  
  totales=[];  
  cantidad=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mes=this.navParams.data.item;
    this.getReporte();
    console.log(this.cantidad);
  }

  ionViewDidLoad() {
       
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
      type: 'doughnut',
      data: {
          labels: this.dias,// ["Trucha", "Spaguetti", "Pure", "Hamburguesa", "Bandeja Paisa", "Bistek"],
          datasets: [{
              label: 'Platos Vendidos por Día',
              data: this.cantidad,// [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'


              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]
      }

    });

    
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
          labels: this.dias,//["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
          datasets: [{
              label: 'Ventas diarias $',
              data:  this.totales,//[12, 19, 3, 5, 2, 3,21],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }

    });
  }
 
  getReporte(){
    var mesasRef = firebase.database().ref().child("reporte").child(this.mes);
    mesasRef.on("value",(snap)=>{
      var data = snap.val();
      this.dias=[];      
      this.totales=[];      
      this.cantidad=[];
      for(var key in data){
        this.dias.push(key);  
        
        var aux = firebase.database().ref().child("reporte").child(this.mes).child(key);
        aux.on("value",(snap)=>{
          var aux2 = snap.val();
          var con = 0;
          var con2 = 0;
          for(var x in aux2){
            con=con+Number(aux2[x].precio);
            con2 = con2+1;
          }
          this.totales.push(con);
          console.log(con2);
          this.cantidad.push(con2);
        })
      }
    });       
  }
  itemSelected(dia){
    this.navCtrl.push(InfoDetalladoReportePage,{dia:dia,mes:this.mes})
  }
}
