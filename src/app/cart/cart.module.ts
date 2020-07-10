import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CartPage } from "./cart.page";

import { CartPageRoutingModule } from "./cart-routing.module";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, CartPageRoutingModule],
  declarations: [CartPage],
})
export class CartPageModule {}
