import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppUrls } from '../../services/appurls';

@Component({
  selector: 'page-memberDetails',
  templateUrl: 'memberDetails.html',
})
export class MemberDetails {

  constructor(public navCtrl: NavController, public appUrls:AppUrls, public navParams: NavParams) {
  }

memberMealCoupen:any;
isMemberDetailsLoaded:Boolean=false;

  ionViewDidLoad() {
      this.getMyDetails();
  }

  getMyDetails() {
       this.appUrls.getMyDetails(true).then(data => {
        if(data) {
            this.isMemberDetailsLoaded=true;
            this.memberMealCoupen=data;
        }
     });
  }

  changePassword() {

    let alert = this.appUrls.loading.alertCtrl.create({
    title: 'Change Password',
    inputs: [
      {
        name: 'oldPassword',
        placeholder: 'Old Password',
        type: 'password',
      },
      {
        name: 'newPassword',
        placeholder: 'New Password',
        type: 'password',
      },
      {
        name: 'cNewPassword',
        placeholder: 'Confirm New Password',
        type: 'password',
      }
    ],
    buttons: [
      {
        text: 'Change',
        handler: data => {
          if(data.oldPassword.trim() != '' || data.cNewPassword.trim() != '' || data.newPassword.trim() != '') {

             if(data.oldPassword.length < 5) {
                 this.appUrls.loading.presentToast('middle',3000,'Invalid Old Password !');
                 return false;
             }
             
             if(data.newPassword.length < 5) {
                 this.appUrls.loading.presentToast('middle',3000,'Password length should not be less than 5 !');
                 return false;
             }


             if(data.newPassword != data.cNewPassword) {
                 this.appUrls.loading.presentToast('middle',4000,'New Password and confirm password does not match !');
                 return false;
             }
            
            this.appUrls.changePassword(data.oldPassword,data.newPassword,true).then(result => {
                this.appUrls.loading.showAlertOnlyTSubitle(result.responseType,result.message);
            });
             
          } else {
              return false;
          }
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  alert.present();

  }

}
