import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://hejalva.com";

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
}

const pageMeta: Record<string, { sv: PageMeta; en: PageMeta }> = {
  "/": {
    sv: {
      title: "Alva AI – AI-receptionist för svenska företag",
      description: "Missa aldrig ett samtal igen. Alva svarar dygnet runt, bokar möten och ger professionell service på flytande svenska.",
      canonical: `${BASE_URL}/`,
    },
    en: {
      title: "Alva AI – AI Receptionist for Swedish Businesses",
      description: "Never miss a call again. Alva answers 24/7, books appointments and provides professional service in fluent Swedish.",
      canonical: `${BASE_URL}/`,
    },
  },
  "/about": {
    sv: {
      title: "Om oss – Mimer Technologies | Alva AI",
      description: "Lär känna teamet bakom Alva AI. Mimer Technologies bygger AI-verktyg för svenska företag. GDPR-kompatibelt, partnersskap med ElevenLabs.",
      canonical: `${BASE_URL}/about`,
    },
    en: {
      title: "About Us – Mimer Technologies | Alva AI",
      description: "Meet the team behind Alva AI. Mimer Technologies builds AI tools for Swedish businesses. GDPR compliant, ElevenLabs partnership.",
      canonical: `${BASE_URL}/about`,
    },
  },
};

export const usePageMeta = (language: string) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const lang = language === "sv" ? "sv" : "en";
    const meta = pageMeta[pathname]?.[lang] || pageMeta["/"]![lang];

    document.title = meta.title;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", meta.description);
    setMeta("og:title", meta.title, "property");
    setMeta("og:description", meta.description, "property");
    setMeta("og:url", meta.canonical, "property");
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", meta.canonical);
  }, [pathname, language]);
};
