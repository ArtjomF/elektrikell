import moment from 'moment';

export const localUrl = '/elektrikell';
const apiUrl = 'https://dashboard.elering.ee/api';

export async function getCurrentPrice(selectedCountry) {
    const country = selectedCountry.key;
    const response = await fetch(`${apiUrl}/nps/price/${country}/current`)
    return response.json();
};

export async function getPriceData() {
    const start = moment().utc().subtract(10, 'hours').format();
    const end = moment().utc().add(30, 'hours').format();
    const params = new URLSearchParams({ start, end });
    const response = await fetch(`${apiUrl}/nps/price?${params}`);
    return response.json();
};

export function handleData(
    response,
    selectedCountry,
    data,
    setData,
    location,
    hourValue,
    dispatch,
    setBestTimeRange,
    setWorstTimeRange,
    setX,
    
) {
    let priceData = response[selectedCountry].map(dataObject => {
        const hour = moment.unix(dataObject.timestamp).format('HH')
        return {
            x:hour,
            price: dataObject.price,
            timestamp: dataObject.timestamp,
            now: hour === moment().format('HH'),
        };
    });

    if (!data.country || (data.country !== selectedCountry)) {
        setData({
            priceData,
            country: selectedCountry,
        });
        return;
    }

    const futureData = priceData.filter((v, i) => i >= 9);
    const areaPrices = [];

    futureData.forEach((v, i, arr) => {
        const partData = arr.slice(i, i + hourValue + 1);
        if (partData.length === hourValue + 1) {
            let result = 0;
            for (const p of partData) result += p.price;
            areaPrices.push({ result, i });
        }
        return;

    });

    areaPrices.sort((a, b) => a.result - b.result);

    if (location.pathname.includes('/low') || !location.pathname.includes('/high')) {
        dispatch(setBestTimeRange({
            from: futureData[areaPrices[0].i].x,
            until: futureData[areaPrices[0].i + hourValue].x,
            timestamp: futureData[areaPrices[0].i].timestamp,
            bestPrice: futureData[areaPrices[0].i].price,
        }));
    } else {
        areaPrices.reverse();
        dispatch(setWorstTimeRange({
            from: futureData[areaPrices[0].i].x,
            until: futureData[areaPrices[0].i + hourValue].x,
            worstPrice: futureData[areaPrices[0].i].price,
        }));

    }
     setX({
        x1: 9 + areaPrices[0].i,
        x2: 9 + areaPrices[0].i + hourValue,
     });

}