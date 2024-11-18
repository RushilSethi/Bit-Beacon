import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
const baseUrl= 'https://content.guardianapis.com';

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => 
                `/search?section=technology|business|money&order-by=newest&q=${newsCategory} AND (cryptocurrency OR bitcoin OR blockchain OR ethereum OR crypto)&page-size=${count}&api-key=${apiKey}&safeSearch=off&strictSearch=true&show-fields=thumbnail,trailText,headline`,
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;


