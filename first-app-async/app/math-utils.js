/**
 * DO NOT CHANGE IT
 * @param {*} from
 * @param {*} to
 * @returns
 */
function getPrimeNumbersWithinRange(from, to) {
    const primes = [];
    for (let i = from; i <= to; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }

    return primes;
}

/**
 * DO NOT CHANGE IT
 * @param {*} n
 * @returns
 */
function isPrime(n) {
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            //console.log(`${n} divisible by: `, i);
            return false;
        }
        //console.log(`${n} not divisible by: `, i);
        //console.log("doing cpu intesive work...");
    }

    return true;
}

module.exports.getPrimeNumbersWithinRange = getPrimeNumbersWithinRange;
