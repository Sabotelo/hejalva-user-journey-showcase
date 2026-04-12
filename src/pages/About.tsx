import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Users, Eye, Handshake, Globe } from "lucide-react";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { usePageMeta } from "@/hooks/usePageMeta";

const About = () => {
  const { language } = useLanguage();
  usePageMeta(language);

  const team = [
    { name: "Damian Rovira", role: language === 'sv' ? 'Medgrundare & Administration' : 'Co-Founder & Administration' },
    { name: "Zeth Danielsson", role: language === 'sv' ? 'Medgrundare & CTO' : 'Co-Founder & CTO' },
    { name: "Daniil Vildholm", role: language === 'sv' ? 'Medgrundare & Franchising' : 'Co-Founder & Franchising' },
    { name: "Brian Bui", role: language === 'sv' ? 'Senior Utvecklare' : 'Senior Developer' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <ScrollAnimation>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-night mb-4">
              Mimer Technologies
            </h1>
            <p className="text-bark text-lg max-w-xl mx-auto">
              {language === 'sv'
                ? 'Vi bygger AI-verktyg som hjälper företag i alla storlekar att ge fantastisk kundservice — dygnet runt.'
                : 'We build AI tools that help businesses of all sizes deliver amazing customer service — 24/7.'}
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Vision */}
      <section className="py-12 px-6">
        <div className="max-w-[720px] mx-auto">
          <ScrollAnimation>
            <div className="flex items-center gap-3 mb-5">
              <Eye className="h-6 w-6 text-moss" />
              <h2 className="font-serif text-2xl text-night">
                {language === 'sv' ? 'Vår vision' : 'Our Vision'}
              </h2>
            </div>
            <p className="text-bark leading-relaxed text-base mb-4">
              {language === 'sv'
                ? 'Varje företag i Sverige — från den lokala frisören till stora organisationer med hundratals inkommande samtal — förtjänar en telefonservice som aldrig missar ett samtal. Att anställa receptionister i skift kostar hundratusentals kronor per år, oavsett företagsstorlek.'
                : 'Every business in Sweden — from the local hairdresser to large organizations with hundreds of incoming calls — deserves a phone service that never misses a call. Hiring receptionists in shifts costs hundreds of thousands per year, regardless of company size.'}
            </p>
            <p className="text-bark leading-relaxed text-base">
              {language === 'sv'
                ? 'Med Alva AI ger vi företag i alla storlekar en AI-receptionist som svarar dygnet runt, talar flytande svenska och skalar efter behov — en lösning för soloföretagaren som för koncernen.'
                : 'With Alva AI, we give businesses of all sizes an AI receptionist that answers 24/7, speaks fluent Swedish and scales on demand — a solution for the solo entrepreneur as well as the enterprise.'}
            </p>
            <div className="w-full h-px bg-sand-dark mt-10" />
          </ScrollAnimation>
        </div>
      </section>

      {/* ElevenLabs Partnership */}
      <section className="py-12 px-6">
        <div className="max-w-[720px] mx-auto">
          <ScrollAnimation>
            <div className="flex items-center gap-3 mb-5">
              <Handshake className="h-6 w-6 text-moss" />
              <h2 className="font-serif text-2xl text-night">
                {language === 'sv' ? 'Partnerskap med ElevenLabs' : 'ElevenLabs Partnership'}
              </h2>
            </div>
            <p className="text-bark leading-relaxed text-base">
              {language === 'sv'
                ? 'Vi vill tacka ElevenLabs för deras generösa bidrag av tokens för testning och utveckling genom deras grant-program. Deras avancerade röst-AI-teknologi driver Alvas naturliga och engagerande konversationer.'
                : 'We would like to thank ElevenLabs for their generous grant of tokens for testing and development. Their advanced voice AI technology powers Alva\'s natural and engaging conversations.'}
            </p>
            <div className="w-full h-px bg-sand-dark mt-10" />
          </ScrollAnimation>
        </div>
      </section>

      {/* GDPR */}
      <section className="py-12 px-6">
        <div className="max-w-[720px] mx-auto">
          <ScrollAnimation>
            <div className="flex items-center gap-3 mb-5">
              <Shield className="h-6 w-6 text-moss" />
              <h2 className="font-serif text-2xl text-night">
                {language === 'sv' ? 'GDPR & Datasäkerhet' : 'GDPR & Data Security'}
              </h2>
            </div>
            <p className="text-bark leading-relaxed text-base mb-4">
              {language === 'sv'
                ? 'Mimer Technologies tar datasäkerhet på största allvar. Vi följer GDPR fullt ut.'
                : 'Mimer Technologies takes data security very seriously. We are fully GDPR compliant.'}
            </p>
            <ul className="space-y-2 text-bark text-sm">
              {(language === 'sv' ? [
                'Samtalsdata krypteras end-to-end',
                '30 dagars lagring av inspelningar',
                'Data behandlas inom EU',
                'Mimer är databehandlare, kunden är personuppgiftsansvarig',
              ] : [
                'Call data is encrypted end-to-end',
                '30-day retention for recordings',
                'Data processed within the EU',
                'Mimer is the data processor, customer is the data controller',
              ]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-4">
              <a href="/terms" className="text-sm text-moss hover:text-earth transition-colors underline">
                {language === 'sv' ? 'Läs fullständiga villkor →' : 'Read full terms →'}
              </a>
            </p>
            <div className="w-full h-px bg-sand-dark mt-10" />
          </ScrollAnimation>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 px-6">
        <div className="max-w-[720px] mx-auto">
          <ScrollAnimation className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Users className="h-6 w-6 text-moss" />
              <h2 className="font-serif text-2xl text-night">
                {language === 'sv' ? 'Teamet' : 'The Team'}
              </h2>
            </div>
            <p className="text-stone text-sm">
              {language === 'sv' ? 'Baserade i Stockholm & Karlskrona' : 'Based in Stockholm & Karlskrona'}
            </p>
          </ScrollAnimation>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.1}>
            {team.map((member, i) => (
              <StaggerItem key={i} variant="fadeUp">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-moss-pale flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-semibold text-moss">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-night">{member.name}</h3>
                  <p className="text-stone text-xs mt-1">{member.role}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 px-6">
        <div className="max-w-[720px] mx-auto text-center">
          <ScrollAnimation>
            <div className="flex items-center justify-center gap-2 text-stone text-sm">
              <Globe className="h-4 w-4" />
              <span>dev@hejalva.com</span>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
