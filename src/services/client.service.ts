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
const tenantOrderId = 'R456728554';

export class ClientService {
    public static async main() {
        /**
         * Facility creation
         */
        // const facility = await FacilityService.createFacility(tenantFacilityId, FacilityService.getDefaultEntity(tenantFacilityId));
        // const { id: facilityId } = facility;
        const facilityId = 'a0a7c407-df0f-4721-a19e-3c495047482b'; // Andriis Pickup Shop

        /**
         * Listing creation
         */
        // const listingResponse = await ListingService.createListings(facilityId, [ListingService.getDefaultEntity(tenantArticleId)]);
        // console.log('listingResponse');
        // console.log(listingResponse);

        // const allListings = await ListingService.getAllListings(facilityId);
        // console.log('allListings ');
        // console.log(allListings);

        /**
         * Stock creation
         */
        // const stock = await StockService.createStock(StockService.getDefaultEntity(facilityId, tenantArticleId, 1000));
        const stockId = '0aa7c543-a817-40b4-80b4-2eda96b260d8';
        const itemId = '4eca5a1a-a8ed-4388-a6d5-354d82d66f7c';

        /**
         * Order creation
         */
        // const order = await OrderService.createOrder(OrderService.getDefaultEntity(facilityId, tenantArticleId, tenantOrderId));
        // console.log(JSON.stringify(order));

        /**
         * Picking
         */
        // const pickJobId = '0fe7b938-e74e-45bf-a1fc-febc0e3f6882';
        // const picked = await PickService.pick(pickJobId, PickService.getDefaultPickEntity(stockId, itemId, 1));
        // console.log('picked');
        // console.log(picked);

        // const closedPickJob = await PickService.closePickJob(pickJobId, PickService.getDefaultClosePickEntity(3));
        // console.log('closedPickJob');
        // console.log(closedPickJob);

        /**
         * Packing
         */
        // const packJobId = '4ff729cc-ad84-4960-beed-30d54cc8b93d';
        // const packed = await PackService.pack(packJobId, PackService.getDefaultPackEntity(itemId, 1, 1));
        // console.log('packed');
        // console.log(packed);

        // const closedPackJob = await PackService.closePackJob(packJobId, PackService.getDefaultClosePackEntity(2));
        // console.log('closedPackJob');
        // console.log(closedPackJob);

        /**
         * Handing over
         */
        // const handoverJobId = '07968bdd-7997-4d99-b17b-57d7a730e572';
        // const handed = await HandoverService.handover(handoverJobId, HandoverService.getDefaultHandoverEntity(1));
        // console.log('handed');
        // console.log(handed);
    }
}
