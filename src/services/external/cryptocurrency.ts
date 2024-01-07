import axios from "axios"

const getCryptoMarketPrice = async (id: string): Promise<number> => {
    return axios.get(`https://api.coinpaprika.com/v1/tickers/${id}/`)
    .then(response => {
        return Number(response.data.quotes.USD.price)
    })
}

export {
    getCryptoMarketPrice
}