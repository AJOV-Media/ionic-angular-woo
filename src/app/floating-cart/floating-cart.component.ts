import { Component, OnInit } from "@angular/core";

@Component({
  selector: "floating-cart",
  templateUrl: "./floating-cart.component.html",
  styleUrls: ["./floating-cart.component.scss"],
})
export class FloatingCartComponent implements OnInit {
  cartCount: number = 0;

  setCartCount = () => {
    let retrieveCartObjects;

    retrieveCartObjects = localStorage.getItem("wooAngularCart");
    let cartObjects = JSON.parse(retrieveCartObjects || "[]");

    if (cartObjects.length > 0) {
      this.cartCount = cartObjects.length;
    }
  };
  ngOnInit() {
    this.setCartCount();
  }
}
