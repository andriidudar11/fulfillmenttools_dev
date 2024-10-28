import { LocationType } from '../enums/location-type.enum';
import { ServiceType, FacilityStatus } from '../types';

export interface FacilityCreatedResponse {
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
    ];
    status: FacilityStatus;
    locationType: LocationType;
    fulfillmentProcessBuffer: number;
    capacityEnabled: boolean;
    created: string;
    lastModified: string;
    version: number;
    id: string;
}
