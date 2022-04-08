const axios = require("axios");

export interface Coin {
    uuid: string
    symbol: string
    name: string
    color: string
    iconUrl: string
    marketCap: string
    price: string
    listedAt: number
    tier: number
    change: string
    rank: number
    sparkline: Array<string>
    lowVolume: boolean
    coinrankingUrl: string
    btcPrice: string
}

const getCoinsOptions = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coins',
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '24h',
    tiers: '1',
    orderBy: 'marketCap',
    orderDirection: 'desc',
    limit: '50',
    offset: '0'
  },
  headers: {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '4d7024c2fbmshc9a9ccf4acac0b8p17cf95jsn37a349de3a80'
  }
};


export function getCoins(): Promise<Coin[]> {
    return axios.request(getCoinsOptions).then(function (response: Coin[]) {
        return response
    }).catch(function (error: any) {
        console.error(error)
    })

}

const getCoinSuggestionsOptions = (query: string) => { return {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/search-suggestions',
  params: {'query': query, referenceCurrencyUuid: 'yhjMzLPhuIDl'},
  headers: {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '4d7024c2fbmshc9a9ccf4acac0b8p17cf95jsn37a349de3a80'
  }
}};


export function getCoinSuggestions(query: string): Promise<Coin[]> {
    return axios.request(getCoinSuggestionsOptions(query)).then(function (response: {data : {data: {coins: Coin[]}, status: string}}) {
        return response.data.data.coins
    }).catch(function (error: any) {
        console.error(error)
    })
}
