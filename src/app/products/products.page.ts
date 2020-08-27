import { Component, OnInit } from "@angular/core";

import { environment } from "../../environments/environment";

import {
  NavController,
  AlertController,
  ToastController,
} from "@ionic/angular";

import { LoadingService } from "../_services/loading.service";
import WooCommerceRestApi from "woocommerce-api";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "products.page.html",
  styleUrls: ["products.page.scss"],
})
export class ProductsPage implements OnInit {
  WooCommerce: any;
  moreProducts: any[];
  products: any[];
  page: number;
  category: any;

  constructor(
    private route: ActivatedRoute,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loading: LoadingService
  ) {
    this.page = 1;

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
    let searchKey = this.route.snapshot.params.searchKey;
    let searchValue = this.route.snapshot.params.searchValue;

    this.loadMoreProducts(null);
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
    //Todo create interceptor
  }

  loadMoreProducts(event) {
    if (event == null) {
      this.moreProducts = [];
    } else {
      this.page++;
    }
    this.loading.present("Loading Products, Please wait");

    this.WooCommerce.getAsync("products" + "?page=" + this.page)
      .then((response) => {
        let temp = JSON.parse(response.body).length;
        this.moreProducts = this.moreProducts.concat(JSON.parse(response.body));

        if (temp < 10) {
          event.target.disabled = true; //Disable the infinite scroll
          this.showToastMessage("No More Products!!", "top", "danger");
        } else {
          this.showToastMessage(
            temp + " Products Loaded!!",
            "bottom",
            "success"
          );
        }
      })
      .catch((error) => {
        console.log("Error Data:", error);
      })
      .finally(() => {
        if (event != null) {
          event.target.complete();
        }
        this.loading.dismiss();
      });
  }

  mapImage(image) {
    let imagePath = "";

    if (image === undefined) {
      imagePath = "noimagepath";
    } else {
      //Get only featured image
      let imageName = image.src.split("/").slice(-1)[0];
      let imageExplode = imageName.split(".");
      let imageRename = imageExplode[0] + "-100x100." + imageExplode[1];

      let index = image.src.split("/").indexOf(imageName);

      let urlArray = image.src.split("/");

      urlArray.splice(index, 1);

      let finalUrl = urlArray.join("/") + "/" + imageRename;

      imagePath = finalUrl;
    }

    return imagePath;
  }

  openProductPage(product) {
    this.navCtrl.navigateForward("/tabs/product-details/" + product);
  }
}
