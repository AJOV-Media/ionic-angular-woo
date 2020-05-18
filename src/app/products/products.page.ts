import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';

import { NavController, AlertController, ToastController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';


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

    
  }

}
