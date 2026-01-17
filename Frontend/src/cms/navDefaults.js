const navDefaults = {
  version: 1,
  items: [
    { id: "home", kind: "route", path: "/", labelKey: "nav.home", order: 10, enabled: true },
    { id: "about", kind: "route", path: "/about", labelKey: "nav.about", order: 20, enabled: true },
    { id: "services", kind: "route", path: "/services", labelKey: "nav.services", order: 30, enabled: true },
    { id: "sectors", kind: "route", path: "/sectors", labelKey: "nav.sectors", order: 40, enabled: true },
    { id: "clients", kind: "section", targetId: "clients", labelKey: "nav.clients", order: 50, enabled: true },
    { id: "projects", kind: "route", path: "/projects", labelKey: "nav.projects", order: 60, enabled: true },
    { id: "blog", kind: "route", path: "/blog", labelKey: "nav.blog", order: 70, enabled: true },
    { id: "gallery", kind: "route", path: "/gallery", labelKey: "nav.gallery", order: 80, enabled: true },
    { id: "contact", kind: "section", targetId: "contactForm", labelKey: "nav.contact", order: 999, enabled: true }
  ]
}

export default navDefaults
