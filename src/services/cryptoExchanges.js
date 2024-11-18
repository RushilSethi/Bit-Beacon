import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl= 'https://api.coingecko.com/api/v3';

export const cryptoExchangesApi = createApi({
    reducerPath: 'cryptoExchangesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoExchanges: builder.query({
            query: () => 
                `/exchanges`,
        }),
        getExchangeVolume: builder.query({
            query:({exchangeId}) => `exchanges/${exchangeId}/volume_chart?days=7`
        }),
    }),
});

export const { useGetCryptoExchangesQuery, useGetExchangeVolumeQuery } = cryptoExchangesApi;


