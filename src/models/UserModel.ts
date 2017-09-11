import { UserProfileModel } from './UserProfileModel';

export class UserModel {

private userIdPk: string;
public get $userIdPk(): string { 
 	 return this.userIdPk;
}
public set $userIdPk(value: string) { 
 	 this.userIdPk=value;
}

private userId: string;
public get $userId(): string { 
 	 return this.userId;
}
public set $userId(value: string) { 
 	 this.userId=value;
}

private email: string;
public get $email(): string { 
 	 return this.email;
}
public set $email(value: string) { 
 	 this.email=value;
}

private mobileNumber: string;
public get $mobileNumber(): string { 
 	 return this.mobileNumber;
}
public set $mobileNumber(value: string) { 
 	 this.mobileNumber=value;
}

private password: string;
public get $password(): string { 
 	 return this.password;
}
public set $password(value: string) { 
 	 this.password=value;
}

private confirmPassword: string;
public get $confirmPassword(): string { 
 	 return this.confirmPassword;
}
public set $confirmPassword(value: string) { 
 	 this.confirmPassword=value;
}

private accoutNonExpired: boolean;
public get $accoutNonExpired(): boolean { 
 	 return this.accoutNonExpired;
}
public set $accoutNonExpired(value: boolean) { 
 	 this.accoutNonExpired=value;
}

private credentialsNonExpired: boolean;
public get $credentialsNonExpired(): boolean { 
 	 return this.credentialsNonExpired;
}
public set $credentialsNonExpired(value: boolean) { 
 	 this.credentialsNonExpired=value;
}

private accoutNonLocker: boolean;
public get $accoutNonLocker(): boolean { 
 	 return this.accoutNonLocker;
}
public set $accoutNonLocker(value: boolean) { 
 	 this.accoutNonLocker=value;
}

private enable: boolean;
public get $enable(): boolean { 
 	 return this.enable;
}
public set $enable(value: boolean) { 
 	 this.enable=value;
}

//----------------------------------------------------------------------------

private userProfile: UserProfileModel = new UserProfileModel();
public get $userProfile(): UserProfileModel { 
 	 return this.userProfile;
}
public set $userProfile(value: UserProfileModel) { 
 	 this.userProfile=value;
}

}