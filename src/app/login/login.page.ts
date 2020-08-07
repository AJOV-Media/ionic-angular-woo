import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertController, ToastController } from "@ionic/angular";

import { first } from "rxjs/operators";

import { AuthenticationService, LoadingService } from "../_services";

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
    public loading: LoadingService,
    private router: Router,
    private authenticationService: AuthenticationService
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

    this.authenticationService
      .login(this.username, this.password)
      .pipe(first())
      .subscribe(
        (data) => {
          this.returnUrl = "/tabs/products";
          this.loading.dismiss();
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.error = error;
          let message = "Unknown Error!";
          if (error == "[jwt_auth] incorrect_password") {
            message = "Incorrect Password!";
          } else if ("[jwt_auth] invalid_email") {
            message = "Invalid Email Address!";
          }

          this.showToastMessage(message, "top", "danger");
          this.loading.dismiss();
        }
      );
  }
}
