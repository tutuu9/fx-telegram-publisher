const previousRates = {};

function getPreviousRate(pair) { 
    return previousRates[pair];
}

function saveRates(rates) {
    if (!rates || rates.length === 0) return;
    rates.forEach((rate) => {
        previousRates[rate.pair] = rate.rate;
    });
}

module.exports = {getPreviousRate,saveRates}