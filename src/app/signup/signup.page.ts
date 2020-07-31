import { Component, OnInit } from "@angular/core";

import { environment } from "../../environments/environment";

import { AlertController, ToastController } from "@ionic/angular";

import { LoadingService } from "../_services/loading.service";

import WooCommerceRestApi from "woocommerce-api";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  newUser: any = {};
  billing_shipping_same: boolean;
  WooCommerce: any;

  submitted = false;
  emailAlreadyRegistered = false;
  returnUrl: string;
  error = "";

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loading: LoadingService
  ) {
    this.newUser.billing_address = {};
    this.newUser.shipping = {};
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

  setBillingToShipping = () =>
    (this.billing_shipping_same = !this.billing_shipping_same);

  ngOnInit() {}

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
      header: "Account Created",
      message:
        "Your account has been created successfully! Please login to proceed.",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Okay",
          handler: () => {
            console.log("Confirm Okay");
          },
        },
      ],
    });
    alert.present();
  }

  signup = () => {
    //call sign up here
  };
}
