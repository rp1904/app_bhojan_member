import { UserModel } from './UserModel';
import { MessModel } from './MessModel';
import { CreatedUpdatedModel } from './CreatedUpdatedModel';

export class MembershipRequestModel {

private membershipRequestIdPk: string;
public get $membershipRequestIdPk(): string { 
 	 return this.membershipRequestIdPk;
}
public set $membershipRequestIdPk(value: string) { 
 	 this.membershipRequestIdPk=value;
}

//***********************************
private member: UserModel = new UserModel();
public get $member(): UserModel { 
 	 return this.member;
}
public set $member(value: UserModel) { 
 	 this.member=value;
}

//***********************************
private mess: MessModel = new MessModel();
public get $mess(): MessModel { 
 	 return this.mess;
}
public set $mess(value: MessModel) { 
 	 this.mess=value;
}

//***********************************

private requestStatut : string;
public get $requestStatus(): string { 
 	 return this.requestStatut;
}
public set $requestStatus(value: string) { 
 	 this.requestStatut=value;
}



//***********************************
private createdUpdated: CreatedUpdatedModel = new CreatedUpdatedModel();
public get $createdUpdated(): CreatedUpdatedModel { 
 	 return this.createdUpdated;
}
public set $createdUpdated(value: CreatedUpdatedModel) { 
 	 this.createdUpdated=value;
}


}