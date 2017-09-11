import {
  Injectable
} from '@angular/core';
import {
  Http,
  Headers,
  Response
} from '@angular/http';
import {
  AuthService
} from './authservice';
import {
  CustomeLoader
} from './loader';
import 'rxjs/Rx';

import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import { FCMDeviceModel } from '../models/FCMDeviceModel';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Injectable()
export class AppUrls {

  public registerDeviceUrl: string = this.authservice.baseURL + "api/register-device/member";
  public memberDetailsUrl: string = this.authservice.baseURL + "api/member/my-details";
  public requestMembershipUrl: string = this.authservice.baseURL + "api/membershiprequest/make";
  public isMembershipRequestStatusUrl: string = this.authservice.baseURL + "api/membershiprequest/check";
  public getLastGeneratedActiveMealCodeUrl: string = this.authservice.baseURL + "api/meal-code/get";
  public allMealsUrl: string = this.authservice.baseURL + "api/member/meals";
  public memberProfileUrl: string = this.authservice.baseURL + "api/member/profile";
  public changePasswordUrl: string = this.memberProfileUrl + "/update-password";
  public activeMealUrl: string = this.allMealsUrl + "/active";
  public memberVersionCheckUrl: string = this.authservice.baseURL + "unguarded/version-check/member";


  constructor(public http: Http, public authservice: AuthService, public loading: CustomeLoader,
              public device:Device, public appVersion:AppVersion, 
              public push: Push) {}

  isHeaderSet:Boolean=false;
  
  versionNo:string;

  changePassword(oldPassword,newPassword,showLoading) {

    return new Promise<any>(resolve => {
      this.authservice.http.post(this.changePasswordUrl, {password:oldPassword,confirmPassword:newPassword}, showLoading).subscribe(data => {
        if (data.json()) {
          resolve(data.json());
        } else {
          resolve(false);
        }
      });
    });
  }

  getMyDetails(showLoading) {

    return new Promise<any>(resolve => {
      this.authservice.http.get(this.memberDetailsUrl, showLoading).subscribe(data => {
        if (data.json()) {
          resolve(data.json());
        } else {
          resolve(false);
        }
      });
    });
  }

 getActiveMealDetails(showLoading) {
    return new Promise<any>(resolve => {
      this.authservice.http.get(this.activeMealUrl, showLoading).subscribe(data => {
        if (data.json().responseType != "Error") {
          resolve(data.json()[0]);
        } else {
          resolve(false);
        }
      });
    });
  }

 getMealDetailsById(mealId, showLoading) {
    return new Promise<any>(resolve => {
      this.authservice.http.get(this.allMealsUrl + "/" + mealId, showLoading).subscribe(data => {
        if (data.json()) {
          resolve(data.json());
        } else {
          resolve(false);
        }
      });
    });
  }

  getMeals(pageNo, limit, showLoading) {
    return new Promise<any>(resolve => {
      this.authservice.http.get(this.allMealsUrl + "/" + pageNo + "/" + limit, showLoading).subscribe(data => {
          resolve(data.json());
      });
    });
  }

  makeMemberShipRequest(messCode, showLoading) {
    return new Promise<any>(resolve => {
      this.authservice.http.post(this.requestMembershipUrl, messCode, showLoading).subscribe(data => {
          if (data.json().membershipRequestIdPk) {
            resolve(data.json());
          } else
            resolve(false);
        });
    });
  }

  getMembershipRequestStatus(showLoading) {
    return new Promise(resolve => {
      this.authservice.http.get(this.isMembershipRequestStatusUrl, showLoading).subscribe(data => {  
          resolve(data.json());
      });
    });
  }


  getLastGeneratedActiveMealCode(showLoading) {

    return new Promise(resolve => {
      this.authservice.http.get(this.getLastGeneratedActiveMealCodeUrl,showLoading).subscribe(data => {
          resolve(data.json());
      });
    });
  }

  registerDevice(token) {

    let fcmDevice = new FCMDeviceModel();

    fcmDevice.$fcmToken = token;
    fcmDevice.$cordova = this.device.cordova;
    fcmDevice.$platform = this.device.platform;
    fcmDevice.$version = this.device.version;
    fcmDevice.$uuid = this.device.uuid;
    fcmDevice.$manufacturer = this.device.manufacturer;
    fcmDevice.$model = this.device.model;
    fcmDevice.$serial = this.device.serial;
    fcmDevice.$isVirtual = this.device.isVirtual;

    // this.loading.showAlertOnlyTSubitle("Success","FCM Device: "+fcmDevice.$fcmToken);
    
    this.authservice.http.post(this.registerDeviceUrl,JSON.stringify(fcmDevice),false).subscribe(data => {
        console.log(data.json());
    });
  

  }

  getLatestVersion() {
    
     return new Promise<any>(resolve => {
            console.log("Env: " + this.authservice.env.ionicEnvName);

            if(this.authservice.env.ionicEnvName == 'dev') {
              resolve(false);
            } else {
                this.authservice.http.http.get(this.memberVersionCheckUrl).subscribe(data => {
                  console.log("Latest Version: " + data.json().version);
                    if (data.json().version > this.versionNo) {
                      resolve(data.json());
                    } else {
                      resolve(false);
                    }
              });
            }
      });   
  }

  
    getCurrentVersion() {
      return new Promise<string>(resolve => {
         console.log("Env: " + this.authservice.env.ionicEnvName);

            if(this.authservice.env.ionicEnvName == 'dev') {
                  resolve('0.0.0');
            } else {
              this.appVersion.getVersionNumber().then(vn => {
                  resolve(vn);
              });
            }
      });
    }

    initPushNotification() {

    this.push.hasPermission()
    .then((res: any) => {
    if (res.isEnabled) {
    console.log('We have permission to send push notifications');
    } else {
    console.log('We don\'t have permission to send push notifications');
    }
    });

    // to initialize push notifications
    const options: PushOptions = {
    android: {
    senderID: '206906286896'},
    ios: {
    alert: 'true',
    badge: true,
    sound: 'false'
    },
    windows: {}
    };
    const pushObject: PushObject = this.push.init(options);
    pushObject.on('notification').subscribe((notification: any) =>{
    console.log('Received a notification', notification);
    //Notification Display Section
    let confirmAlert = this.loading.alertCtrl.create({
    title: notification.title,
    message: notification.message,
    buttons: [{
    text: 'Ignore',
    role: 'cancel'
    }, {
    text: 'View',
    handler: () => {
    //TODO: Your logic here
    //self.nav.push(DetailsPage, {message: data.message});
    }
    }]
    });
    confirmAlert.present();
    //
    });
    pushObject.on('registration').
    subscribe((registration: any) => {
      this.registerDevice(registration.registrationId);
      console.log('Device registered', registration.registrationId);
    });
    pushObject.on('error').
    subscribe(error => 
    console.error('Error with Push plugin', error));
}
  
}