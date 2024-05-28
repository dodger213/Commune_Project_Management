import { fetchBaseQuery } from "@reduxjs/toolkit/query"

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API,
  prepareHeaders: (headers) => {
    return headers
  },
})

const apiWrapper = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
  }
  return result
}

export default apiWrapper
