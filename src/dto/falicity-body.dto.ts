import { LocationType } from '../enums/location-type.enum';
import { FacilityStatus, ServiceType } from '../types';

export interface FacilityBody {
    name: string;
    address: {
        companyName: string;
        country: string;
        postalCode: string;
        city: string;
        street: string;
        houseNumber: string;
    };
    services: [
        {
            type: ServiceType;
        },
        {
            type: ServiceType;
        }?,
    ];
    status: FacilityStatus;
    locationType: LocationType;
    tenantFacilityId: string;
}
