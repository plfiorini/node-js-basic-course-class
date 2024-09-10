import { Caller } from './caller.js';
import { CustomersList } from './customer.js';

export class PhoneCaller extends Caller {
    call(intervalMs) {
        setInterval(() => {
            const customerIndex = Math.floor(Math.random() * CustomersList.length);
            const customer = CustomersList[customerIndex];
            console.log(`Called customer ${customer.izd} (phone ${customer.phone})`);
        }, intervalMs);
    }
};
