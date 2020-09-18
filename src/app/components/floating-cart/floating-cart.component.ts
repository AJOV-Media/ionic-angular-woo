import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CartCountService } from "../../_services/cart_count.services";

@Component({
  selector: "floating-cart",
  templateUrl: "./floating-cart.component.html",
  styleUrls: ["./floating-cart.component.scss"],
})
export class FloatingCartComponent implements OnInit, OnDestroy {
  cartCount: number = 0;
  subscription: Subscription;

  constructor(private cartCountService: CartCountService) {}

  setCartCount = () => {
    let retrieveCartObjects;

    retrieveCartObjects = localStorage.getItem("wooAngularCart");
    let cartObjects = JSON.parse(retrieveCartObjects || "[]");

    if (cartObjects.length > 0) {
      this.cartCount = cartObjects.length;
    }
  };
  ngOnInit() {
    this.cartCountService.currentCartCounts();
    this.subscription = this.cartCountService.cartCounts.subscribe(
      (theCartCount) => {
        if (theCartCount) {
          this.cartCount = theCartCount;
        }
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
