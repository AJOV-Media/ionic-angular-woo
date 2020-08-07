import { Injectable } from "@angular/core";
import { HttpParams, HttpHeaders, HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";

import { environment } from "../../environments/environment";

import { map } from "rxjs/operators";

import User from "../_interfaces/user";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUserFullinfoSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;
  public currentUserFullInfo: Observable<any>;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUserFullinfoSubject = new BehaviorSubject<any>({});
    this.currentUserFullInfo = this.currentUserFullinfoSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentUserFullinfoValue(): any {
    return this.currentUserFullinfoSubject.value;
  }

  public get loggedIn(): boolean {
    let currentUser = this.currentUserValue;
    if (currentUser && currentUser.token) {
      return true;
    }
    return false;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  private httpPostOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    }),
  };

  getUserInfo() {
    return this.http
      .post<any>(`${environment.apiUrl}wp-json/wpuser/v1/loggedinuser`, {})
      .pipe(
        map((user) => {
          this.currentUserFullinfoSubject.next(user.data);
          return user;
        })
      );
  }

  login(username: string, password: string) {
    const params = new HttpParams()
      .set("username", username)
      .set("password", password);

    return this.http
      .post<any>(
        `${environment.apiUrl}wp-json/jwt-auth/v1/token`,
        params,
        this.httpPostOptions
      )
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          //Log local storage on success login
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.authStatusListener.next(true);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.currentUserFullinfoSubject.next(null);
  }
}
