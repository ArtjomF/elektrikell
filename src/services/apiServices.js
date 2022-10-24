import moment from 'moment';   // npm paket dlja raboty s datoi/ 4islo i vremja

const apiUrl = 'https://dashboard.elering.ee/api'; // api url

// eksportiruem asinhronnuju funkciju kotoraja zaprashivaet tekuwuju stoimost elektroenergii.
// zapros GET /nps/price/ee/current - endpoint
// await pozvoljaet dozidatsja otveta s api 
// fetch vozraschajet promisse/obewanie i pri pravilnom vypolneniem objekt response.
// kazdyi response imeet funkciju .json() kotoraja pervodit JSON v js objekt
export async function getCurrentPrice() {
     const country = 'EE';
     const response = await fetch(`${apiUrl}/nps/price/${country}/current`)
     return response.json();
};

export async function getPriceData() {
    // moment() - vydajot moment object s tekuwem vremenem i datoi
    // .utc - konvertiruet v nulevoi 4asovoi pojas
    // substract - vy4etaet
    // .format() prevrawaet moment object v string s udobnym formatom 4tenija

    const start = moment().utc().subtract(10,'hours').format();
    const end = moment().utc().add(30, 'hours').format();
    // URLSearchParams - prevrawaet js objekt v stro4ku dlja url
    const params = new URLSearchParams({start,end});
    const response = await fetch(`${apiUrl}/nps/price?${params}`);
    return response.json();
};