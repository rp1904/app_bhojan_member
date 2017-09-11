import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { CustomeLoader } from './loader';
import { Events } from 'ionic-angular';


@Injectable()
export class HttpClient {

appKey:string;

  constructor(public http: Http, public storage: Storage, public loading: CustomeLoader, public events:Events) {
   
  }

  createAuthorizationHeader(headers: Headers) {

      headers.append('Content-Type', 'application/json');
      headers.append('rp-app-key', this.appKey);
      console.log(' HttpClient createAuthorizationHeader rp_app_key ====>>> ', this.appKey);
 }

  get(url, showLoading) {
    if(showLoading) {
      this.loading.presentLoadingWithLoaderMsg();
    }    
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    }).catch((err: Response, caught: Observable<any>) => {
      console.log("In httpClient get:==========>>>> "+err);
      this.events.publish('status_code', err.status);
      return Observable.throw(caught);
    }).finally(()=> {
        console.log('This is get finally block');
      if(showLoading) {
        this.loading.dismissLoading();
      }
        
    });
  }

  post(url, data, showLoading) {
    if(showLoading) {
      this.loading.presentLoadingWithLoaderMsg();
    }
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    }).catch((err: Response, caught: Observable<any>) => {
      console.log("In httpClient post:==========>>>> "+err);
       this.loading.showAlertOnlyTSubitle("Error","Err: "+ err);
      this.events.publish('status_code', err.status);
      return Observable.throw(caught);
    }).finally(()=> {
        console.log('This is post finally block');
        if(showLoading) {
          this.loading.dismissLoading();
        }
    });
  }

}