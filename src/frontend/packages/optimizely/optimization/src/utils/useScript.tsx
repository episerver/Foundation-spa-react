import { useState, useEffect } from 'react'

export const useScript = (url : string, name: string) => {

  const [lib, setLib] = useState({})

  useEffect(() => {
    const script = document.createElement('script')

    script.src = url
    script.async = true
    script.onload = () => setLib({ [name]: (window as Window & { [key: string]: any})[name] })

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [url, name])

  return lib

}

export default useScript