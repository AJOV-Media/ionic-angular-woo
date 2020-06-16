import { Component, OnInit  } from '@angular/core';

import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

import {  AlertController, ToastController } from '@ionic/angular';

import { LoadingService } from '../_services/loading.service';
import WooCommerceRestApi from "woocommerce-api";

@Component({
    selector: 'app-product-details',
    templateUrl: 'product-details.page.html',
    styleUrls: ['product-details.page.scss'],
 })

export class ProductDetailsPage implements OnInit  {
    private _message: string;	
	
    WooCommerce: any;
    idProduct: string;
    product: any = {};
    reviews: any[] = [];
    qty: number = 1;

    constructor(public alertCtrl: AlertController, 
                public toastCtrl: ToastController,                 
                public loading: LoadingService,
                private route: ActivatedRoute,
                private router: Router) {
     
       this.product = {
          name : '',
          meta_data: {}
       }

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
        this.idProduct = this.route.snapshot.paramMap.get('id');

        this.loading.present("Loading Product, Please wait");
       
        this.WooCommerce.getAsync("products/" + this.idProduct + "/reviews").then( (data) => {
            //console.log(JSON.parse(data.body));
            this.reviews = JSON.parse(data.body);
            console.log(this.reviews);
          },(err) => {
            console.log(err);
          }) 
       
          this.WooCommerce.getAsync('products/'+this.idProduct)
          .then( (response) => {
              console.log("Product: ", response.data);
              this.product = response.data; 
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
}