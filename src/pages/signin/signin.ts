import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { checkFirstCharacterValidator } from '../../validators/customValidators';
import { AuthService } from '../../services/authservice';
import { AppUrls } from '../../services/appurls';
import { UserModel } from '../../models/UserModel';
import { Signup } from '../signup/signup';
import { HomePage } from '../home/home';
import { RequestMembership } from '../requestMembership/requestMembership';
import { Http,Headers } from '@angular/http';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class Signin {

authForm : FormGroup;

  constructor(public navCtrl: NavController, public appUrls: AppUrls, private menu: MenuController,
              public authservice: AuthService, public params: NavParams, fb: FormBuilder) {

          this.authForm = fb.group({
            'emailOrMobileNo' : [null, Validators.compose([Validators.required])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])] //, checkFirstCharacterValidator(/^\d/i)
          })  
  }


online:boolean;

response:any;

membershipRequest:any;

  
   ionViewDidLoad() {
  
    this.menu.swipeEnable(false, 'sideMenu');
  
    this.online = this.appUrls.loading.checkNetwork();
      if(this.params.get("registration") == "Success") {
        this.appUrls.loading.showAlertOnlyTSubitle("Success","Registration Successfull !");
      }
  }

  login(value: any):void{

   let loginModel={
        emailOrMobileNumber:value.emailOrMobileNo,
        password:value.password
      }

      if(!loginModel.emailOrMobileNumber || loginModel.emailOrMobileNumber.trim() == "") {
            this.appUrls.loading.presentToast("bottom",2000,"Please enter Email / Mobile No.");
            return;
      }

      if(!loginModel.password || loginModel.password.trim() == "") {
            this.appUrls.loading.presentToast("bottom",2000,"Please enter password.");
            return;
      }

        this.authservice.login(loginModel).then(data => {
          console.log(data);
            if(data) {
              this.response=data;    
              if(this.response.responseType=="Success") {

                    this.appUrls.initPushNotification();

                     this.appUrls.getMembershipRequestStatus(false).then(status => {
                       this.membershipRequest = status;
                        if(this.membershipRequest.requestStatus == "ACCEPTED") {
                            console.log("membershipRequestStatus :  ACCEPTED");
                            this.navCtrl.setRoot(HomePage);
                        } else{
                            this.navCtrl.setRoot(RequestMembership);
                        }
                });
               }
            }
    });
  }

  signup() {
    this.navCtrl.push(Signup);
  }
 

  forgotPassword() {
   
  // let alert = this.appUrls.loading.alertCtrl.create({
  //   title: 'Reset Password',
  //   inputs: [
  //     {
  //       id: 'registeredEmail',
  //       name: 'registeredEmail',
  //       placeholder: 'Registered Email',
  //       type: 'email',
  //     },
  //     {
  //       name: 'otp',
  //       placeholder: 'OTP',
  //       type: 'number',
  //     }
  //   ],
  //   buttons: [
  //     {
  //       text: 'Reset',
  //       handler: data => {
  //         console.log("Send Reset Req");
  //         if(data) {

  //           this.appUrls.loading.presentToast('middle',3000,'Invalid Email !');

  //           return false;
             
  //         } else {
  //             return false;
  //         }
  //       }
  //     },
  //     {
  //       text: 'OTP',
  //       handler: data => {
  //         console.log('OTP');
  //       }
  //     },
  //     {
  //       text: 'Cancel',
  //       role: 'cancel',
  //       handler: data => {
  //         console.log('Cancel clicked');
  //       }
  //     }
  //   ]
  // });
  // alert.present();
  }
}

