import { Injectable } from '@angular/core';
import { Platform, ToastController, AlertController, NavController, LoadingController } from 'ionic-angular';
import { Network } from "@ionic-native/network";

@Injectable()
export class CustomeLoader {

 constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController,
             public toastCtrl: ToastController,private platform: Platform) { 
 }

loader:any;
navigator: any;
Connection: any;

toast:any;

presentLoadingUnlimited(msg) {
   this.loader = this.loadingCtrl.create({
      content: msg
    });

    this.loader.present();
  }

  presentToastUnlimited(msg) {
    this.toast = this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      cssClass:'tost-css'
    });
    this.toast.present();
  }

  dismissUnlimitedToast() {
        this.toast.dismiss().catch(() => console.log('ERROR CATCH: Unlimited Toast dismiss'));     
  }

presentLoadingWithLoaderMsg() {
   this.loader = this.loadingCtrl.create({
      content:'Loading...',
      duration: 15000,
      dismissOnPageChange: true
    });
    this.loader.present();
  } 

 presentLoading(msg) {
   this.loader = this.loadingCtrl.create({
      content: msg,
      duration: 15000,
      dismissOnPageChange: true
    });

    this.loader.present();
  }  

  dismissLoading() {
    setTimeout(() => {
        this.loader.dismiss().catch(() => console.log('ERROR CATCH: LoadingController dismiss'));
    },1000);
      
  }

showAlertWithSubTitle(title,subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK'],
      cssClass: title
    });
    alert.present();
}

showAlertOnlyTSubitle(cssClass,title) {
    let alert = this.alertCtrl.create({
      subTitle: title,
      buttons: ['OK'],
      cssClass: cssClass
    });
    alert.present();
}

presentToast(pos, duration, msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: pos,
      duration: duration,
      cssClass:'tost-css'
    });
    toast.present();
  }



  checkNetwork() {
    return navigator.onLine;
  }
}