import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CheckoutPage } from "./checkout.page";

import { CheckoutPageRoutingModule } from "./checkout-routing.module";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, CheckoutPageRoutingModule],
  declarations: [CheckoutPage],
})
export class CheckoutPageModule {}
