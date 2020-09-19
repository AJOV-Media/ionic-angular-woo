import { Component, OnInit } from "@angular/core";

import { environment } from "../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";

import { AlertController, ToastController } from "@ionic/angular";

import { CartCountService } from "../_services/cart_count.services";

import { LoadingService } from "../_services/loading.service";
import WooCommerceRestApi from "woocommerce-api";

@Component({
  selector: "app-product-details",
  templateUrl: "product-details.page.html",
  styleUrls: ["product-details.page.scss"],
})
export class ProductDetailsPage implements OnInit {
  private _message: string;

  WooCommerce: any;
  idProduct: string;
  product: any = {};
  reviews: any[] = [];
  qty: number = 1;

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loading: LoadingService,
    private cartCountService: CartCountService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.product = {
      name: "",
      meta_data: {},
    };

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
    this.idProduct = this.route.snapshot.paramMap.get("id");
    this.loading.present("Loading Product, Please wait");

    this.WooCommerce.getAsync(
      "products/reviews/?product=" + this.idProduct
    ).then(
      (data) => {
        this.reviews = JSON.parse(data.body);
        //console.log(this.reviews);
      },
      (err) => {
        console.log(err);
      }
    );

    this.WooCommerce.getAsync("products/" + this.idProduct)
      .then((response) => {
        this.product = JSON.parse(response.body);
      })
      .catch((error) => {
        console.log("Error Data:", error.response.data);
      })
      .finally(() => {
        this.loading.dismiss();
      });
  }

  productListing() {
    this.router.navigateByUrl("/tabs/products");
  }

  addToCart(productId) {
    let retrieveCartObjects;

    retrieveCartObjects = localStorage.getItem("wooAngularCart");
    let cartObjects = JSON.parse(retrieveCartObjects || "[]");

    if (cartObjects.length > 0) {
      let updateCartObject = {};
      let updatedCartObjects = JSON.parse("[]");
      let alreadyAdded = false;
      for (var i = 0; i < cartObjects.length; i++) {
        if (cartObjects[i].product_id === productId) {
          //if product id is already on the cart
          alreadyAdded = true;
          updateCartObject = {
            product_id: cartObjects[i].product_id,
            howMany: 5,
          };
        } else {
          updateCartObject = {
            product_id: cartObjects[i].product_id,
            howMany: cartObjects[i].howMany,
          };
        }
        updatedCartObjects.push(updateCartObject);
      }
      if (!alreadyAdded) {
        updateCartObject = {
          product_id: productId,
          howMany: 1,
        };
        updatedCartObjects.push(updateCartObject);
        alreadyAdded = false;
      }
      localStorage.setItem(
        "wooAngularCart",
        JSON.stringify(updatedCartObjects)
      );
    } else {
      //only if cart is all empty
      let addCartObject = { product_id: productId, howMany: 1 };
      cartObjects.push(addCartObject);
      localStorage.setItem("wooAngularCart", JSON.stringify(cartObjects));
    }

    this.showAlertMessage(
      "Added to your cart",
      "Your cart has been updated click the cart icon to display whats in cart."
    );
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
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            this.cartCountService.currentCartCounts();
          },
        },
        {
          text: "Okay",
          handler: () => {
            this.cartCountService.currentCartCounts();
          },
        },
      ],
    });
    alert.present();
    //Todo create interceptor
  }
}
