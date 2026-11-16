import { useEffect } from 'react'

const BASE = 'Rashid Abdullah'
const DEFAULT = 'Rashid Abdullah | Frontend Developer & SEO Specialist'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : DEFAULT
  }, [title])
}
