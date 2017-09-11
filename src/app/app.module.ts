import { BrowserModule } from '@angular/platform-browser';
import { Device } from '@ionic-native/device';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from "@ionic-native/network";
import { IonicStorageModule } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

import { MyApp } from './app.component';
import { EnvironmentsModule } from './environment-variables/environment-variables.module';
import { HttpModule } from '@angular/http';
import { Update } from '../pages/update/update';
import { HomePage } from '../pages/home/home';
import { RequestMembership } from '../pages/requestMembership/requestMembership';
import { ViewMealList } from '../pages/meal/viewMealList';
import { MealDetails } from '../pages/meal/mealDetails';
import { Signup } from '../pages/signup/signup';
import { Signin } from '../pages/signin/signin';
import { Userpage } from '../pages/userpage/userpage'
import { MemberDetails } from '../pages/memberDetails/memberDetails';

import { AppUrls } from '../services/appurls';
import { AuthService } from '../services/authservice';
import { HttpClient } from '../services/httpClient';
import { CustomeLoader } from '../services/loader';

import { UserModel } from '../models/UserModel';
import { MealModel } from '../models/MealModel';
import { MealCoupenModel } from '../models/MealCoupenModel';
import { UserProfileModel } from '../models/UserProfileModel';
import { MessModel } from '../models/MessModel';
import { AddressModel } from '../models/AddressModel';
import { CreatedUpdatedModel } from '../models/CreatedUpdatedModel';
import { MembershipRequestModel } from '../models/MembershipRequestModel';
import { FCMDeviceModel } from '../models/FCMDeviceModel';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Ionic2RatingModule } from 'ionic2-rating';
import { Push } from '@ionic-native/push';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Update,
    RequestMembership,
    ViewMealList,
    MealDetails,
    MemberDetails,
    Signup,
    Signin,
    Userpage
  ],
  imports: [
    EnvironmentsModule,
    HttpModule,
    BrowserModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    //   IonicModule.forRoot(MyApp, {
    //     scrollAssist: false, 
    //     autoFocusAssist: false
    // })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Update,
    RequestMembership,
    ViewMealList,
    MealDetails,
    MemberDetails,
    Signup,
    Signin,
    Userpage
  ],
  providers: [
    Network,
    AppVersion,
    Device,
    File,
    FileOpener,
    FileTransfer, 
    FileTransferObject,
    BarcodeScanner,
    HttpClient,
    MembershipRequestModel,
    CreatedUpdatedModel,
    AddressModel,
    UserModel,
    UserProfileModel,
    MealModel,
    MessModel,
    MealCoupenModel,
    FCMDeviceModel,
    AuthService,
    AppUrls,    
    CustomeLoader,
    StatusBar,
    SplashScreen,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
