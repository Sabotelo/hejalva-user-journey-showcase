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
  'contact.support.languages': { sv: 'Språk', en: 'Languages' },

  // ROI Page - Hero
  'roi.hero.title': { 
    sv: 'Frigör den fulla potentialen av', 
    en: 'Unlock the Full Potential of' 
  },
  'roi.hero.titleHighlight': { 
    sv: 'din företagstelefon', 
    en: 'Your Business Phone' 
  },
  'roi.hero.subtitle': { 
    sv: 'En guide för ambitiösa små och medelstora företag.', 
    en: 'A guide for ambitious small and medium-sized businesses.' 
  },

  // ROI Page - Intro
  'roi.intro.title': { 
    sv: 'Introduktion: SME-ägarens dilemma', 
    en: 'Introduction: The SME Owner\'s Dilemma' 
  },
  'roi.intro.p1': { 
    sv: 'Som företagare är din telefon ett tveeggat svärd. Det är din direkta linje till nya kunder och kritiska möjligheter. Men det är också din största källa till avbrott, som drar dig bort från det kärnarbete som driver din verksamhet framåt.', 
    en: 'As a business owner, your phone is a double-edged sword. It\'s your direct line to new customers and critical opportunities. But it\'s also your biggest source of interruptions, pulling you away from the core work that drives your business forward.' 
  },
  'roi.intro.p2': { 
    sv: 'Du tvingas ständigt välja: svara på samtalet och förlora fokus, eller ignorera det och riskera att förlora en kund för alltid.', 
    en: 'You\'re constantly forced to choose: answer the call and lose focus, or ignore it and risk losing a customer forever.' 
  },
  'roi.intro.p3': { 
    sv: 'Denna rapport kvantifierar den verkliga kostnaden för detta dilemma och introducerar ett nytt sätt att arbeta. Ett sätt där du kan fånga varje möjlighet utan att offra ditt fokus, och förvandla din telefon från en stressfaktor till din mest värdefulla tillgång.', 
    en: 'This report quantifies the real cost of this dilemma and introduces a new way to operate. A way where you can capture every opportunity without sacrificing your focus, turning your phone from a source of stress into your most valuable asset.' 
  },

  // ROI Page - Challenge
  'roi.challenge.title': { 
    sv: 'Utmaningen: Den verkliga kostnaden av ett missat samtal', 
    en: 'The Challenge: The True Cost of a Missed Call' 
  },
  'roi.challenge.intro': { 
    sv: 'Branschdata är tydlig:', 
    en: 'Industry data is clear:' 
  },
  'roi.challenge.stat': { 
    sv: 'över 60% av samtalen till småföretag förblir obesvarade', 
    en: 'over 60% of calls to small businesses go unanswered' 
  },
  'roi.challenge.statSuffix': { 
    sv: '. Vart och ett av dessa samtal är inte bara en missad kontakt; det är en påtaglig förlust.', 
    en: '. Each one of those calls isn\'t just a missed connection; it\'s a tangible loss.' 
  },
  'roi.challenge.lostRevenue': { 
    sv: 'Förlorad intäkt', 
    en: 'Lost Revenue' 
  },
  'roi.challenge.lostRevenueDesc': { 
    sv: 'En ny kund som omedelbart ringer din konkurrent.', 
    en: 'A new customer who immediately calls your competitor.' 
  },
  'roi.challenge.damagedRep': { 
    sv: 'Skadat rykte', 
    en: 'Damaged Reputation' 
  },
  'roi.challenge.damagedRepDesc': { 
    sv: 'En befintlig kund som känner att deras affärer inte värderas.', 
    en: 'An existing customer who feels their business isn\'t valued.' 
  },
  'roi.challenge.interruptions': { 
    sv: 'Konstanta avbrott', 
    en: 'Constant Interruptions' 
  },
  'roi.challenge.interruptionsDesc': { 
    sv: 'Din egen värdefulla tid och fokus, splittrad av behovet att vara din egen receptionist.', 
    en: 'Your own valuable time and focus, shattered by the need to be your own receptionist.' 
  },
  'roi.challenge.footer': { 
    sv: 'Din telefonoperatör ser till att samtalet kommer fram.', 
    en: 'Your phone service ensures the call gets through.' 
  },
  'roi.challenge.footerHighlight': { 
    sv: 'Alva ser till att möjligheten fångas.', 
    en: 'Alva ensures the opportunity is captured.' 
  },

  // ROI Page - Opportunity Cost
  'roi.opportunity.title': { 
    sv: 'Möjlighetskostnaden', 
    en: 'The Opportunity Cost' 
  },
  'roi.opportunity.subtitle': { 
    sv: 'Vad kostar missade samtal egentligen din verksamhet?', 
    en: 'What are missed calls actually costing your business?' 
  },
  'roi.opportunity.assumption': { 
    sv: 'Antagande', 
    en: 'Assumption' 
  },
  'roi.opportunity.assumptionText': { 
    sv: 'Genomsnittligt kundvärde:', 
    en: 'Average customer value:' 
  },
  'roi.opportunity.scenario': {
    sv: 'Om din verksamhet missar bara 4 samtal per dag (84 per månad) och du konverterar bara 5% av dessa till kunder till 3,000 SEK vardera:', 
    en: 'If your business misses just 4 calls per day (84 per month) and you convert only 5% of these into customers at 3,000 SEK each:' 
  },
  'roi.opportunity.missedPerDay': { 
    sv: 'missade samtal/dag', 
    en: 'missed calls/day' 
  },
  'roi.opportunity.perMonth': { 
    sv: 'per månad', 
    en: 'per month' 
  },
  'roi.opportunity.conversionRate': { 
    sv: 'konverteringsgrad', 
    en: 'conversion rate' 
  },
  'roi.opportunity.impact': { 
    sv: 'Det blir 4 nya kunder per månad × 3,000 SEK × 12 månader =', 
    en: 'That\'s 4 new customers per month × 3,000 SEK × 12 months =' 
  },
  'roi.opportunity.additionalRevenue': { 
    sv: 'i ytterligare årlig intäkt', 
    en: 'in additional annual revenue' 
  },

  // ROI Page - Solution
  'roi.solution.title': { 
    sv: 'Lösningen:', 
    en: 'The Solution:' 
  },
  'roi.solution.titleHighlight': { 
    sv: 'Alva – Din intelligenta AI-receptionist', 
    en: 'Alva – Your Intelligent AI Receptionist' 
  },
  'roi.solution.subtitle': { 
    sv: 'Alva är en AI-driven receptionist särskilt utformad för SME. Hon integreras med ditt befintliga företagsnummer för att ge ett omedelbart, intelligent och professionellt svar på varje enskilt samtal, 24/7.', 
    en: 'Alva is an AI-driven receptionist designed specifically for SMEs. She integrates with your existing business number to provide an immediate, intelligent, and professional response to every single call, 24/7.' 
  },
  'roi.solution.callCapture': { 
    sv: '100% Samtalsupptagning', 
    en: '100% Call Capture' 
  },
  'roi.solution.callCaptureDesc': { 
    sv: 'Missa aldrig ett samtal igen. Alva svarar omedelbart, varje gång.', 
    en: 'Never miss a call again. Alva answers instantly, every time.' 
  },
  'roi.solution.booking': { 
    sv: 'Automatisk mötesbokning', 
    en: 'Automated Appointment Booking' 
  },
  'roi.solution.bookingDesc': { 
    sv: 'Alva kollar din kalender och bokar möten åt dig, sparar timmar av administrativt arbete.', 
    en: 'Alva checks your calendar and books appointments for you, saving hours of admin time.' 
  },
  'roi.solution.impression': { 
    sv: 'Professionellt första intryck', 
    en: 'Professional First Impression' 
  },
  'roi.solution.impressionDesc': { 
    sv: 'Hälsa varje kund med en tydlig, artig och hjälpsam röst som speglar kvaliteten på din verksamhet.', 
    en: 'Greet every customer with a clear, polite, and helpful voice that reflects the quality of your business.' 
  },
  'roi.solution.summaries': { 
    sv: 'Samtalssammanfattningar', 
    en: 'Call Summaries' 
  },
  'roi.solution.summariesDesc': { 
    sv: 'Få en koncis sammanfattning av varje konversation skickad direkt till din e-post, så att du alltid är uppdaterad.', 
    en: 'Get a concise summary of every conversation sent directly to your email, so you\'re always in the loop.' 
  },

  // ROI Page - Comparison
  'roi.comparison.title': { 
    sv: 'Automatiseringens ROI:', 
    en: 'The ROI of Automation:' 
  },
  'roi.comparison.titleHighlight': { 
    sv: 'En direkt jämförelse', 
    en: 'A Direct Comparison' 
  },
  'roi.comparison.subtitle': { 
    sv: 'Se skillnaden Alva gör för din verksamhet', 
    en: 'See the difference Alva makes for your business' 
  },
  'roi.comparison.customerExp': { 
    sv: 'Kundupplevelse', 
    en: 'Customer Experience' 
  },
  'roi.comparison.customerExpOld': { 
    sv: 'Frustrerande röstbrevlåda, förseningar, missade samtal', 
    en: 'Frustrating voicemail, delays, missed calls' 
  },
  'roi.comparison.customerExpNew': { 
    sv: 'Omedelbar, professionell, 24/7 service', 
    en: 'Instant, professional, 24/7 service' 
  },
  'roi.comparison.focus': { 
    sv: 'Ditt fokus', 
    en: 'Your Focus' 
  },
  'roi.comparison.focusOld': { 
    sv: 'Konstant avbruten, delad uppmärksamhet', 
    en: 'Constantly interrupted, split attention' 
  },
  'roi.comparison.focusNew': { 
    sv: 'Oavbrutet fokus på kärnarbete', 
    en: 'Uninterrupted focus on core work' 
  },
  'roi.comparison.leadCapture': { 
    sv: 'Lead-fångst', 
    en: 'Lead Capture' 
  },
  'roi.comparison.leadCaptureOld': { 
    sv: 'Hög risk att förlora leads till konkurrenter', 
    en: 'High risk of losing leads to competitors' 
  },
  'roi.comparison.leadCaptureNew': { 
    sv: '100% av inkommande möjligheter fångade', 
    en: '100% of inbound opportunities captured' 
  },
  'roi.comparison.data': { 
    sv: 'Data & insikter', 
    en: 'Data & Insights' 
  },
  'roi.comparison.dataOld': { 
    sv: 'Ingen data, bara en lista över missade samtal', 
    en: 'No data, just a list of missed calls' 
  },
  'roi.comparison.dataNew': { 
    sv: 'Automatiska sammanfattningar & insikter', 
    en: 'Automated summaries & insights' 
  },
  'roi.comparison.footer': { 
    sv: 'ROI är omedelbar. Genom att fånga bara', 
    en: 'The ROI is immediate. By capturing just' 
  },
  'roi.comparison.footerHighlight': { 
    sv: 'en ytterligare kund', 
    en: 'one additional customer' 
  },
  'roi.comparison.footerSuffix': { 
    sv: 'som annars skulle ha varit ett missat samtal, har Alva redan betalat för sin månatliga prenumeration flera gånger om.', 
    en: 'that would have otherwise been a missed call, Alva has already paid for its monthly subscription several times over.' 
  },

  // ROI Page - Conclusion
  'roi.conclusion.title': { 
    sv: 'Förvandla din telefonlinje till', 
    en: 'Turn Your Phone Line into' 
  },
  'roi.conclusion.titleHighlight': { 
    sv: 'din bästa anställda', 
    en: 'Your Best Employee' 
  },
  'roi.conclusion.subtitle': { 
    sv: 'Din företagstelefon är mer än bara ett verktyg—det är din primära tillväxtmotor. Det är dags att utrusta den med den intelligens den förtjänar.', 
    en: 'Your business phone is more than just a utility—it\'s your primary engine for growth. It\'s time to equip it with the intelligence it deserves.' 
  },
  'roi.conclusion.cta': { 
    sv: 'Sluta förlora kunder till din röstbrevlåda. Låt Alva förvandla varje samtal till en affärsmöjlighet.', 
    en: 'Stop losing customers to your voicemail. Let Alva turn every call into a business opportunity.' 
  },
  'roi.conclusion.demoButton': { 
    sv: 'Boka en 15-minuters demo', 
    en: 'Request a 15-Minute Demo' 
  },
  'roi.conclusion.contactButton': { 
    sv: 'Kontakta oss', 
    en: 'Contact Us' 
  },
  'roi.conclusion.freeTrial': { 
    sv: 'Gratis 14-dagars provperiod', 
    en: 'Free 14-day trial' 
  },
  'roi.conclusion.noCard': { 
    sv: 'Inget kreditkort krävs', 
    en: 'No credit card required' 
  },
  'roi.conclusion.setupMinutes': { 
    sv: 'Installation på minuter', 
    en: 'Setup in minutes' 
  }
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