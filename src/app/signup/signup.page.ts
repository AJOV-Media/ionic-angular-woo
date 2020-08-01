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

  checkEmail = () => {
    let validEmail = false;
    let reg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (reg.test(this.newUser.email)) {
      this.WooCommerce.getAsync("customers?email=" + this.newUser.email)
        .then((response) => {
          let resdetails = JSON.parse(response.body);
          if (resdetails[0].email) {
            this.showToastMessage(
              "This email is not available",
              "top",
              "danger"
            );
            this.emailAlreadyRegistered = true;
          }
        })
        .catch((error) => {
          console.log("Error Data:", error.response);
        })
        .finally(() => {
          if (!this.emailAlreadyRegistered) {
            this.showToastMessage(
              "Email is available, you can use this email address",
              "top",
              "success"
            );
          }
        });
    } else {
      validEmail = false;

      this.showToastMessage(
        "Invalid Email Format. Please check.",
        "top",
        "danger"
      );

      console.log(validEmail);
    }
  };

  signup = () => {
    let customerData = {
      customer: {},
    };

    customerData.customer = {
      email: this.newUser.email,
      first_name: this.newUser.first_name,
      last_name: this.newUser.last_name,
      username: this.newUser.username,
      password: this.newUser.password,
      billing: {
        first_name: this.newUser.first_name,
        last_name: this.newUser.last_name,
        company: "",
        address_1: this.newUser.billing_address.address_1,
        address_2: this.newUser.billing_address.address_2,
        city: this.newUser.billing_address.city,
        state: this.newUser.billing_address.state,
        postcode: String(this.newUser.billing_address.postcode),
        country: this.newUser.billing_address.country,
        email: this.newUser.email,
        phone: this.newUser.billing_address.phone,
      },
      shipping: {
        first_name: this.newUser.first_name,
        last_name: this.newUser.last_name,
        company: "",
        address_1: this.newUser.shipping.address_1,
        address_2: this.newUser.shipping.address_2,
        city: this.newUser.shipping.city,
        state: this.newUser.shipping.state,
        postcode: String(this.newUser.shipping.postcode),
        country: this.newUser.shipping.country,
      },
    };

    if (this.billing_shipping_same) {
      this.newUser.shipping = this.newUser.shipping;
    }

    // Create a customer
    this.loading.present("Creating your account, Please wait");

    this.WooCommerce.postAsync("customers", customerData.customer)
      .then((response) => {
        console.log(JSON.parse(response));
        this.showAlertMessage(
          "Account Created",
          "Your account has been created successfully, Please verify your account"
        );
      })
      .catch((error) => {
        this.showToastMessage(error.response.data, "top", "danger");
      })
      .finally(() => {
        this.loading.dismiss();
      });
  };
}
