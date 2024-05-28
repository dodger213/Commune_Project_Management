import { createApi } from "@reduxjs/toolkit/query/react"
import apiWrapper from "./wrapper/apiWrapper"
export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: apiWrapper,
  tagTypes: [
    "ValidatorsList",
    "CommuneStats",
    "SingleValidator",
    "SubnetsList",
    "SingleSubnet",
  ],
  endpoints: (builder) => ({
    getValidators: builder.query({
      query: () => "/validators/",
      providesTags: ["ValidatorsList"],
      transformResponse: (response) => {
        const validatedResponse = response.validators.map(
          (validator) => {
            validator.isVerified = validator.expire_at === -1 || (validator.expire_at || 0) > Date.now() / 1000
            return validator
          },
        )
        return validatedResponse.toSorted((a, b) =>
          a.key === process.env.REACT_APP_BACKEND_API ? -1 : 1,
        )
      },
    }),
    getValidatorsById: builder.query({
      query: ({ key, wallet, subnet_id = 0 }) => {
        let url = `/validators/${key}?subnet_id=${subnet_id}`
        if (wallet && wallet !== undefined) {
          url += `&wallet=${wallet}`
        }
        return url
      },
      providesTags: (_, __, { key }) => [{ type: "SingleValidator", id: key }],
      transformResponse: (response) => {
        const validatedResponse = {
          ...response,
          isVerified: response.expire_at === -1 || (response.expire_at || 0) > Date.now() / 1000,
        }
        console.log(validatedResponse)
        validatedResponse.stake_from = validatedResponse?.stake_from?.sort(
          (a, b) => b[1] - a[1],
        )
        return validatedResponse
      },
    }),
    getSubnets: builder.query({
      query: () => "/subnets/",
      providesTags: ["SubnetsList"],
      transformResponse: (
        response,
      ) => {
        // const validatedResponse: ValidatorType[] = response.validators.map(
        //   (validator) => {
        //     if (verifiedValidators.some((v) => v.key === validator.key)) {
        //       validator.isVerified = true
        //     } else {
        //       validator.isVerified = false
        //     }
        //     return validator
        //   },
        // )
        // return validatedResponse.toSorted((a, b) =>
        //   a.key === process.env.NEXT_PUBLIC_COMSTAT_VALIDATOR ? -1 : 1,
        // )
        return response.subnets
      },
    }),
    getSubnetById: builder.query({
      query: (id) => `/validators/?subnet_id=${id}`,
      providesTags: (_, __, id) => [{ type: "SingleSubnet", id: id }],
      transformResponse: (response) => {
        const validatedResponse = response.validators.map(
          (validator) => {
            validator.isVerified = validator.expire_at === -1 || (validator.expire_at || 0) > Date.now() / 1000
            return validator
          },
        )
        return validatedResponse.toSorted((a, b) =>
          a.key === process.env.REACT_APP_COMSTAT_VALIDATOR ? -1 : 1,
        )
      },
    }),
    getTotalStats: builder.query({
      query: () => "/stats/",
      providesTags: ["CommuneStats"],
      transformResponse: (response) => {
        return response.stats
      },
    }),
    getBalance: builder.query({
      query: ({ wallet }) => `/balance/?wallet=${wallet}`,
      providesTags: ["SingleValidator"],
      transformResponse: (response) => {
        return response
      },
    }),
  }),
})

export const {
  useGetValidatorsQuery,
  useGetBalanceQuery,
  useGetTotalStatsQuery,
  useSearchBalanceMutation,
  useGetValidatorsByIdQuery,
} = statsApi
