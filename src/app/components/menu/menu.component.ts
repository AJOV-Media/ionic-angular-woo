import { Component, OnInit } from "@angular/core";

import { environment } from "../../../environments/environment";
import { AuthenticationService } from "../../_services";

import WooCommerceRestApi from "woocommerce-api";
import { Subscription } from "rxjs";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  WooCommerce: any;
  categories: any[];
  subscriptionAuth: Subscription;
  userInfo: any;

  constructor(private authenticationService: AuthenticationService) {
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

  ngOnInit() {
    if (this.authenticationService.loggedIn) {
      this.userInfo = this.authenticationService.currentUserValue;
    }

    this.WooCommerce.getAsync("products/categories")
      .then((response) => {
        this.categories = JSON.parse(response.body);
      })
      .catch((error) => {
        console.log("Error Data:", error);
      })
      .finally(() => {});
  }
}
