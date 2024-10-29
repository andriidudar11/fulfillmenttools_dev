import { Action } from "../types";

export interface EventBody {
    version: number,
            actions: [
                {
                    action: Action,
                    status: string,
                    id?: string,
                },
                {
                    action: Action,
                    id: string,
                    picked: 1,
                    status: 'CLOSED',
                    partialStockLocations: [
                        {
                            tenantPartialStockId: string,
                            picked: 1,
                        },
                    ],
                }?,
            ],
}