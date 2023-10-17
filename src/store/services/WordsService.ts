import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../constants";
import { StoredWord } from "../../types";

export const wordsApi = createApi({
  reducerPath: "wordsApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER }),
  endpoints: (builder) => ({
    getWords: builder.query<StoredWord[], void>({
      query: () => "",
    }),
  }),
});

export const { useGetWordsQuery } = wordsApi;
