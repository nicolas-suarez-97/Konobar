import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import firebase from 'firebase';
import { InfoDiaReportePage } from '../info-dia-reporte/info-dia-reporte';

@IonicPage()
@Component({
  selector: 'page-reporte',
  templateUrl: 'reporte.html',
})
export class ReportePage {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('barCanvas') barCanvas;
  doughnutChart: any;
  barChart: any;
  public dias = [];
  meses=[];
  llaves=[];
  nombreMes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dias = [
      { 
        'fecha':'3/10/2018',
        'dia':'Lunes',
        'total':'1000000',
        'platos':[
          {
            'titulo':'Trucha en salsa marinera',
            'src':'assets/imgs/trucha.jpeg',
            'descripcion':'Filetes de trucha preparados a la plancha con finas hierbas seleccionadas por el chef, el plato se acompaña con una ensalada mediterránea y una bebida.',
            'ingredientes':'Lomo de trucha, ajo, perejil, limón, sal, mantequilla, leche, camarones, salsa cremosa, cebolla verde',
            'precio':'18000',
            'cantidad':'10'
          },
          {
            'titulo':'Spaghetti Carbonara',
            'src':'assets/imgs/pasta.jpeg',
            'descripcion':'La especialidad de la casa, Deliciosa pasta basada en la clásica receta italiana con nuestro toque personal. Se sirve acompañado de rodajas de pan, una bebida y queso.',
            'ingredientes':'huevos, queso, aceite de oliva virgen extra, panceta, guanciale y pimienta negra.',
            'precio':'13000',
            'cantidad':'5'
          },      
          {
            'titulo':'Pure',
            'src':'assets/imgs/Foto1.jpeg',
            'descripcion':'',
            'ingredientes':'Papa,esparragos',
            'precio':'12000',
            'cantidad':'12'
          },{
            'titulo':'Hamburguesa triple',
            'src':'assets/imgs/hamburguesa.jpeg',
            'descripcion':'Exquisita hamburguesa preparada por los mejores chefs de Bogotá, tres pisos de carne cubierta en queso fundido y champiñones.',
            'ingredientes':'Carne de res, queso, pan, ajonjolí, vegetales varios (lechuga, tomate, cebolla), y salsas',
            'precio':'15000'
          },
          {
            'titulo':'Bandeja paisa',
            'src':'assets/imgs/bandeja_paisa.jpeg',
            'descripcion':'Deliciosa bandeja paisa, este delicioso platillo típico de Antioquia promete dejarlo extasiado y bastante satisfecho.',
            'ingredientes':'carne molida, frijoles, aguacate, chicharon, huevo, plátano maduro y chorizo',
            'precio':'15000'
          },
          {
            'titulo':'Bistek',
            'src':'assets/imgs/Foto2.jpeg',
            'descripcion':'',
            'ingredientes':'Carne, arroz, ensalada',
            'precio':'18000'
          }
        ]      
      },{ 
        'fecha':'2/10/2018',
        'dia':'Martes',
        'total':'500000',
        'platos':[
          {
            'titulo':'Trucha en salsa marinera',
            'src':'assets/imgs/trucha.jpeg',
            'descripcion':'Filetes de trucha preparados a la plancha con finas hierbas seleccionadas por el chef, el plato se acompaña con una ensalada mediterránea y una bebida.',
            'ingredientes':'Lomo de trucha, ajo, perejil, limón, sal, mantequilla, leche, camarones, salsa cremosa, cebolla verde',
            'precio':'18000',
            'cantidad':'10'
          },
          {
            'titulo':'Spaghetti Carbonara',
            'src':'assets/imgs/pasta.jpeg',
            'descripcion':'La especialidad de la casa, Deliciosa pasta basada en la clásica receta italiana con nuestro toque personal. Se sirve acompañado de rodajas de pan, una bebida y queso.',
            'ingredientes':'huevos, queso, aceite de oliva virgen extra, panceta, guanciale y pimienta negra.',
            'precio':'13000',
            'cantidad':'5'
          },      
          {
            'titulo':'Pure',
            'src':'assets/imgs/Foto1.jpeg',
            'descripcion':'',
            'ingredientes':'Papa,esparragos',
            'precio':'12000',
            'cantidad':'12'
          },{
            'titulo':'Hamburguesa triple',
            'src':'assets/imgs/hamburguesa.jpeg',
            'descripcion':'Exquisita hamburguesa preparada por los mejores chefs de Bogotá, tres pisos de carne cubierta en queso fundido y champiñones.',
            'ingredientes':'Carne de res, queso, pan, ajonjolí, vegetales varios (lechuga, tomate, cebolla), y salsas',
            'precio':'15000'
          },
          {
            'titulo':'Bandeja paisa',
            'src':'assets/imgs/bandeja_paisa.jpeg',
            'descripcion':'Deliciosa bandeja paisa, este delicioso platillo típico de Antioquia promete dejarlo extasiado y bastante satisfecho.',
            'ingredientes':'carne molida, frijoles, aguacate, chicharon, huevo, plátano maduro y chorizo',
            'precio':'15000'
          },
          {
            'titulo':'Bistek',
            'src':'assets/imgs/Foto2.jpeg',
            'descripcion':'',
            'ingredientes':'Carne, arroz, ensalada',
            'precio':'18000'
          }
        ] 
      },{ 
        'fecha':'1/10/2018',
        'dia':'Miercoles',
        'total':'1200000'
      },{ 
        'fecha':'28/09/2018',
        'dia':'Jueves',
        'total':'2000000'
      },{ 
        'fecha':'27/10/2018',
        'dia':'Viernes',
        'total':'300000'
      }

    ]
    this.getReporte();
    console.log(this.meses);  
  }

  ionViewDidLoad() {
    var arrDia = [];
    var arrTot = [];
    for(let dia of this.dias){
      //var suma = 0;
      
        console.log(dia.platos);
        //suma = suma + Number(plato.precio);
            
      arrDia.push(dia.dia);
      arrTot.push(dia.total);
    }

    
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
      type: 'doughnut',
      data: {
          labels: ["Trucha", "Spaguetti", "Pure", "Hamburguesa", "Bandeja Paisa", "Bistek"],
          datasets: [{
              label: 'Platos comprados',
              data: [120, 210, 56, 79, 200, 96],
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
          labels: ["Septiembre","Octubre", "Noviembre"],
          datasets: [{
              label: 'Ventas mensuales $',
              data: [1245000, 1980400, 340200],
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

  itemSelected(item){
    this.navCtrl.push(InfoDiaReportePage,{item:item});
  }
  getReporte(){
    var mesasRef = firebase.database().ref().child("reporte");
    mesasRef.on("value",(snap)=>{
      var data = snap.val();
      this.meses=[];
      this.llaves=[];
      for(var key in data){
        this.meses.push(data[key]);
        this.llaves.push(key);
      }
    });       
  }
}
