import { useState } from 'react'

function useRequestStatus(defaultLoadingStatus = true) {
  const [isLoading, setIsLoading] = useState(defaultLoadingStatus)
  const [isError, setIsError] = useState(false)

  return { isLoading, isError, setIsLoading, setIsError }
}

export default useRequestStatus
