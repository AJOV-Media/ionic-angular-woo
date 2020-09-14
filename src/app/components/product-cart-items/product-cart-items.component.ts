import { Component, OnInit, Input } from "@angular/core";

import { NavController } from "@ionic/angular";

@Component({
  selector: "app-product-cart-items",
  templateUrl: "./product-cart-items.component.html",
  styleUrls: ["./product-cart-items.component.scss"],
})
export class ProductCartItemsComponent implements OnInit {
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

  updateCart = (event, productId) => {
    const retrieveCartObjects = localStorage.getItem("wooAngularCart");
    const cartObjects = JSON.parse(retrieveCartObjects || "[]");

    if (cartObjects.length > 0) {
      let updateCartObject = {};
      const updatedCartObjects = JSON.parse("[]");
      let alreadyAdded = false;
      for (let i = 0; i < cartObjects.length; i++) {
        if (cartObjects[i].product_id === productId) {
          //if product id is already on the cart
          alreadyAdded = true;
          updateCartObject = {
            product_id: cartObjects[i].product_id,
            howMany: Number(event.detail.value),
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
          howMany: Number(event.detail.value),
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
      const addCartObject = {
        product_id: productId,
        howMany: Number(event),
      };
      cartObjects.push(addCartObject);
      localStorage.setItem("wooAngularCart", JSON.stringify(cartObjects));
    }
  };
}
