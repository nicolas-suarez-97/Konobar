import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { ImagePicker } from '@ionic-native/image-picker';


@IonicPage()
@Component({
  selector: 'page-agregar-plato',
  templateUrl: 'agregar-plato.html',
})
export class AgregarPlatoPage {
  nombre:string="";
  precio:number=0;
  ingredientes:string="";
  categoria:string="";
  descripcion:string="";
  src:any;  
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera) {  
  }


  ionViewDidLoad() {    
  }
  
  agregar(){
    if(this.nombre!="" && this.precio!=0){
      var platoRef = firebase.database().ref().child("platos");
      platoRef.push({nombre:this.nombre,precio:this.precio,descripcion:this.descripcion,ingredientes:this.ingredientes,categoria:this.categoria,src:this.src,rating:"5"});      
      
      this.navCtrl.pop();
    }
  }

  async takePhoto(){
    try{
      
      const options: CameraOptions = {
        quality:50,
        targetHeight:600,
        targetWidth:600,
        destinationType:this.camera.DestinationType.DATA_URL,
        encodingType:this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE
        
      }
      const result = await this.camera.getPicture(options);

      const pictures = storage().ref('pictures/photo');
      const image = `data:image/jpeg;base64,${result}`;
      pictures.putString(image,'data_url');
     
      this.src=pictures.getDownloadURL().then((url)=> {
        console.log(url);
        return url;
      });
      console.log(this.src);
    }
    catch(e){
      console.log(e);
    }
  }

  aux(){

  }
}
