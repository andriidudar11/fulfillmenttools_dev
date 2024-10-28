import { Listing } from '../dto';
import { HttpService } from './http.service';
import { requireAuth } from './../decorators';

export class ListingService {
    @requireAuth()
    public static async createListings(
        facilityId: string,
        listings: Listing[]
    ) {
        const url = HttpService.buildUrl(
            `api/facilities/${facilityId}/listings`
        );

        const body = {
            listings: [...listings],
        };

        const res = await HttpService.put(url, JSON.stringify(body));

        return res.json();
    }

    @requireAuth()
    public static async getAllListings(facilityId: string): Promise<Listing[]> {
        const url = HttpService.buildUrl(
            `api/facilities/${facilityId}/listings`
        );

        const res = await HttpService.get(url);
        return <Promise<Listing[]>>res.json();
    }

    @requireAuth()
    public static async deleteListing(
        facilityId: string,
        tenantArticleId: string
    ) {
        const url = HttpService.buildUrl(
            `api/facilities/${facilityId}/listings/${tenantArticleId}`
        );

        const res = await HttpService.delete(url);
        return res;
    }
}
