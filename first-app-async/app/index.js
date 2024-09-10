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
function longRequestOrig(n) {
    let id = i++;
    console.log(`Id: ${id}. Starting blocking request. Find primes from 2 to ${n}`);

    const start = new Date();

    const primes = mathUtils.getPrimeNumbersWithinRange(2, n);

    const end = new Date();
    console.log(`Id: ${id}. Finished blocking request. Elapsed ms: ${end.getTime() - start.getTime()}`);

    return primes;
}

async function longRequest(n) {
    primes = [];

    let id = i++;
    console.log(`Id: ${id}. Starting non-blocking request. Find primes from 2 to ${n}`);

    for (i = 2; i <= n; i += 10) {
        setTimeout(() => {
            const x = i;
            const y = i + 9;
            console.log(`Id: ${id}. Elaborating primes from ${x} to ${y}`);
            const start = new Date();
            primes += mathUtils.getPrimeNumbersWithinRange(x, y);
            const end = new Date();
            console.log(`Id: ${id}. Finished blocking request. Elapsed ms: ${end.getTime() - start.getTime()}`);
        }, 50);

        console.log(`Id: ${id}. Suspended non-blocking request`);
        await new Promise(r => setTimeout(r, 50));
    }

    console.log("primse", primes);
}
