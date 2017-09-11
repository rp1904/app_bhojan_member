import { CreatedUpdatedModel } from './CreatedUpdatedModel';

export class MealModel {
private mealId: string;
public get $mealId(): string { 
 	 return this.mealId;
}
public set $mealId(value: string) { 
 	 this.mealId=value;
}

private mealTitle: string;
public get $mealTitle(): string { 
 	 return this.mealTitle;
}
public set $mealTitle(value: string) { 
 	 this.mealTitle=value;
}

private status: string;
public get $status(): string { 
 	 return this.status;
}
public set $status(value: string) { 
 	 this.status=value;
}

private vegDefaultMenu: string;
public get $vegDefaultMenu(): string { 
 	 return this.vegDefaultMenu;
}
public set $vegDefaultMenu(value: string) { 
 	 this.vegDefaultMenu=value;
}

private vegItems: string;
public get $vegItems(): string { 
 	 return this.vegItems;
}
public set $vegItems(value: string) { 
 	 this.vegItems=value;
}

private vegExtra: string;
public get $vegExtra(): string { 
 	 return this.vegExtra;
}
public set $vegExtra(value: string) { 
 	 this.vegExtra=value;
}

private sweet: string;
public get $sweet(): string { 
 	 return this.sweet;
}
public set $sweet(value: string) { 
 	 this.sweet=value;
}

private vegRating: string;
public get $vegRating(): string { 
 	 return this.vegRating;
}
public set $vegRating(value: string) { 
 	 this.vegRating=value;
}

private nonVegRating: string;
public get $nonVegRating(): string { 
 	 return this.nonVegRating;
}
public set $nonVegRating(value: string) { 
 	 this.nonVegRating=value;
}

private isNonVeg: Boolean;
public get $isNonVeg(): Boolean { 
 	 return this.isNonVeg;
}
public set $isNonVeg(value: Boolean) { 
 	 this.isNonVeg=value;
}

private nonVegDefaultMenu: string;
public get $nonVegDefaultMenu(): string { 
 	 return this.nonVegDefaultMenu;
}
public set $nonVegDefaultMenu(value: string) { 
 	 this.nonVegDefaultMenu=value;
}

private nonVegItems: string;
public get $nonVegItems(): string { 
 	 return this.nonVegItems;
}
public set $nonVegItems(value: string) { 
 	 this.nonVegItems=value;
}

private nonVegExtra: string;
public get $nonVegExtra(): string { 
 	 return this.nonVegExtra;
}
public set $nonVegExtra(value: string) { 
 	 this.nonVegExtra=value;
}

private note: string;
public get $note(): string { 
 	 return this.note;
}
public set $note(value: string) { 
 	 this.note=value;
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