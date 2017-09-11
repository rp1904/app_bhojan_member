import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppUrls } from '../../services/appurls';
import { MealDetails } from '../meal/mealDetails';

import { Userpage } from '../../pages/userpage/userpage'

@Component({
  selector: 'page-viewMealList',
  templateUrl: 'viewMealList.html',
})
export class ViewMealList {

  constructor(public navCtrl: NavController, public appUrls: AppUrls, public navParams: NavParams){

            }

pageNo:number = 1;
noOfMeals:number = 20;
isComplete:boolean = false;

memberMeals:any = [];
isMealListEmpty:boolean;


ionViewDidLoad() {
    this.appUrls.isHeaderSet = true;
    this.loadMeals(this.pageNo,this.noOfMeals,true);
}

  loadMeals(pageNo,noOfMeals,loading) {
      return new Promise(resolve => {
      this.appUrls.getMeals(pageNo,noOfMeals,loading).then(data => {
            if(data) {
                this.isMealListEmpty = false;
                for(let memberMeal of data) {
                    this.memberMeals.push(memberMeal);
                }
                
                this.isComplete = (data.length < this.noOfMeals) ? true : false;
                
            } else{
                this.isMealListEmpty = true;
                this.isComplete = true;
            }
        });
    });
  }

  
 doInfinite(infiniteScroll: any) {
    console.log('Begin async operation');
     setTimeout(() => {
        this.pageNo+=1;
        this.loadMeals(this.pageNo,this.noOfMeals,false).then(()=>{
            infiniteScroll.complete();
        });
    },500);
  }

 mealDetails(meal) {
         this.navCtrl.push(MealDetails, { meal:meal });
 }

    
}
