import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'sv' | 'en';

interface Translation {
  sv: string;
  en: string;
}

interface Translations {
  [key: string]: Translation;
}

const translations: Translations = {
  // Navigation
  'nav.demo': { sv: 'Demo', en: 'Demo' },
  'nav.features': { sv: 'Funktioner', en: 'Features' },
  'nav.pricing': { sv: 'Priser', en: 'Pricing' },
  'nav.contact': { sv: 'Kontakt', en: 'Contact' },
  'nav.signIn': { sv: 'Logga in', en: 'Sign In' },
  'nav.getStarted': { sv: 'Kom igång', en: 'Get Started' },
  'nav.dashboard': { sv: 'Dashboard', en: 'Dashboard' },
  'nav.settings': { sv: 'Inställningar', en: 'Settings' },
  'nav.signOut': { sv: 'Logga ut', en: 'Sign Out' },

  // Hero Section
  'hero.title': { 
    sv: 'Upplev framtiden för interaktiva demos', 
    en: 'Experience the Future of Interactive Demos' 
  },
  'hero.subtitle': { 
    sv: 'Upptäck hur Alva transformerar användarupplevelser genom intelligenta, interaktiva demonstrationer som anpassar sig till dina behov.', 
    en: 'Discover how Alva transforms user experiences through intelligent, interactive demonstrations that adapt to your needs.' 
  },
  'hero.startDemo': { sv: 'Starta interaktiv demo', en: 'Start Interactive Demo' },
  'hero.watchPreview': { sv: 'Se förhandsvisning', en: 'Watch Preview' },
  'hero.noSignup': { sv: '✨ Ingen registrering krävs • Interaktiv upplevelse på 2 minuter', en: '✨ No signup required • Interactive experience in 2 minutes' },

  // Interactive Demo
  'demo.title': { sv: 'Prova den', en: 'Try the' },
  'demo.titleHighlight': { sv: 'Interaktiva demon', en: 'Interactive Demo' },
  'demo.subtitle': { 
    sv: 'Upplev hur Alva skapar personliga användarresor. Klicka igenom stegen nedan för att se magin i aktion.', 
    en: 'Experience how Alva creates personalized user journeys. Click through the steps below to see the magic in action.' 
  },
  'demo.interactiveJourney': { sv: 'Interaktiv resa', en: 'Interactive Journey' },
  'demo.resetDemo': { sv: 'Återställ demo', en: 'Reset Demo' },
  'demo.step': { sv: 'Steg', en: 'Step' },
  'demo.of': { sv: 'av', en: 'of' },
  'demo.complete': { sv: 'Demo klar!', en: 'Demo Complete!' },
  'demo.congratulations': { 
    sv: 'Grattis! Du har slutfört den interaktiva demon.', 
    en: 'Congratulations! You\'ve completed the interactive demo.' 
  },
  'demo.tryAgain': { sv: 'Prova igen', en: 'Try Again' },

  // Demo Steps
  'step1.title': { sv: 'Välkommen till Alva', en: 'Welcome to Alva' },
  'step1.description': { sv: 'Låt oss börja din personliga interaktiva resa', en: 'Let\'s start your personalized interactive journey' },
  'step1.action': { sv: 'Klicka för att börja', en: 'Click to begin' },

  'step2.title': { sv: 'Smart introduktion', en: 'Smart Onboarding' },
  'step2.description': { sv: 'Upplev intelligent användarguiding', en: 'Experience intelligent user guidance' },
  'step2.action': { sv: 'Prova den smarta introduktionen', en: 'Try the smart onboarding' },

  'step3.title': { sv: 'Interaktiva funktioner', en: 'Interactive Features' },
  'step3.description': { sv: 'Utforska dynamisk innehållsanpassning', en: 'Explore dynamic content adaptation' },
  'step3.action': { sv: 'Interagera med funktioner', en: 'Interact with features' },

  'step4.title': { sv: 'Personlig upplevelse', en: 'Personalized Experience' },
  'step4.description': { sv: 'Se hur innehållet anpassar sig till dina preferenser', en: 'See how content adapts to your preferences' },
  'step4.action': { sv: 'Slutför personalisering', en: 'Complete personalization' },

  // Features
  'features.title': { sv: 'Kraftfulla', en: 'Powerful' },
  'features.titleHighlight': { sv: 'Funktioner', en: 'Features' },
  'features.subtitle': { 
    sv: 'Allt du behöver för att skapa engagerande, interaktiva upplevelser som konverterar besökare till kunder.', 
    en: 'Everything you need to create engaging, interactive experiences that convert visitors into customers.' 
  },

  // Feature Items
  'feature.lightning.title': { sv: 'Blixtsnabb', en: 'Lightning Fast' },
  'feature.lightning.desc': { sv: 'Omedelbara interaktioner utan laddningstid för sömlösa användarupplevelser.', en: 'Instant interactions with zero loading time for seamless user experiences.' },

  'feature.userCentric.title': { sv: 'Användarcentrerad design', en: 'User-Centric Design' },
  'feature.userCentric.desc': { sv: 'Adaptiva gränssnitt som lär sig och utvecklas med användarbeteendemönster.', en: 'Adaptive interfaces that learn and evolve with user behavior patterns.' },

  'feature.analytics.title': { sv: 'Avancerad analys', en: 'Advanced Analytics' },
  'feature.analytics.desc': { sv: 'Djupa insikter i användarresor och interaktionsmönster.', en: 'Deep insights into user journeys and interaction patterns.' },

  'feature.security.title': { sv: 'Företagssäkerhet', en: 'Enterprise Security' },
  'feature.security.desc': { sv: 'Banknivå säkerhet med end-to-end kryptering och efterlevnad.', en: 'Bank-level security with end-to-end encryption and compliance.' },

  'feature.mobile.title': { sv: 'Mobiloptimerad', en: 'Mobile Optimized' },
  'feature.mobile.desc': { sv: 'Perfekt upplevelse på alla enheter och skärmstorlekar.', en: 'Perfect experience across all devices and screen sizes.' },

  'feature.workflow.title': { sv: 'Arbetsflödesintegration', en: 'Workflow Integration' },
  'feature.workflow.desc': { sv: 'Integreras sömlöst med dina befintliga verktyg och arbetsflöden.', en: 'Seamlessly integrates with your existing tools and workflows.' },

  // CTA Section
  'cta.title': { sv: 'Redo att transformera din', en: 'Ready to Transform Your' },
  'cta.titleHighlight': { sv: 'Användarupplevelse?', en: 'User Experience?' },
  'cta.subtitle': { 
    sv: 'Gå med tusentals företag som redan använder Alva för att skapa engagerande, interaktiva upplevelser som ger resultat.', 
    en: 'Join thousands of companies already using Alva to create engaging, interactive experiences that drive results.' 
  },
  'cta.startTrial': { sv: 'Starta din kostnadsfria provperiod', en: 'Start Your Free Trial' },
  'cta.scheduleDemo': { sv: 'Boka en demo', en: 'Schedule a Demo' },
  'cta.freeTrial': { sv: 'Gratis 14-dagars provperiod', en: 'Free 14-day trial' },
  'cta.noCard': { sv: 'Inget kreditkort krävs', en: 'No credit card required' },
  'cta.setupMinutes': { sv: 'Installation på minuter', en: 'Setup in minutes' },

  // Contact Page
  'contact.title': { sv: 'Kontakta', en: 'Get in Touch' },
  'contact.titleHighlight': { sv: 'Alva', en: 'with Alva' },
  'contact.subtitle': { 
    sv: 'Har du frågor? Vill se en demo? Eller redo att börja? Vi skulle gärna höra från dig.', 
    en: 'Have questions? Want to see a demo? Or ready to get started? We\'d love to hear from you.' 
  },
  'contact.form.title': { sv: 'Skicka oss ett meddelande', en: 'Send us a message' },
  'contact.form.name': { sv: 'Namn', en: 'Name' },
  'contact.form.namePlaceholder': { sv: 'Ditt fullständiga namn', en: 'Your full name' },
  'contact.form.email': { sv: 'E-post', en: 'Email' },
  'contact.form.emailPlaceholder': { sv: 'din.epost@foretag.se', en: 'your.email@company.com' },
  'contact.form.company': { sv: 'Företag', en: 'Company' },
  'contact.form.companyPlaceholder': { sv: 'Ditt företagsnamn', en: 'Your company name' },
  'contact.form.subject': { sv: 'Ämne', en: 'Subject' },
  'contact.form.subjectPlaceholder': { sv: 'Vad kan vi hjälpa dig med?', en: 'What can we help you with?' },
  'contact.form.message': { sv: 'Meddelande', en: 'Message' },
  'contact.form.messagePlaceholder': { sv: 'Berätta mer om dina behov...', en: 'Tell us more about your needs...' },
  'contact.form.send': { sv: 'Skicka meddelande', en: 'Send Message' },
  'contact.form.success': { sv: 'Meddelande skickat!', en: 'Message Sent!' },
  'contact.form.successMessage': { sv: 'Tack för ditt meddelande. Vi återkommer snart.', en: 'Thank you for your message. We\'ll get back to you soon.' },
  'contact.info.title': { sv: 'Kontaktinformation', en: 'Contact Information' },
  'contact.info.email': { sv: 'E-post', en: 'Email' },
  'contact.info.phone': { sv: 'Telefon', en: 'Phone' },
  'contact.info.location': { sv: 'Plats', en: 'Location' },
  'contact.support.title': { sv: 'Supporttider', en: 'Support Hours' },
  'contact.support.description': { sv: 'Vårt team är här för att hjälpa dig lyckas med Alva.', en: 'Our team is here to help you succeed with Alva.' },
  'contact.support.hours': { sv: 'Arbetstider', en: 'Business Hours' },
  'contact.support.response': { sv: 'Svarstid', en: 'Response Time' },
  'contact.support.languages': { sv: 'Språk', en: 'Languages' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};