import { Component, OnInit, Input } from "@angular/core";

import { NavController } from "@ionic/angular";

@Component({
  selector: "app-product-items",
  templateUrl: "./product-items.component.html",
  styleUrls: ["./product-items.component.scss"],
})
export class ProductItemsComponent implements OnInit {
  @Input() productItems: any[];

  constructor(public navCtrl: NavController) {}

  ngOnInit() {}

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
