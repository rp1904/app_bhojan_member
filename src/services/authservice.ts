import { Injectable,Inject } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { CustomeLoader } from './loader';
import { HttpClient } from './httpClient';
import { Events } from 'ionic-angular';
import { EnvVariables } from '../app/environment-variables/environment-variables.token';

@Injectable()
export class AuthService {

  rp_app_key: string = null;

  public baseURL: string = this.env.apiEndpoint;
  
  public loginUrl: string = this.baseURL+"unguarded/login/member";
  public memberRegistrationUrl: string = this.baseURL + "unguarded/registration/member-registration";

  constructor(public events: Events, public http: HttpClient, public loading: CustomeLoader, @Inject(EnvVariables) public env) {


  }

  login(inputData) {
    this.loading.presentLoading("Authenticating...");
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise(resolve => {
      this.http.http.post(this.loginUrl, inputData)
        .subscribe(data => {
            if (data.json().responseType == "Success") {
               this.http.storage.set('rp_app_key', data.json().rp_app_key).then((key) => {
                 this.http.storage.set('user_name', data.json().user.userProfile.fullName).then((username) => {
                    this.http.appKey = key;
                    this.events.publish('user_name', username);
                    resolve(data.json());
                });
              });
            }

          },
          err => {
            this.loading.dismissLoading();
            console.log("Error status : " + err.status);
            var obj = JSON.parse(err._body);
            console.log("Error status : " + obj.responseType);
            this.loading.showAlertOnlyTSubitle(obj.responseType, obj.message);
            resolve(err);
          }
        );
    });
  }

    registerMember(user) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise(resolve => {
      this.http.http.post(this.memberRegistrationUrl, user, {
          headers: headers
        })
        .map((res: Response) => res.json())
        .subscribe(data => {
            resolve(data);
          },
          err => {
            console.log("Error status : " + JSON.stringify(err.json()));
            console.log("Error status : " + err.json().customeFieldErrors);
          }
        );
    }).catch(function (response) {
      console.log("In Catch Error : " + response.responseType);
      console.log("Error status : " + response.status);
    });


  }



}
