
import { AddressModel } from './AddressModel';


export class UserProfileModel {

    private userProfileIdPk: string;
    public get $userProfileIdPk(): string { 
        return this.userProfileIdPk;
    }
    public set $userProfileIdPk(value: string) { 
        this.userProfileIdPk=value;
    }

    private firstName: string;
    public get $firstName(): string { 
        return this.firstName;
    }
    public set $firstName(value: string) { 
        this.firstName=value;
    }

    private lastName: string;
    public get $lastName(): string { 
        return this.lastName;
    }
    public set $lastName(value: string) { 
        this.lastName=value;
    }

    private profileImageUrl: string;
    public get $profileImageUrl(): string { 
        return this.profileImageUrl;
    }
    public set $profileImageUrl(value: string) { 
        this.profileImageUrl=value;
    }

    private profileImageThumbnailUrl: string;
    public get $profileImageThumbnailUrl(): string { 
        return this.profileImageThumbnailUrl;
    }
    public set $profileImageThumbnailUrl(value: string) { 
        this.profileImageThumbnailUrl=value;
    }
    
//----------------------------------------------------------------------------

    private address: AddressModel = new AddressModel();
    public get $address(): AddressModel { 
        return this.address;
    }
    public set $address(value: AddressModel) { 
        this.address=value;
    }
}