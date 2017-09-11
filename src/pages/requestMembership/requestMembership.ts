import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Signin } from '../signin/signin';
import { AuthService } from '../../services/authservice';
import { AppUrls } from '../../services/appurls';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';



@Component({
  selector: 'page-requestMembership',
  templateUrl: 'requestMembership.html',
})
export class RequestMembership {

  constructor(public navCtrl: NavController,public appUrls: AppUrls, public params: NavParams) {
        
  }

membershipRequest:any;
isRequestPending = false;
isRequestRejected = false;
urlImage='';
messCode:string;

 ionViewDidLoad() {
   this.checkRequestStatus();
  }

makeMemberShipRequest(messCode) {
  if(!messCode || messCode.trim()==""){
    this.appUrls.loading.showAlertOnlyTSubitle("Error","Please enter mess code !");
  } else {
        this.appUrls.makeMemberShipRequest(messCode.trim(),true).then(data => {
              if(data) {
                  this.isRequestPending = true;
                  this.membershipRequest = data;
                  console.log('this.membershipRequest: '+this.membershipRequest.mess.messName);
              } else {
                  this.isRequestPending = false;
                  this.appUrls.loading.showAlertOnlyTSubitle("Error","Invalid Mess Code !");
              }
          });
     }
  }

checkRequestStatus() {
    this.appUrls.getMembershipRequestStatus(true).then(status =>{
          this.membershipRequest = status;
          if(this.membershipRequest.requestStatus == "ACCEPTED") {
              console.log("membershipRequestStatus :  ACCEPTED");
              // this.appUrls.loading.showAlertOnlyTSubitle("Success","Your Request Is Accepted !");
              this.navCtrl.setRoot(HomePage);
          } 
          if(this.membershipRequest.requestStatus == "PENDING") {
            console.log("membershipRequestStatus :  PENDING");
            this.appUrls.loading.presentToast("top",5000,"Your Request Is Still Pending !");
            this.isRequestPending = true;
            this.isRequestRejected = false;
          }
          if(this.membershipRequest.requestStatus == "REJECTED") {
            console.log("membershipRequestStatus :  REJECTED");
             this.isRequestPending = false;
             this.isRequestRejected = true;
          }
       });
  }

  newReq() {
    this.isRequestPending = false;
    this.isRequestRejected = false;
  }

  goToLogin() {
    this.navCtrl.setRoot(Signin);  
  }

}