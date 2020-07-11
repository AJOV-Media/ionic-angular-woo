import { Component, OnInit } from "@angular/core";

import { environment } from "../../environments/environment";

import { LoadingService } from "../_services/loading.service";
import WooCommerceRestApi from "woocommerce-api";

@Component({
  selector: "app-cart",
  templateUrl: "cart.page.html",
  styleUrls: ["cart.page.scss"],
})
export class CartPage implements OnInit {
  WooCommerce: any;
  products: any[];

  constructor(public loading: LoadingService) {
    this.WooCommerce = new WooCommerceRestApi({
      url: environment.apiUrl,
      consumerKey: environment.consumerKey,
      consumerSecret: environment.consumerSecret,
      version: "wc/v3",
      wpAPI: true,
      wpAPIPrefix: "wp-json",
      verifySsl: environment.verifySSL,
      queryStringAuth: true,
    });
  }
  ngOnInit() {}

  getCartProducts() {
    let retrieveCartObjects;

    retrieveCartObjects = localStorage.getItem("wooAngularCart");
    let cartObjects = JSON.parse(retrieveCartObjects || "[]");

    if (cartObjects.length > 0) {
      for (var i = 0; i < cartObjects.length; i++) {
        this.WooCommerce.getAsync("products/" + cartObjects[i].product_id)
          .then((response) => {
            this.loading.present("Loading Products, Please wait");
            this.products = this.products.concat(JSON.parse(response.body));
          })
          .catch((error) => {
            console.log("Error Data:", error);
          })
          .finally(() => {
            this.loading.dismiss();
          });
      }
    }
  }
}
