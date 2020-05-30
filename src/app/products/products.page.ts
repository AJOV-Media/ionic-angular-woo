import { Component, OnInit  } from '@angular/core';

import { environment } from '../../environments/environment';

import {  AlertController, ToastController } from '@ionic/angular';

import { LoadingService } from '../_services/loading.service';
import WooCommerceRestApi from "woocommerce-api";

@Component({
  selector: 'app-products',
  templateUrl: 'products.page.html',
  styleUrls: ['products.page.scss']
})
export class ProductsPage implements OnInit {

  WooCommerce: any;
  products: any[];
  page: number;
  category: any;

  constructor(public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public loading: LoadingService, 
             ) {
     
      this.page = 1;

      this.WooCommerce = new WooCommerceRestApi({
        url: environment.apiUrl,
        consumerKey:  environment.consumerKey,
        consumerSecret:  environment.consumerSecret,
        version: "wc/v3",
        wpAPI: true,
        wpAPIPrefix: "wp-json",
        verifySsl: environment.verifySSL,
        queryStringAuth: true  
      }); 

  }

    ngOnInit() { 
      
      this.loading.present("Loading Products, Please wait");
      this.WooCommerce.getAsync('products'+ "&page=" + this.page)
      .then( (response) => {

          console.log("Products: ", response.data);
          
          this.products = response.data;
          this.loading.dismiss();

      })
      .catch((error) => {
          console.log("Error Data:", error.response.data);
          this.loading.dismiss();

      })
      .finally(() => {
         
          
      });
    }

    async showToastMessage(msg: string, pos: any, col: string) {
	    const toast = await this.toastCtrl.create({
	      message: msg,
	      duration: 2000,
	      position: pos,
	      color: col,
	    });
	    toast.present();
	    //Todo create interceptor
  }

  async showAlertMessage(title: string, msg: string) {

      const alert = await this.alertCtrl.create({
            header: title,
            message: msg,
            buttons: [
                          {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: (blah) => {
                              console.log('Confirm Cancel: blah');
                            }
                          }, {
                            text: 'Okay',
                            handler: () => {
                              console.log('Confirm Okay');
                            }
                          }
                        ]
          });
      alert.present();
      //Todo create interceptor
  }

  loadMoreProducts(event){
    this.page++;

    this.WooCommerce.get('products', {'page': this.page })
      .then( (response) => {

          let temp = this.products;
          this.products = this.products.concat(response.data);
          event.complete();

          if(temp.length < 10) {
              event.enable(false);

             this.showToastMessage('No More Products!!', 'top', 'danger');

          }

      })
      .catch((error) => {
          console.log("Error Data:", error.response.data);
          event.complete();

      })
      .finally(() => {
         
          
      });

  }

  mapImage(image){

    let imagePath = "";

    if(image === undefined){
     // console.log("No Image");
      imagePath = "noimagepath";
    } else {
      //Get only featured image

      let imageName = image.src.split('/').slice(-1)[0];
      let imageExplode = imageName.split('.');
      let imageRename = imageExplode[0]+'-100x100.'+imageExplode[1];

      let index = image.src.split('/').indexOf(imageName);

      let urlArray = image.src.split('/');

      urlArray.splice(index, 1); 

      let finalUrl = urlArray.join('/') + '/' + imageRename;

      imagePath =  finalUrl;
    
    }

    return imagePath;
  }

}
