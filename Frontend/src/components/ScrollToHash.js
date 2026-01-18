import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const tryScroll = (hash) => {
  const id = (hash || "").replace("#", "").trim()
  if (!id) return false
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior: "smooth", block: "start" })
  return true
}

export default function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash
    if (!hash) return

    if (tryScroll(hash)) return

    let tries = 0
    const timer = setInterval(() => {
      tries += 1
      if (tryScroll(hash) || tries >= 20) clearInterval(timer)
    }, 100)

    return () => clearInterval(timer)
  }, [location.pathname, location.hash])

  return null
}
