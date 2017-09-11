import {
  Component,
  ViewChild
} from '@angular/core';
import {
  Nav,
  Platform,
  Events,
  ModalController
} from 'ionic-angular';
import {
  StatusBar
} from '@ionic-native/status-bar';
import {
  SplashScreen
} from '@ionic-native/splash-screen';
import {
  Storage
} from '@ionic/storage';
import {
  Device
} from '@ionic-native/device';

import {
  Update
} from '../pages/update/update';
import {
  HomePage
} from '../pages/home/home';
import {
  AddMeal
} from '../pages/meal/addMeal';
import {
  ViewMealList
} from '../pages/meal/viewMealList';
import {
  Signin
} from '../pages/signin/signin';
import {
  RequestMembership
} from '../pages/requestMembership/requestMembership';
import {
  Userpage
} from '../pages/userpage/userpage'
import {
  MemberDetails
} from '../pages/memberDetails/memberDetails';
import {
  AppUrls
} from '../services/appurls';

import { Signup } from '../pages/signup/signup';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  userName: string;

  membershipRequest: any;

  pageName: string = 'Home';

  rootPage: any;

  msg: string;

  versionNo: string;

  btnCssClass: string = 'side-menu-button item item-block item-md';

  btnHidden: string = 'side-menu-button item item-block item-md hidden';

  pages: Array < {
    title: string,
    component: any,
    icon: string,
    cssClass: string,
    color: any
  } > ;

  constructor(public platform: Platform, public statusBar: StatusBar, private storage: Storage,
    public splashScreen: SplashScreen, public appUrls: AppUrls, 
    private ev: Events, public modalCtrl: ModalController, public device: Device) {

    this.initializeApp();

    this.ev.subscribe('status_code', status_code => {

      if (status_code == '504') {
        this.msg = 'Server Down ! Please try after sometime.';
      }

      if (status_code == '401') {
        this.msg = 'Session expired ! Please login again.';
        this.nav.setRoot(Signin);
      }

      if (status_code == '0') {
        this.msg = 'Please check your internet connection.';
      }

      this.appUrls.loading.presentToast('bottom', 5000, this.msg);

    });

    this.ev.subscribe('user_name', user_name => {
      this.userName = user_name;
    });


    // used for an example of ngFor and navigation
    this.pages = [
      {
        title: 'Sign In',
        component: Signin,
        icon: '',
        color: '',
        cssClass:this.btnHidden
      },
      {
        title: 'Sign Up',
        component: Signup,
        icon: '',
        color: '',
        cssClass:this.btnHidden
      },
      {
        title: 'Request Mebership',
        component: RequestMembership,
        icon: '',
        color: '',
        cssClass:this.btnHidden
      },
      {
        title: 'Home',
        component: HomePage,
        icon: 'home',
        cssClass:this.btnCssClass,
        color: ''
      },
      {
        title: 'Meal History',
        component: ViewMealList,
        icon: 'restaurant',
        color: '',
        cssClass:this.btnCssClass
      },
      {
        title: 'Profile',
        component: MemberDetails,
        icon: 'person',
        cssClass:this.btnCssClass,
        color: ''
      },
      {
        title: 'Logout',
        component: null,
        icon: 'exit',
        cssClass:this.btnCssClass,
        color: ''
      }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.appUrls.getCurrentVersion().then(vn => {
        this.versionNo = vn;
        this.appUrls.versionNo = vn;
        console.log("Current Version: " + vn);
        this.appUrls.getLatestVersion().then(data => {
          if (data) {
            let updateModal = this.modalCtrl.create(Update, {
              versionDetails: data
            });
            updateModal.present();
          } else {
            console.log("No New Version Available.");

            this.registerBackButton();

            this.statusBar.styleDefault();

            this.storage.ready().then(() => {

              this.storage.get('rp_app_key').then((val) => {
                this.storage.get('user_name').then((username) => {

                  console.log(' app.component.ts Get rp_app_key ====>>> ', val);
                  if (val == null) {
                    this.rootPage = Signin;
                  }
                  if (val) {

                    this.userName = username;
                    this.splashScreen.hide();
                    this.appUrls.authservice.http.appKey = val;
                    if(this.platform.is('cordova')) {
                      this.appUrls.initPushNotification(); 
                    }
                    this.appUrls.getMembershipRequestStatus(false).then(status => {
                      this.membershipRequest = status;
                      if (this.membershipRequest.requestStatus == "ACCEPTED") {
                        console.log("app.component membershipRequestStatus :  ACCEPTED");
                        this.rootPage = HomePage;
                      } else {
                        this.rootPage = RequestMembership;
                      }
                    });
                  }
                });
              });
            });

          }
        });

      });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component) {
      this.nav.setRoot(page.component);
      this.pageName = page.title;
      page.color = 'theam-color';

      for (let p of this.pages) {
        if (p.title == page.title) {
          p.color = 'theam-color';
        } else {
          p.color = '';
        }
      }
    } else {

      let confirm = this.appUrls.loading.alertCtrl.create({
        subTitle: 'Are you sure want to logout?',
        buttons: [{
            text: 'No'
          },
          {
            text: 'Yes',
            handler: () => {
              this.storage.remove('rp_app_key').then((val) => {
                this.nav.setRoot(Signin);
              });
            }
          }
        ],
        cssClass: 'logout-confirm'
      });
      confirm.present();
    }
  }

  registerBackButton() {

    //back button handle
    //Registration of push in Android and Windows Phone
    var lastTimeBackPress = 0;
    var timePeriodToExit = 2000;

    this.platform.registerBackButtonAction(() => {
      // get current active page
      if (this.nav.getActive().component == this.pages[0].component || 
          this.nav.getActive().component == this.pages[1].component ||
          this.nav.getActive().component == this.pages[2].component ||
          this.nav.getActive().component == this.pages[3].component) {
        //Double check to exit app                  
        if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
          this.platform.exitApp(); //Exit from app
        } else {
          this.appUrls.loading.presentToast('bottom', 2000, 'Press back again to exit App !');
          lastTimeBackPress = new Date().getTime();
        }
      } else {
        // go to previous page
        this.nav.pop().catch(() => {
          this.nav.setRoot(HomePage);
        });
        //  this.nav.setRoot(HomePage);
      }
    });
  }


}

// Green - #69C333
// Orange - #EE8C3A
// Light grey bg - #FAFAFA
