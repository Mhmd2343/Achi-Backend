// Frontend/src/cms/pageSectionsRegistry.js
const pageSectionsRegistry = {
  home: {
    label: "Home",
    path: "/",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "projects", label: "Projects" },
      { id: "services", label: "Services" },
      { id: "company", label: "Company" },
      { id: "clients", label: "Clients" },
      { id: "why", label: "Why Choose Us" },
      { id: "sectors", label: "Sectors" },
      { id: "testimonials", label: "Testimonials" },
      { id: "blog", label: "Blog" },
      { id: "contactform", label: "Contact Form" }
    ]
  },

  about: { label: "About", path: "/about", sections: [] },
  services: { label: "Services", path: "/services", sections: [] },
  sectors: { label: "Sectors", path: "/sectors", sections: [] },
  projects: { label: "Projects", path: "/projects", sections: [] },
  blog: { label: "Blog", path: "/blog", sections: [] },
  gallery: { label: "Gallery", path: "/gallery", sections: [] }
}

export default pageSectionsRegistry
