import { useEffect, useState } from "react"
import { loadHomeConfig, saveHomeConfig } from "./homeStorage.js"
import { DEFAULT_HOME_CONFIG } from "./homeDefaults.js"

export default function useHomeConfig() {
  const [config, setConfig] = useState(() => loadHomeConfig() || DEFAULT_HOME_CONFIG)

  useEffect(() => {
    const sync = () => setConfig(loadHomeConfig() || DEFAULT_HOME_CONFIG)

    const onStorage = () => sync()
    const onCustom = () => sync()

    window.addEventListener("storage", onStorage)
    window.addEventListener("achi_home_config_updated", onCustom)

    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("achi_home_config_updated", onCustom)
    }
  }, [])

  const update = (next) => {
    const current = loadHomeConfig() || DEFAULT_HOME_CONFIG
    const value = typeof next === "function" ? next(current) : next
    saveHomeConfig(value)
    setConfig(loadHomeConfig() || DEFAULT_HOME_CONFIG)
  }

  const reset = () => {
    saveHomeConfig(DEFAULT_HOME_CONFIG)
    setConfig(DEFAULT_HOME_CONFIG)
  }

  return { config, update, reset }
}
