const { getPreviousRate } = require('../services/ratesHistory.service');

function formatRatesMessage(rates) {
    const title = '💱 Exchange Rates';

    const lines = rates.map((rate) => {
        const previousRate = getPreviousRate(rate.pair);

        if (!previousRate) {
            return `${rate.pair}: ${rate.rate.toFixed(2)}`;
        }

        const diff = rate.rate - previousRate;

        let symbol = '➖';
        let sign = '';

        if (diff > 0) {
            symbol = '⬆️';
            sign = '+';
        } else if (diff < 0) {
            symbol = '⬇️';
        }

        return `${rate.pair}: ${rate.rate.toFixed(2)} ${symbol} ${sign}${diff.toFixed(2)}`;
    });

    return `${title}\n\n${lines.join('\n')}`;
}

module.exports = { formatRatesMessage };