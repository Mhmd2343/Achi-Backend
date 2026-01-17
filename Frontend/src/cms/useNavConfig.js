import { useCallback, useEffect, useMemo, useState } from "react"
import navDefaults from "./navDefaults"
import { NAV_STORAGE_KEY, readNavConfig, resetNavConfig, writeNavConfig } from "./navStorage"

const normalizeNavConfig = (input) => {
  if (Array.isArray(input)) return { ...(navDefaults || {}), version: 1, items: input }
  const obj = input && typeof input === "object" ? input : {}
  const items = Array.isArray(obj.items) ? obj.items : Array.isArray(navDefaults?.items) ? navDefaults.items : []
  return { ...(navDefaults || {}), ...(obj || {}), version: obj.version || 1, items }
}

const useNavConfig = () => {
  const [config, setConfig] = useState(() => normalizeNavConfig(readNavConfig()))

  useEffect(() => {
    const onStorage = (e) => {
      if (e && e.key && e.key !== NAV_STORAGE_KEY) return
      setConfig(normalizeNavConfig(readNavConfig()))
    }
    const onCustom = () => setConfig(normalizeNavConfig(readNavConfig()))
    window.addEventListener("storage", onStorage)
    window.addEventListener("achi_nav_config_updated", onCustom)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("achi_nav_config_updated", onCustom)
    }
  }, [])

  const setNavConfig = useCallback((updater) => {
    setConfig((prevRaw) => {
      const prev = normalizeNavConfig(prevRaw)
      const nextRaw = typeof updater === "function" ? updater(prev) : updater
      const next = normalizeNavConfig(nextRaw)
      writeNavConfig(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    resetNavConfig()
    setConfig(normalizeNavConfig(navDefaults))
  }, [])

  const items = useMemo(() => {
    const list = Array.isArray(config.items) ? config.items.slice() : []
    return list
      .filter((x) => x && x.enabled !== false)
      .sort((a, b) => Number(a?.order || 0) - Number(b?.order || 0))
  }, [config.items])

  return { config, items, setNavConfig, reset }
}

export default useNavConfig
  
