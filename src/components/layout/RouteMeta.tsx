import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { metaForPath } from '../../data/seoRoutes'
import { site } from '../../data/site'

function setAttr(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value)
}

/** Keeps the head right when moving between pages in the browser. Crawlers get it from the prerendered HTML. */
export default function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = metaForPath(pathname)
    const url = `${site.url}${meta.path === '/' ? '/' : meta.path}`
    document.title = meta.title
    setAttr('meta[name="description"]', 'content', meta.description)
    setAttr('link[rel="canonical"]', 'href', url)
    setAttr('meta[property="og:title"]', 'content', meta.title)
    setAttr('meta[property="og:description"]', 'content', meta.description)
    setAttr('meta[property="og:url"]', 'content', url)
  }, [pathname])

  return null
}
