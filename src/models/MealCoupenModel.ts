
import { CreatedUpdatedModel } from './CreatedUpdatedModel';

export class MealCoupenModel {

private coupenId: string;
public get $coupenId(): string { 
 	 return this.coupenId;
}
public set $coupenId(value: string) { 
 	 this.coupenId=value;
}

private noOfMeals: number;
public get $noOfMeals(): number { 
 	 return this.noOfMeals;
}
public set $noOfMeals(value: number) { 
 	 this.noOfMeals=value;
}

private validity: number;
public get $validity(): number { 
 	 return this.validity;
}
public set $validity(value: number) { 
 	 this.validity=value;
}

private amount: number;
public get $amount(): number { 
 	 return this.amount;
}
public set $amount(value: number) { 
 	 this.amount=value;
}

//**********************************************************************
private createdUpdated: CreatedUpdatedModel = new CreatedUpdatedModel();
public get $createdUpdated(): CreatedUpdatedModel { 
 	 return this.createdUpdated;
}
public set $createdUpdated(value: CreatedUpdatedModel) { 
 	 this.createdUpdated=value;
}

}