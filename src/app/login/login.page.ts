import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertController, ToastController } from "@ionic/angular";

import { LoadingService } from "../_services/loading.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  loggedIn: boolean;

  returnUrl: string;
  error = "";

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loading: LoadingService
  ) {}

  ngOnInit() {}

  async showToastMessage(msg: string, pos: any, col: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: pos,
      color: col,
    });
    toast.present();
    //Todo create interceptor
  }

  submit_login() {
    this.loading.present("Logging you in... Please wait");
  }
}
