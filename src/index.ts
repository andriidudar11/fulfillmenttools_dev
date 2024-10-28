import 'dotenv/config';

import { ClientService } from './services/client.service';

ClientService.main()
    .then(() => {})
    .catch((err) => {
        console.log('Error happened');
        console.error(err);
    });
