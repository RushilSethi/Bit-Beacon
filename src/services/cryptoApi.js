import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    'Content-Type': 'application/json',
    "x-access-token": process.env.REACT_APP_COINRANKING_API_KEY,
}

const baseUrl = "https://api.coinranking.com/v2";

const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query:(count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query:(coinId) => createRequest(`coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query:({coinId, timePeriod}) => createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`)
        })
    })
});

export const {
    useGetCryptosQuery, // this name should be same as the function parameter name for the query, use<name>Query 
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi;

