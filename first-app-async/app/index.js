const mathUtils = require("./math-utils");

let i = 1;

otherIncomingRequests();
longRequest(50000);

/**
 * DO NOT CHANGE IT
 */
function otherIncomingRequests() {
    setInterval(() => {
        console.log(`Id: ${i++}. Doing new incoming request`);
    }, 50);
}

/**
 * DO NOT CHANGE IT
 * @param {*} n
 * @returns
 */
function longRequest(n) {
    let id = i++;
    console.log(`Id: ${id}. Starting blocking request. Find primes from 2 to ${n}`);
    const start = new Date();

    const primes = mathUtils.getPrimeNumbersWithinRange(2, n);

    const end = new Date();
    console.log(`Id: ${id}. Finished blocking request. Elapsed ms: ${end.getTime() - start.getTime()}`);

    return primes;
}