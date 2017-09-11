import { Component } from '@angular/core';
import { AppUrls } from '../../services/appurls';
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-mealDetails',
  templateUrl: 'mealDetails.html',
})
export class MealDetails {

  constructor(public navParams: NavParams, public appUrls: AppUrls) { }

meal:any;
mealType:string='veg';
vegRating='3.5';
nonVegRating='4';
vegMenu:string[];
nonVegMenu:string[];

ionViewDidLoad() {
    this.appUrls.isHeaderSet = false;
    this.getMeal().then(data => {
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
    });
}

  getMeal() {
    return new Promise<any>(resolve => {
            console.log(this.navParams.get("meal"));
            resolve(this.navParams.get("meal"));
      });
  }

}
