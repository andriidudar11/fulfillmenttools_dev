import { AuthResponse, AuthRefreshResponse, Listing } from '../dto';
import { FacilityCreatedResponse } from '../dto/facility-created-response.dto';
import { AuthService } from './auth.service';
import { FacilityService } from './facility.service';
import { HandoverService } from './handover.service';
import { ListingService } from './listing.service';
import { OrderService } from './order.service';
import { PackService } from './pack.service';
import { PickService } from './pick.service';
import { StockService } from './stock.service';

const tenantArticleId = '1234';
const tenantFacilityId = 'K12347';
const tenantOrderId = 'R456728553';

export class ClientService {
    public static async main() {
        /**
         * Facility creation
         */
        // const facility = await FacilityService.createFacility(tenantFacilityId);
        // const { id: facilityId } = facility;
        const facilityId = 'a0a7c407-df0f-4721-a19e-3c495047482b';

        console.log('facility');
        // console.log(facility);
        console.log(facilityId);

        const listing: Listing = {
            imageUrl:
                'https://upload.wikimedia.org/wikipedia/en/3/35/Wonka_Bar%2C_packaging.jpg',
            price: 3.99,
            tenantArticleId: tenantArticleId,
            title: 'Wonkas Chocolate Bar',
        };

        /**
         * Listing creation
         */
        // const listingResponse = await ListingService.createListings(facilityId, [listing]);
        // console.log('listingResponse: ');
        // console.log(listingResponse);

        const allListings = await ListingService.getAllListings(facilityId);
        console.log('allListings ');
        console.log(allListings);

        /**
         * Stocks creation
         */
        // const stock = await StockService.createStock(facilityId, tenantArticleId, 1000);
        const stockId = '0aa7c543-a817-40b4-80b4-2eda96b260d8';
        // const itemId = 'a543e9b9-ec7b-4c83-b82e-99f845a9b3f6';
        const itemId = '8babea0b-7195-47fa-9bbb-cea8e6527991';
        // // console.log('stock');
        // // console.log(stock);

        const stocks = await StockService.getStocks(facilityId);

        console.log('stocks');
        console.log(stocks);

        // const order = await OrderService.createOrder(tenantArticleId, tenantOrderId, facilityId);
        // console.log(JSON.stringify(order));

        // /**
        //  * Picking
        //  */
        const pickJobId = 'cead8c7d-1f79-450a-8606-d2708c36b76e';
        // const picked = await PickService.pick(pickJobId, stockId, itemId, 2);

        // console.log('picked');
        // console.log(picked);

        // const closedPickJob = await PickService.closePickJob(pickJobId, 4);

        // console.log('closedPickJob');
        // console.log(closedPickJob);

        // /**
        //  * Packing
        //  */

        const packJobId = 'a06eb550-57d1-4a30-a746-2d795f8a758e';
        const packed = await PackService.pack(packJobId, stockId, itemId, 1, 1);
        console.log('packed');
        console.log(packed);

        const closedPackJob = await PackService.closePackJob(packJobId, 2);

        console.log('closedPackJob');
        console.log(closedPackJob);

        // /**
        //  * Handing over
        //  */
        const handoverJobId = '';
        const handed = HandoverService.handover(handoverJobId, 1);

        console.log('handed');
        console.log(handed);

        // const resAuth: AuthRefreshResponse | null = await AuthService.refreshAuthentication(res.refreshToken);

        // console.log('resAuth:');
        // console.log(resAuth);

        // const res = await FacilityService.updateFacility('aefd479f-3fb1-4e85-ac6e-240054eb7224', 5);
        // console.log(res);
    }
}
