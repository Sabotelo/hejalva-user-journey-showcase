import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Users, Eye, Handshake, Globe } from "lucide-react";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import MimerLogo from "@/components/MimerLogo";

const About = () => {
  const { language } = useLanguage();

  const team = [
    { name: "Damian Rovira", role: language === 'sv' ? 'Medgrundare & Administration' : 'Co-Founder & Administration' },
    { name: "Zeth Danielsson", role: language === 'sv' ? 'Medgrundare & CTO' : 'Co-Founder & CTO' },
    { name: "Daniil Vildholm", role: language === 'sv' ? 'Medgrundare & Franchising' : 'Co-Founder & Franchising' },
    { name: "Brian Bui", role: language === 'sv' ? 'Senior Utvecklare' : 'Senior Developer' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary-dark to-primary">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation>
            <div className="flex items-center justify-center gap-4 mb-6">
              <MimerLogo size={64} />
              <h1 className="text-4xl md:text-5xl font-bold text-white">Mimer Technologies</h1>
            </div>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              {language === 'sv'
                ? 'Vi bygger AI-verktyg som hjälper svenska småföretag att ge fantastisk kundservice – dygnet runt.'
                : 'We build AI tools that help Swedish small businesses deliver amazing customer service – 24/7.'}
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollAnimation>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="h-8 w-8 text-secondary" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {language === 'sv' ? 'Vår vision' : 'Our Vision'}
                </h2>
              </div>
              <p className="text-white/70 leading-relaxed text-lg mb-4">
                {language === 'sv'
                  ? 'Varje småföretag i Sverige förtjänar samma professionella telefonservice som de stora kedjorna. Men att anställa en receptionist kostar hundratusentals kronor per år.'
                  : 'Every small business in Sweden deserves the same professional phone service as the big chains. But hiring a receptionist costs hundreds of thousands per year.'}
              </p>
              <p className="text-white/70 leading-relaxed text-lg">
                {language === 'sv'
                  ? 'Med Alva AI ger vi alla företag – från frisörer till bilverkstäder – en AI-receptionist som svarar dygnet runt, talar flytande svenska och aldrig missar ett samtal. Uråldrig visdom möter modern AI.'
                  : 'With Alva AI, we give every business – from hairdressers to auto workshops – an AI receptionist that answers 24/7, speaks fluent Swedish and never misses a call. Ancient wisdom meets modern AI.'}
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* ElevenLabs Partnership */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollAnimation>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Handshake className="h-8 w-8 text-secondary" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {language === 'sv' ? 'Partnerskap med ElevenLabs' : 'ElevenLabs Partnership'}
                </h2>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <svg viewBox="0 0 100 100" className="h-8 w-8 text-white" fill="none">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" className="text-white/30" />
                  <circle cx="50" cy="50" r="20" fill="currentColor" className="text-white" />
                </svg>
                <span className="text-xl font-bold text-white">ElevenLabs</span>
              </div>
              <p className="text-white/70 leading-relaxed text-lg">
                {language === 'sv'
                  ? 'Vi vill tacka ElevenLabs för deras generösa bidrag av tokens för testning och utveckling genom deras grant-program. Deras avancerade röst-AI-teknologi driver Alvas naturliga och engagerande konversationer, vilket gör det möjligt för oss att leverera en röstupplevelse i världsklass.'
                  : 'We would like to thank ElevenLabs for their generous grant of tokens for testing and development. Their advanced voice AI technology powers Alva\'s natural and engaging conversations, enabling us to deliver a world-class voice experience.'}
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* GDPR */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollAnimation>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-secondary" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {language === 'sv' ? 'GDPR & Datasäkerhet' : 'GDPR & Data Security'}
                </h2>
              </div>
              <div className="space-y-4 text-white/70 text-lg leading-relaxed">
                <p>
                  {language === 'sv'
                    ? 'Mimer Technologies tar datasäkerhet på största allvar. Vi följer GDPR fullt ut och all data behandlas i enlighet med europeisk lagstiftning.'
                    : 'Mimer Technologies takes data security very seriously. We are fully GDPR compliant and all data is processed in accordance with European legislation.'}
                </p>
                <ul className="space-y-2 list-none">
                  {[
                    language === 'sv' ? '🔒 Samtalsdata krypteras end-to-end' : '🔒 Call data is encrypted end-to-end',
                    language === 'sv' ? '📋 30 dagars lagring av inspelningar' : '📋 30-day retention for recordings',
                    language === 'sv' ? '🇪🇺 Data behandlas inom EU' : '🇪🇺 Data processed within the EU',
                    language === 'sv' ? '📄 Mimer är databehandlare, kunden är personuppgiftsansvarig' : '📄 Mimer is the data processor, customer is the data controller',
                  ].map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p>
                  <a href="/terms" className="text-secondary hover:text-secondary/80 transition-colors underline">
                    {language === 'sv' ? 'Läs fullständiga villkor →' : 'Read full terms →'}
                  </a>
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollAnimation className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="h-8 w-8 text-secondary" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {language === 'sv' ? 'Teamet' : 'The Team'}
              </h2>
            </div>
            <p className="text-white/60">
              {language === 'sv' ? 'Baserade i Stockholm & Karlskrona' : 'Based in Stockholm & Karlskrona'}
            </p>
          </ScrollAnimation>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {team.map((member, i) => (
              <StaggerItem key={i} variant="bounceUp">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center">
                  <div className="h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-secondary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-white/50 text-sm">{member.role}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact info */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <ScrollAnimation>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="h-6 w-6 text-secondary" />
              <span className="text-white/60">dev@hejalva.com</span>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
