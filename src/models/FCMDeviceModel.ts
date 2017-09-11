
import { CreatedUpdatedModel } from './CreatedUpdatedModel';

export class FCMDeviceModel {

private deviceId: string;
public get $deviceId(): string { 
 	 return this.deviceId;
}
public set $deviceId(value: string) { 
 	 this.deviceId=value;
}

private fcmToken: string;
public get $fcmToken(): string { 
 	 return this.fcmToken;
}
public set $fcmToken(value: string) { 
 	 this.fcmToken=value;
}

private cordova: string;
public get $cordova(): string { 
 	 return this.cordova;
}
public set $cordova(value: string) { 
 	 this.cordova=value;
}

private model: string;
public get $model(): string { 
 	 return this.model;
}
public set $model(value: string) { 
 	 this.model=value;
}

private platform: string;
public get $platform(): string { 
 	 return this.platform;
}
public set $platform(value: string) { 
 	 this.platform=value;
}

private version: string;
public get $version(): string { 
 	 return this.version;
}
public set $version(value: string) { 
 	 this.version=value;
}

private uuid: string;
public get $uuid(): string { 
 	 return this.uuid;
}
public set $uuid(value: string) { 
 	 this.uuid=value;
}

private manufacturer: string;
public get $manufacturer(): string { 
 	 return this.manufacturer;
}
public set $manufacturer(value: string) { 
 	 this.manufacturer=value;
}

private isVirtual: boolean;
public get $isVirtual(): boolean { 
 	 return this.isVirtual;
}
public set $isVirtual(value: boolean) { 
 	 this.isVirtual=value;
}

private serial: string;
public get $serial(): string { 
 	 return this.serial;
}
public set $serial(value: string) { 
 	 this.serial=value;
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