import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authservice';
import { Signin } from '../signin/signin';
import { UserModel } from '../../models/UserModel';
import { AppUrls } from '../../services/appurls';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

 constructor(public navCtrl: NavController, public authservice: AuthService, private menu: MenuController,
             public altCtrl: AlertController, public userModel: UserModel,
             public appUrls: AppUrls, public params: NavParams, fb: FormBuilder) {

    this.memberSignUpForm = fb.group({
        // 'messName' : [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        // 'addrLine1' : [null, Validators.compose([Validators.required])],
        // 'addrLine2' : [null],
        // 'city' : [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        // 'state' : [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        // 'pincode' : [null, Validators.compose([Validators.required, Validators.pattern('[0-9]{6}')])],
        'firstName' : [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        'lastName' : [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        'email' : [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        'mobileNo' : [null, Validators.compose([Validators.required, Validators.pattern('([7-9]{1})([0-9]{9})')])]
        // 'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
        // 'confirmPassword': [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    })  
  }

isFormValid:boolean = true;
memberSignUpForm : FormGroup;
response:any;
private member = this.userModel;

 ionViewDidLoad() {
    this.menu.swipeEnable(false, 'sideMenu');
}

    signup(memberForm){

    if(!this.memberSignUpForm.valid) {
        this.isFormValid = false;
        return;
      } else {
          this.isFormValid = true;
      }

        this.appUrls.loading.presentLoading("Registering...");

        this.member.$userProfile.$firstName = memberForm.firstName;
        this.member.$userProfile.$lastName = memberForm.lastName;
        this.member.$email = memberForm.email;
        this.member.$mobileNumber = memberForm.mobileNo;
        // this.member.$password = memberForm.password;

        this.appUrls.authservice.registerMember(this.member).then(data => {
         if(data) {
            this.appUrls.loading.dismissLoading();
            this.response = data;
            if(this.response.responseType == "Error") {
                this.appUrls.loading.showAlertOnlyTSubitle(this.response.responseType,this.response.message);
            } else {
                this.navCtrl.push(Signin, { registration:"Success" });
            }
            
        }
        });
    }

    signin() {
        this.navCtrl.push(Signin);
    }
}

