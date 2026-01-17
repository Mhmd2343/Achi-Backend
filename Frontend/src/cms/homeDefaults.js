// Frontend/src/cms/homeDefaults.js
export const HOME_CONFIG_STORAGE_KEY = "achi_home_config_v1"

export const DEFAULT_HOME_CONFIG = {
  seo: {
    title: "Industrial & Construction Scaffolding Systems | ACHI",
    description:
      "ACHI Scaffolding delivers access systems, shoring, and scaffolding solutions for construction, restoration, and industrial projects. Request technical consultation.",
    canonical: "https://achiscaffolding.com/"
  },
  srOnly: {
    h1: "Industrial & Construction Scaffolding Systems Built for Safety, Precision, and Scale",
    p1: "ACHI Scaffolding delivers professional scaffolding systems and access solutions for construction, restoration, and industrial projects.",
    p2: "We support contractors, developers, and engineers with compliant equipment, technical know-how, and execution-ready solutions — from standard access to complex shoring and propping systems.",
    servicesSnapshot: {
      title: "Services Snapshot",
      items: [
        "Scaffolding supply & installation",
        "Access systems for restoration & façades",
        "Shoring and structural propping",
        "Project-specific scaffolding solutions",
      ],
      cta: "CTA: Request Technical Consultation",
    },
    whyAchi: {
      title: "Why ACHI Scaffolding",
      items: [
        "Operational experience, not theoretical design",
        "Safety-driven systems aligned with site constraints",
        "Reliable execution for time-sensitive projects",
        "Clear technical communication with contractors and engineers",
      ],
    },
    industries: {
      title: "Industries Served",
      items: [
        "Construction & general contracting",
        "Building restoration & renovation",
        "Industrial facilities & plants",
        "Residential and commercial developments",
      ],
    },
    internalLinks: {
      title: "Internal Links Section",
      links: [
        { label: "View Scaffolding Systems & Equipment", href: "/products" },
        { label: "Explore Project Experience", href: "/projects" },
        { label: "Learn About Scaffolding Systems", href: "/services" },
      ],
    },
  },
  floatingButtons: {
    phone: {
      href: "tel:+96103322811",
      ariaLabel: "Call ACHI Scaffolding +96103322811",
    },
    whatsapp: {
      href: "https://wa.me/+96103322811",
      ariaLabel: "WhatsApp ACHI Scaffolding",
      imgAlt: "WhatsApp",
      imgSrc: "/assets/logos_whatsapp-icon.png",
    },
  },
  sections: {
    hero: {
      enabled: true,
      whatsappHref: "https://wa.me/+96103322811",
    },
    projects: { enabled: true },
    services: { enabled: true },
    company: { enabled: true },
    clients: { enabled: true },
    whyChooseUs: { enabled: true },
    sectorsBar: { enabled: true },
    testimonials: { enabled: true },
    blog: { enabled: true },
    contact: { enabled: true },
  },
  countryLinks: {
    Lebanon: {
      heroWhatsappHref: "https://wa.me/+96103322811",
      phoneHref: "tel:+96103322811",
      whatsappHref: "https://wa.me/+96103322811",
    },
  },
}
