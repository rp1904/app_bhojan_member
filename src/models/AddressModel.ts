

export class AddressModel {

private addressIdPk: string;
public get $addressIdPk(): string { 
 	 return this.addressIdPk;
}
public set $addressIdPk(value: string) { 
 	 this.addressIdPk=value;
}

private country: string;
public get $country(): string { 
 	 return this.country;
}
public set $country(value: string) { 
 	 this.country=value;
}

private state: string;
public get $state(): string { 
 	 return this.state;
}
public set $state(value: string) { 
 	 this.state=value;
}

private city: string;
public get $city(): string { 
 	 return this.city;
}
public set $city(value: string) { 
 	 this.city=value;
}

private addressLine1: string;
public get $addressLine1(): string { 
 	 return this.addressLine1;
}
public set $addressLine1(value: string) { 
 	 this.addressLine1=value;
}

private addressLine2: string;
public get $addressLine2(): string { 
 	 return this.addressLine2;
}
public set $addressLine2(value: string) { 
 	 this.addressLine2=value;
}

private pinCode: string;
public get $pinCode(): string { 
 	 return this.pinCode;
}
public set $pinCode(value: string) { 
 	 this.pinCode=value;
}

}