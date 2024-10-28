import { requireAuth } from '../decorators';
import { Order } from '../dto';
import { HttpService } from './http.service';

export class OrderService {
    @requireAuth()
    public static async createOrder(
        tenantArticleId: string,
        tenantOrderId: string,
        facilityId: string
    ) {
        const url = HttpService.buildUrl('api/orders');

        const order: Order = {
            consumer: {
                addresses: [
                    {
                        city: 'M\xFCnchen',
                        country: 'DE',
                        houseNumber: '1',
                        postalCode: '80803',
                        street: 'Biedersteiner Str.',
                        firstName: 'Charlie',
                        lastName: 'Bucket',
                        salutation: 'Herr',
                    },
                ],
                email: 'charlie.bucket@example.com',
            },
            deliveryPreferences: {
                collect: [
                    {
                        facilityRef: facilityId,
                        paid: true,
                    },
                ],
            },
            orderDate: '2024-10-26T08:43:50.525Z',
            orderLineItems: [
                {
                    article: {
                        tenantArticleId,
                        title: 'Wonkas Chocolate Bar',
                    },
                    quantity: 1,
                },
            ],
            tenantOrderId,
        };

        const res = await HttpService.post(url, JSON.stringify(order));

        return res.json();
    }
}
