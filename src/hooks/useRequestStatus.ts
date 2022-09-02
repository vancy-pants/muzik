import { useState } from 'react'

function useRequestStatus() {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  return { isLoading, isError, setIsLoading, setIsError }
}

export default useRequestStatus
