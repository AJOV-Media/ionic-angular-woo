import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CartPage } from "./cart.page";

import { CartPageRoutingModule } from "./cart-routing.module";
import { ProductCartItemsComponent } from "../components/product-cart-items/product-cart-items.component";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, CartPageRoutingModule],
  declarations: [CartPage, ProductCartItemsComponent],
})
export class CartPageModule {}
