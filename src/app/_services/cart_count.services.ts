import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CartCountService {
  private cartCountSubject: BehaviorSubject<number>;
  public currentCartCount: Observable<number>;

  constructor() {
    this.cartCountSubject = new BehaviorSubject<number>(0);
    this.currentCartCount = this.cartCountSubject.asObservable();
  }

  public get cartCounts(): any {
    return this.currentCartCount;
  }

  currentCartCounts() {
    let retrieveCartObjects;

    retrieveCartObjects = localStorage.getItem("wooAngularCart");
    let cartObjects = JSON.parse(retrieveCartObjects || "[]");

    if (cartObjects.length > 0) {
      this.cartCountSubject.next(cartObjects.length);
    }
  }
}
