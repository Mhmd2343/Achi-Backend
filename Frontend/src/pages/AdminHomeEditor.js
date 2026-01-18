// Frontend/src/pages/AdminHomeEditor.js
import React, { useEffect, useMemo, useState } from "react"
import useHomeConfig from "../cms/useHomeConfig"
import useNavConfig from "../cms/useNavConfig"

const getCountryKey = () => {
  try {
    const raw = localStorage.getItem("achi_selected_country")
    if (!raw) return "Lebanon"
    return raw
  } catch {
    return "Lebanon"
  }
}

const uid = () => {
  try {
    return `nav-${Date.now()}-${Math.random().toString(16).slice(2)}`
  } catch {
    return `nav-${Date.now()}`
  }
}

const getBaseHref = () => {
  const base = process.env.PUBLIC_URL || ""
  return `${window.location.origin}${base}`
}

const EXISTING_PAGES = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/about" },
  { id: "services", label: "Services", path: "/services" },
  { id: "sectors", label: "Sectors", path: "/sectors" },
  { id: "projects", label: "Projects", path: "/projects" },
  { id: "blog", label: "Blog", path: "/blog" },
  { id: "gallery", label: "Gallery", path: "/gallery" }
]

const PAGE_ELEMENTS = {
  home: [
    { id: "hero", label: "Hero", hash: "#hero" },
    { id: "clients", label: "Clients", hash: "#clients" },
    { id: "projects", label: "Projects", hash: "#projects" },
    { id: "services", label: "Services", hash: "#services" },
    { id: "sectors", label: "Sectors", hash: "#sectors" },
    { id: "products", label: "Products", hash: "#products" },
    { id: "testimonials", label: "Testimonials", hash: "#testimonials" },
    { id: "blog", label: "Blog", hash: "#blog" },
    { id: "contactform", label: "Contact Form", hash: "#contactform" }
  ],
  about: [],
  services: [],
  sectors: [],
  projects: [],
  blog: [],
  gallery: []
}



