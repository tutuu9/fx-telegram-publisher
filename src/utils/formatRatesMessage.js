function formatRatesMessage(rates) {
    const title = '💱 Exchange Rates';

    const lines = rates.map((rate)=> {
        return `${rate.pair}: ${rate.rate.toFixed(2)}`;
    });

    return `${title}\n\n${lines.join('\n')}`;

}

module.exports = { formatRatesMessage }