import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';

import { NavController, AlertController, ToastController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../_services/loading.service';

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";



@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  	
  WooCommerce: any;
  products: any[];
  page: number;
  category: any;


  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController, 
              public toastCtrl: ToastController,
              public loading: LoadingService, 
  	          public http: HttpClient, ) {  

    this.page = 1;

    this.WooCommerce = new WooCommerceRestApi({
      url: environment.apiUrl,
      consumerKey:  environment.consumerKey,
      consumerSecret:  environment.consumerSecret,
      version: "wc/v3",
      verifySsl: environment.verifySSL,
      queryStringAuth: true  
    }); 

  }



  ngOnInit() {
     
    this.loading.present("Loading Products, Please wait");
    this.WooCommerce.get('products', {'page': this.page })
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

}
