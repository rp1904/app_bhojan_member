import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { AuthService } from '../../services/authservice';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AppUrls } from '../../services/appurls';
import { Userpage } from '../userpage/userpage';
import { Signup } from '../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loading: LoadingController,public appUrls: AppUrls,
              private barcodeScanner: BarcodeScanner) {
        

  }

urlImage='';

res:any;

meal:any;
mealType:string='veg';
vegRating='3.5';
nonVegRating='4';

vegMenu:string[];
nonVegMenu:string[];


ionViewDidLoad() {

    this.appUrls.getActiveMealDetails(true).then(data => {
        
        if(data.responseType != 'Error') {
          this.meal=data;
          this.vegMenu = data.vegDefaultMenu.split(",");

          for (let item of data.vegItems.split(",")) {
            this.vegMenu.push(item);
          }
          for (let item of data.vegExtra.split(",")) {
            this.vegMenu.push(item);
          }
          
          if(data.isNonVeg) {
  
              this.nonVegMenu = data.nonVegDefaultMenu.split(",");
  
              for (let item of data.nonVegItems.split(",")) {
                this.nonVegMenu.push(item);
              }
              for (let item of data.nonVegExtra.split(",")) {
                this.nonVegMenu.push(item);
              }
          }
        }
    });
}

generate(meal_type) {
      this.appUrls.getLastGeneratedActiveMealCode(true).then(data => {
        this.res=data;
        // this.showUpdatedDetails();
        if(data) {
                if(this.res.responseType == "Error") {
                  this.appUrls.loading.showAlertOnlyTSubitle("Error",this.res.message);
                } else {
                      this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.res.message + "==" + meal_type)
                      .then ((success) => {
                        console.log();
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

  showUpdatedDetails() {
    console.log("In showUpdatedDetails()");
        setTimeout(() => {
            this.appUrls.getMyDetails(true).then(updatedData => {
               console.log("Is Recentlty Updated"+ (updatedData.createdUpdated.updatedAt > new Date(Date.now() - 20000)));
            if(updatedData.createdUpdated.updatedAt > new Date(Date.now() - 20000)) {
                    this.appUrls.loading.showAlertOnlyTSubitle("Success",
                    "Remaining Meals " + updatedData.remainingMealCount + 
                    ", Expires On " + updatedData.expiryDate);
              }
            });
      }, 5000,); 
  }
 

}

