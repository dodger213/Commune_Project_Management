import { useGetBalanceQuery, useGetTotalStatsQuery } from "../store/api/statsApi"
import { useState } from "react"

export const useUserStats = () => {
  const [walletAddress, setWalletAddress] = useState("")
  const { data: onChainData, isLoading: chainLoading } = useGetTotalStatsQuery(
    undefined,
    {
      pollingInterval: 8000,
    },
  )
  const {
    data: userBalance,
    isFetching: searchFetching,
    refetch: refetchSearch,
  } = useGetBalanceQuery(
    { wallet: walletAddress },
    {
      skip: !walletAddress && walletAddress === "",
    },
  )

  const userBalanceDollar =
    ((userBalance?.balance ?? 0) * (onChainData?.price ?? 0)) / 10 ** 9
  const userStakedDollar =
    ((userBalance?.staked ?? 0) * (onChainData?.price ?? 0)) / 10 ** 9

  return {
    walletAddress,
    searchFetching,
    userBalance,
    userBalanceDollar,
    userStakedDollar,
    onChainData,
    refetchSearch,
    setWalletAddress,
  }
}
