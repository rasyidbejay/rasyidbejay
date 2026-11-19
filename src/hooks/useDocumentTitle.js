import { useEffect } from 'react'

const BASE = 'Rashid Abdullah'
const DEFAULT = 'Rashid Abdullah | Building small corners of the internet'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : DEFAULT
  }, [title])
}
