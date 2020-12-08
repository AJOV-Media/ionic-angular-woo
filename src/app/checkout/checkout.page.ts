import { Component } from "@angular/core";
import { environment } from "../../environments/environment";
import WooCommerceRestApi from "woocommerce-api";

@Component({
  selector: "app-checkout",
  templateUrl: "checkout.page.html",
  styleUrls: ["checkout.page.scss"],
})
export class CheckoutPage {
  newOrder: any = {};
  billing_shipping_same: boolean;
  WooCommerce: any;

  constructor() {
    this.newOrder.billing_address = {};
    this.newOrder.shipping = {};
    this.billing_shipping_same = false;

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
}
