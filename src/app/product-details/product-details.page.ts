import { Component, OnInit  } from '@angular/core';

import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

import {  AlertController, ToastController } from '@ionic/angular';

import { LoadingService } from '../_services/loading.service';
import WooCommerceRestApi from "woocommerce-api";

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.page.html',
    styleUrls: ['./product-details.page.scss'],
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
    
    }
}