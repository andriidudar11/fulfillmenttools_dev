import 'dotenv/config';

import environment from '../environment';
import { HttpService } from '../services/http.service';
import { requireAuth } from '../decorators';

const webhookUrl = '';
const url = `${environment.apiUrl}/api/subscriptions`;
const headerValue = '';

class Subscription {
    @requireAuth()
    public static async subscribeToOrderCreatedEvent() {
        const body = {
            callbackUrl: webhookUrl,
            event: 'ORDER_CREATED',
            headers: [
                {
                    key: 'X-My-Auth',
                    value: headerValue,
                },
            ],
            name: 'Tutorial Subscription (not for productive use)',
        };

        const res = await HttpService.post(url, JSON.stringify(body));

        return res.json();
    }

    @requireAuth()
    public static async subscribeToPickJobEvent() {
        const body = {
            callbackUrl: webhookUrl,
            event: 'PICK_JOB_CREATED',
            headers: [
                {
                    key: 'X-My-Auth',
                    value: headerValue,
                },
            ],
            name: 'Tutorial Subscription (not for productive use) PICK_JOB_CREATED',
        };

        const res = await HttpService.post(url, JSON.stringify(body));

        return res.json();
    }

    @requireAuth()
    public static async subscribeToPackJobEvent() {
        const body = {
            callbackUrl: webhookUrl,
            event: 'PACK_JOB_CREATED',
            headers: [
                {
                    key: 'X-My-Auth',
                    value: headerValue,
                },
            ],
            name: 'Tutorial Subscription (not for productive use) PACK_JOB_CREATED',
        };

        const res = await HttpService.post(url, JSON.stringify(body));

        return res.json();
    }

    @requireAuth()
    public static async subscribeToHandoverJobEvent() {
        const body = {
            callbackUrl: webhookUrl,
            event: 'HANDOVERJOB_CREATED',
            headers: [
                {
                    key: 'X-My-Auth',
                    value: headerValue,
                },
            ],
            name: 'Tutorial Subscription (not for productive use) HANDOVERJOB_CREATED',
        };

        const res = await HttpService.post(url, JSON.stringify(body));

        return res.json();
    }

    public static async initiateSubscriptions() {
        await Subscription.subscribeToOrderCreatedEvent();

        Promise.allSettled([
            Subscription.subscribeToPickJobEvent(),
            Subscription.subscribeToPackJobEvent(),
            Subscription.subscribeToHandoverJobEvent(),
        ])
            .then((results) => results.forEach((result) => console.log(result)))
            .catch((err) => {
                console.log('Error occurred');
                console.log(err);
            });
    }
}

Subscription.initiateSubscriptions();
