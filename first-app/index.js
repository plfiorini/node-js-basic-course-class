import { PhoneCaller } from "./phone.js";
import { EmailCaller } from "./email.js";

const phoneCaller = new PhoneCaller();
phoneCaller.call(5000);

const emailCaller = new EmailCaller();
emailCaller.call(10000);
