import { requireAuth } from '../decorators';
import { FacilityBody, FacilityUpdate } from '../dto';
import { FacilityCreatedResponse } from '../dto/facility-created-response.dto';
import { LocationType } from '../enums/location-type.enum';
import { HttpService } from './http.service';

export class FacilityService {
    @requireAuth()
    public static async createFacility(
        tenantFacilityId: string,
        facility: FacilityBody,
    ): Promise<FacilityCreatedResponse> {
        const url = HttpService.buildUrl('api/facilities');

        const res = await HttpService.post(url, JSON.stringify(facility));

        return <Promise<FacilityCreatedResponse>>res.json();
    }

    @requireAuth()
    public static async updateFacility(facilityId: string, version: number) {
        const url = HttpService.buildUrl(`api/facilities/${facilityId}`);

        const body: FacilityUpdate = {
            actions: [
                {
                    action: 'ModifyFacility',
                    name: 'Andriis Pickup Shop',
                    status: 'OFFLINE',
                    // services: [
                    //   {
                    //     type: 'PICKUP'
                    //   },
                    // ]
                },
            ],
            version,
        };

        const res = await HttpService.patch(url, JSON.stringify(body));

        return <Promise<FacilityCreatedResponse>>res.json();
    }

    @requireAuth()
    public static async deleteFacility(facilityId: string) {
        const url = HttpService.buildUrl(`api/facilities/${facilityId}`);

        const res = await HttpService.delete(url);

        return res;
    }

    public static getDefaultEntity(tenantFacilityId: string): FacilityBody {
        return {
            name: 'Andriis Pickup Shop',
            address: {
                companyName: 'Andriis Shop Ltd.',
                country: 'DE',
                postalCode: '12345',
                city: 'M\xFCnchen',
                street: 'Lilienstr.',
                houseNumber: '57',
            },
            services: [
                // {
                //   type: 'SHIP_FROM_STORE'
                // },
                {
                    type: 'PICKUP',
                },
            ],
            tenantFacilityId,
            status: 'ONLINE',
            locationType: LocationType.STORE,
        };
    }
}
