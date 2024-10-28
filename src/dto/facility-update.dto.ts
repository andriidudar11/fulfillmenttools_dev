import { FacilityBody } from '.';

export interface FacilityUpdate {
    actions: [
        | {
              action: string;
          }
        | FacilityBody,
    ];
    version: number;
}
