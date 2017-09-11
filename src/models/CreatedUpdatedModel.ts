
export class CreatedUpdatedModel {

    private createdBy: string;
public get $createdBy(): string { 
 	 return this.createdBy;
}
public set $createdBy(value: string) { 
 	 this.createdBy=value;
}

private createdAt: string;
public get $createdAt(): string { 
 	 return this.createdAt;
}
public set $createdAt(value: string) { 
 	 this.createdAt=value;
}

private updatedBy: string;
public get $updatedBy(): string { 
 	 return this.updatedBy;
}
public set $updatedBy(value: string) { 
 	 this.updatedBy=value;
}

private updatedAt: string;
public get $updatedAt(): string { 
 	 return this.updatedAt;
}
public set $updatedAt(value: string) { 
 	 this.updatedAt=value;
}
}