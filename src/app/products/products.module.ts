import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProductsPage } from "./products.page";

import { ProductsPageRoutingModule } from "./products-routing.module";
import { ProductItemsComponent } from "../components/product-items/product-items.component";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ProductsPageRoutingModule],
  declarations: [ProductsPage, ProductItemsComponent],
})
export class ProductsPageModule {}
