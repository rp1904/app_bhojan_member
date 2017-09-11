import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/authservice';
import { AppUrls } from '../../services/appurls';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Events } from 'ionic-angular';


@Component({
  selector: 'page-userpage',
  templateUrl: 'userpage.html',
})
export class Userpage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, 
              public loading: LoadingController,public appUrls: AppUrls,
              public platform: Platform, private barcodeScanner: BarcodeScanner) {
        
        this.platform = platform;
  }

urlImage='';

res:any;


ionViewDidLoad() {
  this.generate();
}

generate() {
      this.appUrls.getLastGeneratedActiveMealCode(true).then(data => {
        this.res=data;
        if(data) {
                if(this.res.responseType == "Error") {
                  this.appUrls.loading.showAlertOnlyTSubitle("Error",this.res.message);
                } else {
                      this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.res.message)
                      .then ((success) => {
                        this.urlImage = success.file;
                      }), (error) => {
                        this.appUrls.loading.showAlertOnlyTSubitle("Error",error);
                      }
                }
            } else {
                this.appUrls.loading.showAlertOnlyTSubitle("Error",data);
            }
    });
  }

}
