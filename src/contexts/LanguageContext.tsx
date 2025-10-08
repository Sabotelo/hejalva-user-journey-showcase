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
  'nav.roi': { sv: 'ROI & Värde', en: 'ROI & Value' },
  'nav.contact': { sv: 'Kontakt', en: 'Contact' },
  'nav.signIn': { sv: 'Logga in', en: 'Sign In' },
  'nav.getStarted': { sv: 'Kom igång', en: 'Get Started' },
  'nav.dashboard': { sv: 'Dashboard', en: 'Dashboard' },
  'nav.settings': { sv: 'Inställningar', en: 'Settings' },
  'nav.signOut': { sv: 'Logga ut', en: 'Sign Out' },

  // Hero Section
  'hero.title': { 
    sv: 'Din AI-receptionist som aldrig missar ett samtal', 
    en: 'Your AI Receptionist That Never Misses a Call' 
  },
  'hero.subtitle': { 
    sv: 'Alva svarar automatiskt på alla dina affärssamtal 24/7, bokar möten och fångar varje möjlighet - så att du kan fokusera på det som verkligen driver din verksamhet framåt.', 
    en: 'Alva automatically answers all your business calls 24/7, books appointments, and captures every opportunity - so you can focus on what truly drives your business forward.' 
  },
  'hero.startDemo': { sv: 'Boka en 15-minuters demo', en: 'Request a 15-Minute Demo' },
  'hero.watchPreview': { sv: 'Se förhandsvisning', en: 'Watch Preview' },
  'hero.noSignup': { sv: '✨ Ingen registrering krävs • Se Alva i aktion', en: '✨ No signup required • See Alva in action' },

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
  'features.title': { sv: 'Kraftfulla', en: 'Turn Your Phone Into' },
  'features.titleHighlight': { sv: 'Funktioner', en: 'Your Best Employee' },
  'features.subtitle': { 
    sv: 'Allt du behöver för att aldrig missa en kund igen. Automatisk svarsservice, mötesbokning och sammanfattningar - dygnet runt.', 
    en: 'Everything you need to never miss a customer again. Automated answering, appointment booking, and call summaries - 24/7.' 
  },

  // Feature Items
  'feature.lightning.title': { sv: '100% Samtalsupptagning', en: '100% Call Capture' },
  'feature.lightning.desc': { sv: 'Alva svarar omedelbart på varje samtal, varje gång. Inga missade möjligheter någonsin.', en: 'Alva answers instantly, every time. No missed opportunities ever.' },

  'feature.userCentric.title': { sv: 'Automatisk Mötesbokning', en: 'Automated Appointment Booking' },
  'feature.userCentric.desc': { sv: 'Alva kollar din kalender och bokar möten åt dig, sparar timmar av administrativt arbete.', en: 'Alva checks your calendar and books appointments for you, saving hours of admin time.' },

  'feature.analytics.title': { sv: 'Samtalssammanfattningar', en: 'Call Summaries' },
  'feature.analytics.desc': { sv: 'Få en koncis sammanfattning av varje konversation skickad direkt till din e-post.', en: 'Get a concise summary of every conversation sent directly to your email.' },

  'feature.security.title': { sv: 'Professionellt Intryck', en: 'Professional First Impression' },
  'feature.security.desc': { sv: 'Hälsa varje kund med en tydlig, artig röst som speglar kvaliteten på din verksamhet.', en: 'Greet every customer with a clear, polite voice that reflects the quality of your business.' },

  'feature.mobile.title': { sv: '24/7 Tillgänglighet', en: '24/7 Availability' },
  'feature.mobile.desc': { sv: 'Aldrig stängt. Alva arbetar dygnet runt, även när du sover eller är upptagen.', en: 'Never closed. Alva works round the clock, even when you\'re asleep or busy.' },

  'feature.workflow.title': { sv: 'Kalenderintegration', en: 'Calendar Integration' },
  'feature.workflow.desc': { sv: 'Integreras sömlöst med din befintliga kalender och arbetsflöden.', en: 'Seamlessly integrates with your existing calendar and workflows.' },

  // CTA Section
  'cta.title': { sv: 'Redo att förvandla din telefon till', en: 'Ready to Turn Your Phone Into' },
  'cta.titleHighlight': { sv: 'din bästa anställda?', en: 'Your Best Employee?' },
  'cta.subtitle': { 
    sv: 'Sluta förlora kunder till din röstbrevlåda. Låt Alva förvandla varje samtal till en affärsmöjlighet.', 
    en: 'Stop losing customers to your voicemail. Let Alva turn every call into a business opportunity.' 
  },
  'cta.startTrial': { sv: 'Starta din kostnadsfria provperiod', en: 'Start Your Free Trial' },
  'cta.scheduleDemo': { sv: 'Boka en demo', en: 'Request a Demo' },
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