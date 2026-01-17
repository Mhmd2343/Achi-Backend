const STORAGE_KEY = "achi_home_config_v1"

export function loadHomeConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === "object" ? parsed : null
  } catch {
    return null
  }
}

export function saveHomeConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    window.dispatchEvent(new Event("achi_home_config_updated"))
    return true
  } catch {
    return false
  }
}

export function clearHomeConfig() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new Event("achi_home_config_updated"))
    return true
  } catch {
    return false
  }
}