const AdminHomeEditor = () => {
  const { config, update, reset } = useHomeConfig()
  const { config: navConfig, setNavConfig, reset: resetNav } = useNavConfig()

  const [countryKey, setCountryKey] = useState(getCountryKey())

  const [form, setForm] = useState({
    heroWhatsapp: "",
    phoneHref: "",
    whatsappHref: "",
    seoTitle: "",
    seoDescription: "",
    seoCanonical: "",
    srH1: ""
  })

  const [navDraft, setNavDraft] = useState({ items: [] })

  const [showAddModal, setShowAddModal] = useState(false)

  const [addMode, setAddMode] = useState("custom")
  const [existingPageId, setExistingPageId] = useState("home")
  const [existingElementId, setExistingElementId] = useState("")

  const [newItem, setNewItem] = useState({
    kind: "route",
    path: "/",
    targetId: "contactForm",
    order: 90,
    enabled: true,
    labelEn: "",
    labelFr: "",
    labelAr: ""
  })

  const [existingItemId, setExistingItemId] = useState("")
const [existingSectionId, setExistingSectionId] = useState("")


  useEffect(() => {
    const c = config || {}
    const cl = c?.countryLinks || {}
    const chosen = cl?.[countryKey] || cl?.Lebanon || {}

    setForm({
      heroWhatsapp: chosen?.heroWhatsappHref || c?.sections?.hero?.whatsappHref || "",
      phoneHref: chosen?.phoneHref || c?.floatingButtons?.phone?.href || "",
      whatsappHref: chosen?.whatsappHref || c?.floatingButtons?.whatsapp?.href || "",
      seoTitle: c?.seo?.title || "",
      seoDescription: c?.seo?.description || "",
      seoCanonical: c?.seo?.canonical || "",
      srH1: c?.srOnly?.h1 || ""
    })
  }, [config, countryKey])

  useEffect(() => {
    const raw = navConfig || {}
    const items = Array.isArray(raw.items) ? raw.items : []
    setNavDraft({ items: items.map((x) => ({ ...x })) })
  }, [navConfig])

  useEffect(() => {
    if (window.location.hash !== "#nav-editor") return
    setTimeout(() => {
      const el = document.getElementById("nav-editor")
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 150)
  }, [])

  useEffect(() => {
  setExistingSectionId("")
}, [existingItemId])


  const onChange = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const onSave = () => {
    update((prev) => {
      const next = { ...(prev || {}) }

      next.seo = { ...(next.seo || {}) }
      next.srOnly = { ...(next.srOnly || {}) }
      next.sections = { ...(next.sections || {}) }
      next.sections.hero = { ...(next.sections.hero || {}) }
      next.floatingButtons = { ...(next.floatingButtons || {}) }
      next.floatingButtons.phone = { ...(next.floatingButtons.phone || {}) }
      next.floatingButtons.whatsapp = { ...(next.floatingButtons.whatsapp || {}) }
      next.countryLinks = { ...(next.countryLinks || {}) }

      next.seo.title = form.seoTitle
      next.seo.description = form.seoDescription
      next.seo.canonical = form.seoCanonical
      next.srOnly.h1 = form.srH1

      next.countryLinks[countryKey] = {
        ...(next.countryLinks[countryKey] || {}),
        heroWhatsappHref: form.heroWhatsapp,
        phoneHref: form.phoneHref,
        whatsappHref: form.whatsappHref
      }

      return next
    })

    alert("Saved")
  }

  const navItemsSorted = useMemo(() => {
    const list = Array.isArray(navDraft.items) ? navDraft.items.slice() : []
    return list.sort((a, b) => Number(a?.order || 0) - Number(b?.order || 0))
  }, [navDraft.items])

  const setItemField = (id, key, value) => {
    setNavDraft((p) => {
      const items = (p.items || []).map((it) => {
        if (!it || it.id !== id) return it
        return { ...it, [key]: value }
      })
      return { ...p, items }
    })
  }

  const setItemLabelField = (id, lang, value) => {
    setNavDraft((p) => {
      const items = (p.items || []).map((it) => {
        if (!it || it.id !== id) return it
        const label = { ...(it.label || {}) }
        label[lang] = value
        return { ...it, label }
      })
      return { ...p, items }
    })
  }

  const moveItem = (id, dir) => {
    setNavDraft((p) => {
      const list = Array.isArray(p.items) ? p.items.slice() : []
      const idx = list.findIndex((x) => x && x.id === id)
      if (idx === -1) return p
      const nextIdx = dir === "up" ? idx - 1 : idx + 1
      if (nextIdx < 0 || nextIdx >= list.length) return p
      const tmp = list[idx]
      list[idx] = list[nextIdx]
      list[nextIdx] = tmp
      return { ...p, items: list }
    })
  }

  const removeItem = (id) => {
    setNavDraft((p) => {
      const list = Array.isArray(p.items) ? p.items.slice() : []
      return { ...p, items: list.filter((x) => x && x.id !== id) }
    })
  }

  const existingPage = useMemo(() => {
    return EXISTING_PAGES.find((p) => p.id === existingPageId) || EXISTING_PAGES[0]
  }, [existingPageId])

  const existingElements = useMemo(() => {
    return PAGE_ELEMENTS[existingPageId] || []
  }, [existingPageId])

  const selectedElement = useMemo(() => {
    return existingElements.find((e) => e.id === existingElementId) || null
  }, [existingElements, existingElementId])



const selectedExistingItem = useMemo(() => {
  return EXISTING_PAGES.find((x) => x.id === existingItemId) || null
}, [existingItemId])

const existingSections = useMemo(() => {
  if (!existingItemId) return []
  return PAGE_ELEMENTS[existingItemId] || []
}, [existingItemId])

const selectedExistingSection = useMemo(() => {
  if (!existingSectionId) return null
  return existingSections.find((x) => x.id === existingSectionId) || null
}, [existingSections, existingSectionId])

const computedExistingPath = useMemo(() => {
  if (!selectedExistingItem) return ""
  const basePath = selectedExistingItem.path || "/"
  const hash = selectedExistingSection?.hash || ""
  return `${basePath}${hash}`
}, [selectedExistingItem, selectedExistingSection])

const computedExistingUrl = useMemo(() => {
  if (!computedExistingPath) return ""
  return `${getBaseHref()}${computedExistingPath}`
}, [computedExistingPath])


  const openAddExisting = () => {
    setAddMode("existing")
    setExistingPageId("home")
    setExistingElementId("")
    setShowAddModal(true)
  }

  const openAddCustom = () => {
    setAddMode("custom")
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
  }

 const addExistingItem = () => {
  if (!selectedExistingItem) return
  if (existingSections.length > 0 && !selectedExistingSection) return

  const id = uid()

  const label = {
    en: newItem.labelEn || "New Item",
    fr: newItem.labelFr || "Nouveau",
    ar: newItem.labelAr || "جديد"
  }

  const full = {
    id,
    kind: "route",
    path: computedExistingPath || selectedExistingItem.path || "/",
    order: Number(newItem.order || 0),
    enabled: true,
    label
  }

  setNavDraft((p) => ({ ...p, items: [...(p.items || []), full] }))
  setShowAddModal(false)

  setTimeout(() => {
    window.location.assign(computedExistingUrl)
  }, 50)
}


  const addCustomItem = () => {
    const id = uid()
    const base = {
      id,
      kind: newItem.kind,
      enabled: true,
      order: Number(newItem.order || 0)
    }

    const label = {
      en: newItem.labelEn || "New Item",
      fr: newItem.labelFr || "Nouveau",
      ar: newItem.labelAr || "جديد"
    }

    const full =
      newItem.kind === "route"
        ? { ...base, path: newItem.path || "/new-page", label }
        : { ...base, targetId: newItem.targetId || "contactForm", label }

    setNavDraft((p) => ({ ...p, items: [...(p.items || []), full] }))

    setNewItem({
      kind: "route",
      path: "/",
      targetId: "contactForm",
      order: 90,
      enabled: true,
      labelEn: "",
      labelFr: "",
      labelAr: ""
    })

    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 50)
  }

  const onPlusClick = () => {
    openAddExisting()
  }

  const saveNav = () => {
    const next = { ...(navConfig || {}), items: navDraft.items || [] }
    setNavConfig(next)
    alert("Menu Saved")
  }

  return (
    <main className="p-[20px] max-w-[900px] mx-auto">
      <h1 className="text-[26px] font-[700] mb-[10px]">Admin Home Editor</h1>

      <div className="mb-[18px] flex items-center gap-[10px]">
        <span className="font-[600]">Country</span>
        <input
          value={countryKey}
          onChange={(e) => {
            const v = e.target.value
            setCountryKey(v)
            localStorage.setItem("achi_selected_country", v)
          }}
          className="border p-[10px] rounded-[10px] w-[260px]"
          placeholder="Lebanon"
        />
      </div>

      <div className="grid grid-cols-1 gap-[14px]">
        <label className="flex flex-col gap-[6px]">
          <span className="font-[600]">SEO Title</span>
          <input value={form.seoTitle} onChange={onChange("seoTitle")} className="border p-[10px] rounded-[10px]" />
        </label>

        <label className="flex flex-col gap-[6px]">
          <span className="font-[600]">SEO Description</span>
          <textarea
            value={form.seoDescription}
            onChange={onChange("seoDescription")}
            className="border p-[10px] rounded-[10px] min-h-[90px]"
          />
        </label>

        <label className="flex flex-col gap-[6px]">
          <span className="font-[600]">SEO Canonical</span>
          <input value={form.seoCanonical} onChange={onChange("seoCanonical")} className="border p-[10px] rounded-[10px]" />
        </label>

        <label className="flex flex-col gap-[6px]">
          <span className="font-[600]">SR-Only H1</span>
          <input value={form.srH1} onChange={onChange("srH1")} className="border p-[10px] rounded-[10px]" />
        </label>

        <label className="flex flex-col gap-[6px]">
          <span className="font-[600]">Hero WhatsApp Link</span>
          <input value={form.heroWhatsapp} onChange={onChange("heroWhatsapp")} className="border p-[10px] rounded-[10px]" />
        </label>

        <label className="flex flex-col gap-[6px]">
          <span className="font-[600]">Phone href</span>
          <input value={form.phoneHref} onChange={onChange("phoneHref")} className="border p-[10px] rounded-[10px]" />
        </label>

        <label className="flex flex-col gap-[6px]">
          <span className="font-[600]">WhatsApp href</span>
          <input value={form.whatsappHref} onChange={onChange("whatsappHref")} className="border p-[10px] rounded-[10px]" />
        </label>

        <div className="flex flex-wrap gap-[12px] mt-[6px]">
          <button onClick={onSave} className="bg-[#28509E] text-white px-[16px] py-[12px] rounded-[12px] font-[700] w-fit">
            Save
          </button>

          <button
            onClick={() => {
              reset()
              alert("Reset to defaults")
            }}
            className="bg-gray-200 text-black px-[16px] py-[12px] rounded-[12px] font-[700] w-fit"
          >
            Reset
          </button>
        </div>
      </div>

      <section id="nav-editor" className="mt-[40px] border-t pt-[26px]">
        <h2 className="text-[22px] font-[800] mb-[10px]">Dashboard Menu Editor</h2>
        <p className="text-[14px] text-gray-600 mb-[14px]">
          Edit the Header dashboard items (Home / About / Services / ...). Default items use translation keys. New items use EN/FR/AR labels.
        </p>

        <div className="border rounded-[14px] p-[14px] mb-[16px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
            <label className="flex flex-col gap-[6px]">
              <span className="font-[700]">Type</span>
              <select value={newItem.kind} onChange={(e) => setNewItem((p) => ({ ...p, kind: e.target.value }))} className="border p-[10px] rounded-[10px]">
                <option value="route">Route (Page)</option>
                <option value="section">Section (Home scroll)</option>
              </select>
            </label>

            <label className="flex flex-col gap-[6px]">
              <span className="font-[700]">Order</span>
              <input value={newItem.order} onChange={(e) => setNewItem((p) => ({ ...p, order: e.target.value }))} className="border p-[10px] rounded-[10px]" type="number" />
            </label>

            {newItem.kind === "route" ? (
              <label className="flex flex-col gap-[6px]">
                <span className="font-[700]">Path</span>
                <input value={newItem.path} onChange={(e) => setNewItem((p) => ({ ...p, path: e.target.value }))} className="border p-[10px] rounded-[10px]" placeholder="/new-page" />
              </label>
            ) : (
              <label className="flex flex-col gap-[6px]">
                <span className="font-[700]">Target Section ID</span>
                <input value={newItem.targetId} onChange={(e) => setNewItem((p) => ({ ...p, targetId: e.target.value }))} className="border p-[10px] rounded-[10px]" placeholder="clients" />
              </label>
            )}

            <label className="flex flex-col gap-[6px]">
              <span className="font-[700]">Label EN</span>
              <input value={newItem.labelEn} onChange={(e) => setNewItem((p) => ({ ...p, labelEn: e.target.value }))} className="border p-[10px] rounded-[10px]" />
            </label>

            <label className="flex flex-col gap-[6px]">
              <span className="font-[700]">Label FR</span>
              <input value={newItem.labelFr} onChange={(e) => setNewItem((p) => ({ ...p, labelFr: e.target.value }))} className="border p-[10px] rounded-[10px]" />
            </label>

            <label className="flex flex-col gap-[6px]">
              <span className="font-[700]">Label AR</span>
              <input value={newItem.labelAr} onChange={(e) => setNewItem((p) => ({ ...p, labelAr: e.target.value }))} className="border p-[10px] rounded-[10px]" />
            </label>
          </div>

          <div className="mt-[12px] flex gap-[10px] flex-wrap">
            <button onClick={onPlusClick} className="bg-[#28509E] text-white px-[16px] py-[12px] rounded-[12px] font-[900] w-fit text-[20px] leading-none">
              +
            </button>

            <button onClick={openAddCustom} className="bg-gray-200 text-black px-[16px] py-[12px] rounded-[12px] font-[900] w-fit">
              Add Custom
            </button>
          </div>
        </div>

        {showAddModal ? (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4">
    <div className="w-full max-w-[560px] rounded-2xl bg-white p-5 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Add Menu Item</div>
        <button onClick={closeAddModal} className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold">
          Close
        </button>
      </div>

      {addMode === "existing" ? (
        <div className="mt-4 grid grid-cols-1 gap-4">
          <label className="flex flex-col gap-[6px]">
            <span className="font-[700]">Choose existing item</span>
            <select
              value={existingItemId}
              onChange={(e) => setExistingItemId(e.target.value)}
              className="border p-[10px] rounded-[10px]"
            >
              <option value="">Choose existing item...</option>
              {EXISTING_PAGES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>

          {existingItemId ? (
            <label className="flex flex-col gap-[6px]">
              <span className="font-[700]">Sections inside this item</span>
              <select
                value={existingSectionId}
                onChange={(e) => setExistingSectionId(e.target.value)}
                className="border p-[10px] rounded-[10px]"
                disabled={!existingSections.length}
              >
                <option value="">{existingSections.length ? "Choose a section..." : "No sections for this item"}</option>
                {existingSections.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <div className="rounded-xl bg-gray-50 p-3 text-sm">
            <div className="font-semibold mb-1">Preview</div>
            <div className="break-all">{computedExistingUrl || "-"}</div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button onClick={closeAddModal} className="rounded-xl bg-gray-100 px-4 py-2 font-semibold">
              Cancel
            </button>

            <button
              onClick={addExistingItem}
              disabled={!selectedExistingItem || (existingSections.length > 0 && !selectedExistingSection)}
              className={`rounded-xl px-4 py-2 font-semibold ${
                !selectedExistingItem || (existingSections.length > 0 && !selectedExistingSection)
                  ? "bg-gray-200 text-gray-500"
                  : "bg-[#28509E] text-white"
              }`}
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="text-sm text-gray-700">
            Use the fields in the form above, then click Add Custom to add to the draft.
          </div>
        </div>
      )}
    </div>
  </div>
) : null}



        {addMode === "existing" ? (
  <div className="mt-4 grid grid-cols-1 gap-4">
    <label className="flex flex-col gap-[6px]">
      <span className="font-[700]">Choose existing item</span>
      <select
        value={existingItemId}
        onChange={(e) => setExistingItemId(e.target.value)}
        className="border p-[10px] rounded-[10px]"
      >
        <option value="">Choose existing item...</option>
{EXISTING_PAGES.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>
    </label>

    {existingItemId ? (
      <label className="flex flex-col gap-[6px]">
        <span className="font-[700]">Sections inside this item</span>
        <select
          value={existingSectionId}
          onChange={(e) => setExistingSectionId(e.target.value)}
          className="border p-[10px] rounded-[10px]"
          disabled={!existingSections.length}
        >
          <option value="">
            {existingSections.length ? "Choose a section..." : "No sections for this item"}
          </option>
          {existingSections.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
    ) : null}

    <div className="rounded-xl bg-gray-50 p-3 text-sm">
      <div className="font-semibold mb-1">Preview</div>
      <div className="break-all">{computedExistingUrl || "-"}</div>
    </div>

    <div className="flex items-center justify-end gap-2">
      <button onClick={closeAddModal} className="rounded-xl bg-gray-100 px-4 py-2 font-semibold">
        Cancel
      </button>

      <button
        onClick={addExistingItem}
        disabled={
          !selectedExistingItem ||
          (existingSections.length > 0 && !selectedExistingSection)
        }
        className={`rounded-xl px-4 py-2 font-semibold ${
          !selectedExistingItem || (existingSections.length > 0 && !selectedExistingSection)
            ? "bg-gray-200 text-gray-500"
            : "bg-[#28509E] text-white"
        }`}
      >
        Add
      </button>
    </div>
  </div>
) : (
  <div className="mt-4">
    <div className="text-sm text-gray-700">Use the fields in the form above, then click Add Custom to add to the draft.</div>
  </div>
)}


        <div className="grid grid-cols-1 gap-[12px]">
          {navItemsSorted.map((it) => (
            <div key={it.id} className="border rounded-[14px] p-[14px]">
              <div className="flex flex-wrap items-center justify-between gap-[10px] mb-[10px]">
                <div className="flex flex-wrap items-center gap-[10px]">
                  <span className="text-[13px] bg-gray-100 px-[10px] py-[6px] rounded-[999px] font-[800]">{it.id}</span>
                  <span className="text-[13px] bg-gray-100 px-[10px] py-[6px] rounded-[999px] font-[800]">{it.kind}</span>
                  {it.labelKey ? <span className="text-[13px] bg-gray-100 px-[10px] py-[6px] rounded-[999px] font-[800]">{it.labelKey}</span> : null}
                </div>

                <div className="flex flex-wrap gap-[8px]">
                  <button onClick={() => moveItem(it.id, "up")} className="bg-gray-200 px-[12px] py-[8px] rounded-[10px] font-[800]">
                    Up
                  </button>
                  <button onClick={() => moveItem(it.id, "down")} className="bg-gray-200 px-[12px] py-[8px] rounded-[10px] font-[800]">
                    Down
                  </button>
                  <button onClick={() => removeItem(it.id)} className="bg-red-600 text-white px-[12px] py-[8px] rounded-[10px] font-[800]">
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
                <label className="flex items-center gap-[10px]">
                  <input type="checkbox" checked={it.enabled !== false} onChange={(e) => setItemField(it.id, "enabled", e.target.checked)} />
                  <span className="font-[800]">Enabled</span>
                </label>

                <label className="flex flex-col gap-[6px]">
                  <span className="font-[800]">Order</span>
                  <input type="number" value={it.order ?? 0} onChange={(e) => setItemField(it.id, "order", Number(e.target.value))} className="border p-[10px] rounded-[10px]" />
                </label>

                {it.kind === "route" ? (
                  <label className="flex flex-col gap-[6px]">
                    <span className="font-[800]">Path</span>
                    <input value={it.path || ""} onChange={(e) => setItemField(it.id, "path", e.target.value)} className="border p-[10px] rounded-[10px]" disabled={!!it.labelKey && it.id === "home"} />
                  </label>
                ) : (
                  <label className="flex flex-col gap-[6px]">
                    <span className="font-[800]">Target Section ID</span>
                    <input value={it.targetId || ""} onChange={(e) => setItemField(it.id, "targetId", e.target.value)} className="border p-[10px] rounded-[10px]" />
                  </label>
                )}

                <label className="flex flex-col gap-[6px]">
                  <span className="font-[800]">Label EN</span>
                  <input value={(it.label && it.label.en) || ""} onChange={(e) => setItemLabelField(it.id, "en", e.target.value)} className="border p-[10px] rounded-[10px]" disabled={!!it.labelKey} />
                </label>

                <label className="flex flex-col gap-[6px]">
                  <span className="font-[800]">Label FR</span>
                  <input value={(it.label && it.label.fr) || ""} onChange={(e) => setItemLabelField(it.id, "fr", e.target.value)} className="border p-[10px] rounded-[10px]" disabled={!!it.labelKey} />
                </label>

                <label className="flex flex-col gap-[6px]">
                  <span className="font-[800]">Label AR</span>
                  <input value={(it.label && it.label.ar) || ""} onChange={(e) => setItemLabelField(it.id, "ar", e.target.value)} className="border p-[10px] rounded-[10px]" disabled={!!it.labelKey} />
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-[12px] mt-[16px]">
          <button onClick={saveNav} className="bg-[#28509E] text-white px-[16px] py-[12px] rounded-[12px] font-[900] w-fit">
            Save Menu
          </button>

          <button
            onClick={() => {
              resetNav()
              alert("Menu reset to defaults")
            }}
            className="bg-gray-200 text-black px-[16px] py-[12px] rounded-[12px] font-[900] w-fit"
          >
            Reset Menu
          </button>
        </div>
      </section>
    </main>
  )
}

export default AdminHomeEditor
