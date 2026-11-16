import { useEffect, useState } from 'react'

const format = () =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kuala_Lumpur',
  }).format(new Date())

// Current time in Kuala Lumpur, as HH:MM.
export function useClock() {
  const [time, setTime] = useState(format)

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15000)
    return () => clearInterval(id)
  }, [])

  return time
}
