import { Caller } from './caller.js';
import { CustomersList } from './customer.js';

export class EmailCaller extends Caller {
    call(intervalMs) {
        setInterval(() => {
            const customerIndex = Math.floor(Math.random() * CustomersList.length);
            const customer = CustomersList[customerIndex];
            console.log(`Sent email to customer ${customer.id} (email ${customer.mail})`);
        }, intervalMs);
    }
};
