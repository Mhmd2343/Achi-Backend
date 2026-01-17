import navDefaults from "./navDefaults"

export const NAV_STORAGE_KEY = "achi_nav_config_v1"

const normalizeNavConfig = (input) => {
  if (Array.isArray(input)) return { ...(navDefaults || {}), version: 1, items: input }
  const obj = input && typeof input === "object" ? input : {}
  const items = Array.isArray(obj.items) ? obj.items : Array.isArray(navDefaults?.items) ? navDefaults.items : []
  return { ...(navDefaults || {}), ...(obj || {}), version: obj.version || 1, items }
}

export const readNavConfig = () => {
  try {
    const raw = localStorage.getItem(NAV_STORAGE_KEY)
    if (!raw) return normalizeNavConfig(navDefaults)
    const parsed = JSON.parse(raw)
    const normalized = normalizeNavConfig(parsed)
    localStorage.setItem(NAV_STORAGE_KEY, JSON.stringify(normalized))
    return normalized
  } catch {
    return normalizeNavConfig(navDefaults)
  }
}

export const writeNavConfig = (config) => {
  try {
    const normalized = normalizeNavConfig(config)
    localStorage.setItem(NAV_STORAGE_KEY, JSON.stringify(normalized))
    window.dispatchEvent(new Event("achi_nav_config_updated"))
  } catch {}
}

export const resetNavConfig = () => {
  try {
    localStorage.removeItem(NAV_STORAGE_KEY)
    window.dispatchEvent(new Event("achi_nav_config_updated"))
  } catch {}
}
