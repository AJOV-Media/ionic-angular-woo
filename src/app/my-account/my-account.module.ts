import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MyAccountPage } from "./my-account.page";

import { MyAccountPageRoutingModule } from "./my-account-routing.module";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, MyAccountPageRoutingModule],
  declarations: [MyAccountPage],
})
export class MyAccountPageModule {}
