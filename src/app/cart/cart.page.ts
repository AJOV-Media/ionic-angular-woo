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
  totalPrice: number;

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

    this.products = [];
  }
  ngOnInit() {
    this.getCartProducts();
  }

  getCartProducts() {
    let retrieveCartObjects;
    this.totalPrice = 0.0;

    retrieveCartObjects = localStorage.getItem("wooAngularCart");
    let cartObjects = JSON.parse(retrieveCartObjects || "[]");

    if (cartObjects.length > 0) {
      for (var i = 0; i < cartObjects.length; i++) {
        let qty = cartObjects[i].howMany;
        this.WooCommerce.getAsync("products/" + cartObjects[i].product_id)
          .then((response) => {
            this.loading.present("Loading Products, Please wait");
            let bodyProducts = JSON.parse(response.body);
            bodyProducts.qty = qty;
            this.totalPrice += qty * bodyProducts.price;
            this.products = this.products.concat(bodyProducts);
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
