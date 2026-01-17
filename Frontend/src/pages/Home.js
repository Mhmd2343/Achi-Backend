// src/pages/Home.js
import React from "react"
import Company from "../components/Company"
import ContactForm from "../components/ContactForm"
import Hero from "../components/Hero"
import ServiceSection from "../components/services/ServiceSection"
import ProjectsOverview from "../components/projects/ProjectsOverview"
import WhyChoseUs from "../components/WhyChoseUs"
import Clients from "../components/Clients"
import Testimonials from "../components/Testimonials"
import BlogSection from "../components/BlogSection"
import SectorsBar from "../components/SectorsBar"
import SEO from "../components/SEO"
import SmartLink from "../seo/SmartLink"

const Home = ({ showMenu, setshowMenu, direction, userLang }) => {
  const ASSET = process.env.PUBLIC_URL || ""

  return (
    <main>
      <SEO
        title="Industrial & Construction Scaffolding Systems | ACHI"
        description="ACHI Scaffolding delivers access systems, shoring, and scaffolding solutions for construction, restoration, and industrial projects. Request technical consultation."
        canonical="https://achi-scaffolding.github.io/"
      />
      <div className="sr-only">
        <h1>Industrial &amp; Construction Scaffolding Systems Built for Safety, Precision, and Scale</h1>

        <p>
          ACHI Scaffolding delivers professional scaffolding systems and access solutions for construction, restoration, and industrial projects.
        </p>
        <p>
          We support contractors, developers, and engineers with compliant equipment, technical know-how, and execution-ready solutions — from standard access to complex shoring and propping systems.
        </p>

        <section aria-label="Services snapshot">
          <h2>Services Snapshot</h2>
          <ul>
            <li>Scaffolding supply &amp; installation</li>
            <li>Access systems for restoration &amp; façades</li>
            <li>Shoring and structural propping</li>
            <li>Project-specific scaffolding solutions</li>
          </ul>
          <p>CTA: Request Technical Consultation</p>
        </section>

        <section aria-label="Why ACHI Scaffolding">
          <h2>Why ACHI Scaffolding</h2>
          <ul>
            <li>Operational experience, not theoretical design</li>
            <li>Safety-driven systems aligned with site constraints</li>
            <li>Reliable execution for time-sensitive projects</li>
            <li>Clear technical communication with contractors and engineers</li>
          </ul>
        </section>

        <section aria-label="Industries served">
          <h2>Industries Served</h2>
          <ul>
            <li>Construction &amp; general contracting</li>
            <li>Building restoration &amp; renovation</li>
            <li>Industrial facilities &amp; plants</li>
            <li>Residential and commercial developments</li>
          </ul>
        </section>

        <nav aria-label="Internal links">
          <h2>Internal Links Section</h2>
          <ul>
            <li>
              <SmartLink to="/products">View Scaffolding Systems & Equipment</SmartLink>
            </li>
            <li>
              <SmartLink to="/projects">Explore Project Experience</SmartLink>
            </li>
            <li>
              <SmartLink to="/services">Learn About Scaffolding Systems</SmartLink>
            </li>
          </ul>
        </nav>
      </div>

      <a
        href="tel:+96103322811"
        className="fixed right-[40px] bottom-[120px] md:bottom-[140px] z-[999999] rounded-full bg-[#28509E] hover:bg-[#214f9b] transition-colors duration-300 flex items-center justify-center shadow-lg w-[50px] h-[50px] md:w-[60px] md:h-[60px] border-4 border-white callbutton"
        aria-label="Call ACHI Scaffolding +96103322811"
      >
        <svg
          className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "scaleX(-1)" }}
        >
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      </a>

      <a
        href="https://wa.me/+96103322811"
        target="_blank"
        rel="noreferrer"
        className="fixed right-[40px] bottom-[40px] z-[999999] rounded-full whatsapplogo"
        aria-label="WhatsApp ACHI Scaffolding"
      >
        <img className="w-[50px] h-[50px] md:w-[60px] md:h-[60px]" src={`${ASSET}/assets/logos_whatsapp-icon.png`} alt="WhatsApp" />
      </a>

      <Hero showMenu={showMenu} setshowMenu={setshowMenu} direction={direction} userLang={userLang} />
      <ProjectsOverview />
      <ServiceSection />
      <Company />
      <Clients direction={direction} />
      <WhyChoseUs direction={direction} />
      <SectorsBar />
      <Testimonials direction={direction} />
      <BlogSection />
      <ContactForm />
    </main>
  )
}

export default Home
