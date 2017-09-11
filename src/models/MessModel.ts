import { UserModel } from './UserModel';
import { AddressModel } from './AddressModel';
import { CreatedUpdatedModel } from './CreatedUpdatedModel';

export class MessModel {

private messIdPk: string;
public get $messIdPk(): string { 
 	 return this.messIdPk;
}
public set $messIdPk(value: string) { 
 	 this.messIdPk=value;
}

private messId: string;
public get $messId(): string { 
 	 return this.messId;
}
public set $messId(value: string) { 
 	 this.messId=value;
}

private messName: string;
public get $messName(): string { 
 	 return this.messName;
}
public set $messName(value: string) { 
 	 this.messName=value;
}

private messTagLine: string;
public get $messTagLine(): string { 
 	 return this.messTagLine;
}
public set $messTagLine(value: string) { 
 	 this.messTagLine=value;
}

private messProfileImageUrl: string;
public get $messProfileImageUrl(): string { 
 	 return this.messProfileImageUrl;
}
public set $messProfileImageUrl(value: string) { 
 	 this.messProfileImageUrl=value;
}

private messProfileImageThumbnailUrl: string;
public get $messProfileImageThumbnailUrl(): string { 
 	 return this.messProfileImageThumbnailUrl;
}
public set $messProfileImageThumbnailUrl(value: string) { 
 	 this.messProfileImageThumbnailUrl=value;
}

//**********************************************************************
private messOwner: UserModel = new UserModel();
public get $messOwner(): UserModel { 
 	 return this.messOwner;
}
public set $messOwner(value: UserModel) { 
 	 this.messOwner=value;
}

//**********************************************************************
private messAddress: AddressModel = new AddressModel();
public get $messAddress(): AddressModel { 
 	 return this.messAddress;
}
public set $messAddress(value: AddressModel) { 
 	 this.messAddress=value;
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