import { OrderStatus } from '../enums';

export interface Order {
    consumer: {
        addresses: [
            {
                city: string;
                country: string;
                houseNumber: string;
                postalCode: string;
                street: string;
                firstName: string;
                lastName: string;
                salutation: string;
            },
        ];
        email: string;
    };

    deliveryPreferences: {
        collect: [
            {
                facilityRef: string;
                paid: boolean;
            },
        ];
        shipping?: {
            preselectedFacilities: [
                {
                    facilityRef: string;
                },
            ];
        };
    };
    orderDate: string;
    orderLineItems: [
        {
            article: {
                tenantArticleId: string;
                title: string;
            };
            quantity: number;
        },
    ];
    status?: OrderStatus;
    tenantOrderId: string;
}
