import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { FileText, Shield, CreditCard, Scale, Clock, Lock, Users, Mail } from "lucide-react";

const Terms = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-primary-dark via-primary-dark to-background overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-primary-glow/10 blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm mb-6">
                <FileText className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium text-white">
                  {language === 'sv' ? 'Juridiska dokument' : 'Legal Documents'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {language === 'sv' ? 'Användarvillkor & Integritetspolicy' : 'Terms of Service & Privacy Policy'}
              </h1>
              <p className="text-white/70 text-lg">
                {language === 'sv' 
                  ? 'Senast uppdaterad: Januari 2025 • UTKAST – FÖR JURIDISK GRANSKNING'
                  : 'Last Updated: January 2025 • DRAFT – FOR LEGAL REVIEW ONLY'}
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Terms of Service */}
          <ScrollAnimation>
            <div className="bg-card rounded-2xl border border-border/50 p-8 md:p-12 mb-12 shadow-lg">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <Scale className="h-6 w-6 text-secondary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  {language === 'sv' ? 'Alva Användarvillkor' : 'Alva Terms of Service'}
                </h2>
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                {language === 'sv' 
                  ? 'Dessa användarvillkor ("Villkor") är ett juridiskt bindande avtal mellan dig, kunden ("Kund", "du"), och Alva AI ("Alva", "vi", "oss"), ett företag registrerat i Sverige. Genom att skapa ett konto, komma åt eller använda tjänsten bekräftar du att du har läst, förstått och samtycker till att vara bunden av dessa villkor.'
                  : 'These Terms of Service ("Terms") are a legally binding agreement between you, the customer ("Customer," "you"), and Alva AI ("Alva," "we," "us"), a company registered in Sweden. By creating an account, accessing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.'}
              </p>

              {/* Section 1 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20 text-secondary text-sm font-bold">1</span>
                  {language === 'sv' ? 'Tjänsten' : 'The Service'}
                </h3>
                <p className="text-muted-foreground leading-relaxed pl-10">
                  {language === 'sv'
                    ? 'Alva tillhandahåller en prenumerationsbaserad SaaS-plattform som erbjuder en AI-driven virtuell receptionist ("Tjänsten"). Tjänsten är utformad för att hantera ditt företags telefonsamtal, svara på kundfrågor, boka möten och tillhandahålla relaterade tjänster. Tjänsten erbjuds i olika prenumerationsnivåer som bestämmer de specifika funktionerna, kapaciteterna och användningsgränserna som är tillgängliga för dig.'
                    : 'Alva provides a subscription-based software-as-a-service (SaaS) platform that offers an AI-powered virtual receptionist ("the Service"). The Service is designed to handle your business\'s phone calls, answer customer inquiries, book appointments, and provide related services. The Service is offered in various subscription tiers, which determine the specific features, capabilities, and usage limits available to you.'}
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20 text-secondary text-sm font-bold">2</span>
                  {language === 'sv' ? 'Användarkonton & Ansvar' : 'User Accounts & Responsibilities'}
                </h3>
                <div className="text-muted-foreground leading-relaxed pl-10 space-y-3">
                  <p>{language === 'sv' ? 'För att använda tjänsten måste du skapa ett konto. Du samtycker till att:' : 'To use the Service, you must create an account. You agree to:'}</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>{language === 'sv' ? 'Hålla ditt kontolösenord och inloggningsuppgifter säkra och konfidentiella.' : 'Keep your account password and login credentials secure and confidential.'}</li>
                    <li>{language === 'sv' ? 'Vara ensam ansvarig för all aktivitet som sker under ditt konto.' : 'Be solely responsible for all activities that occur under your account.'}</li>
                  </ul>
                  <p>{language === 'sv' 
                    ? 'Kunden är ensam ansvarig för att säkerställa att all företagsinformation som tillhandahålls tjänsten (t.ex. öppettider, tjänstebeskrivningar, prissättning) är korrekt och uppdaterad. Alvas förmåga att tillhandahålla en korrekt tjänst är direkt beroende av denna information.'
                    : 'The Customer is solely responsible for ensuring that all business information provided to the Service (e.g., opening hours, service descriptions, pricing) is accurate and up-to-date. Alva\'s ability to provide an accurate service is directly dependent on this information.'}
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20 text-secondary text-sm font-bold">3</span>
                  <CreditCard className="h-5 w-5 text-secondary" />
                  {language === 'sv' ? 'Prenumeration, Avgifter och Betalning' : 'Subscription, Fees, and Payment'}
                </h3>
                <ul className="text-muted-foreground leading-relaxed pl-10 space-y-3 list-disc list-inside">
                  <li>{language === 'sv' ? 'Tjänsten faktureras månadsvis, i förskott.' : 'The Service is billed on a monthly basis, in advance.'}</li>
                  <li>{language === 'sv' 
                    ? 'Du ger oss och vår tredjepartsbetalningsprocessor, Mollie, rätt att debitera din valda betalningsmetod (t.ex. kreditkort) för alla tillämpliga prenumerationsavgifter.'
                    : 'You authorize us and our third-party payment processor, Mollie, to charge your selected payment method (e.g., Credit Card) for all applicable subscription fees.'}
                  </li>
                  <li>{language === 'sv' 
                    ? 'Prenumerationsavgifter återbetalas inte. Det ges inga återbetalningar eller krediter för delar av månader eller för oanvända månader med ett öppet konto.'
                    : 'Subscription fees are non-refundable. There will be no refunds or credits for partial months of service or for months unused with an open account.'}
                  </li>
                  <li>{language === 'sv' ? 'Fortsatt tillgång till tjänsten är villkorat av att alla avgifter betalas i tid.' : 'Continued access to the Service is conditional on timely payment of all fees.'}</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20 text-secondary text-sm font-bold">4</span>
                  {language === 'sv' ? 'Policy för Acceptabel Användning' : 'Acceptable Use Policy'}
                </h3>
                <div className="text-muted-foreground leading-relaxed pl-10 space-y-3">
                  <p>{language === 'sv' ? 'Du samtycker till att inte (och inte tillåta dina användare att) använda tjänsten för att:' : 'You agree not to (and not to allow your users to) use the Service to:'}</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>{language === 'sv' ? 'Delta i olaglig, bedräglig eller skadlig verksamhet.' : 'Engage in any illegal, fraudulent, or harmful activities.'}</li>
                    <li>{language === 'sv' ? 'Försöka dekompilera, bakåtkonstruera eller på annat sätt kopiera tjänstens programvara, AI-modeller eller underliggande teknik.' : 'Attempt to decompile, reverse-engineer, or otherwise copy the Service\'s software, AI models, or underlying technology.'}</li>
                    <li>{language === 'sv' ? 'Använda kränkande, trakasserande, obscent eller "fult" språk i interaktioner med AI-assistenten.' : 'Use abusive, harassing, obscene, or "foul" language in interactions with the AI assistant.'}</li>
                    <li>{language === 'sv' ? 'Bryta mot något av dessa villkor eller policyer.' : 'Violate any of these Terms or policies.'}</li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20 text-secondary text-sm font-bold">5</span>
                  {language === 'sv' ? 'Löptid och Uppsägning' : 'Term and Termination'}
                </h3>
                <div className="text-muted-foreground leading-relaxed pl-10 space-y-3">
                  <p><strong>{language === 'sv' ? 'Uppsägning av dig:' : 'Termination by You:'}</strong> {language === 'sv' 
                    ? 'Du kan när som helst säga upp din prenumeration via din kontopanel. Uppsägningen träder i kraft i slutet av din nuvarande månatliga faktureringsperiod.'
                    : 'You may cancel your subscription at any time through your account dashboard. The cancellation will take effect at the end of your current monthly billing period.'}
                  </p>
                  <p><strong>{language === 'sv' ? 'Uppsägning av Alva:' : 'Termination by Alva:'}</strong> {language === 'sv'
                    ? 'Vi kan stänga av eller avsluta din tillgång till tjänsten med omedelbar verkan om du väsentligt bryter mot dessa villkor, inklusive vid utebliven betalning av avgifter eller brott mot policyn för acceptabel användning.'
                    : 'We may suspend or terminate your access to the Service with immediate effect if you are in material breach of these Terms, including for non-payment of fees or for a breach of the Acceptable Use Policy.'}
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20 text-secondary text-sm font-bold">6</span>
                  <Shield className="h-5 w-5 text-secondary" />
                  {language === 'sv' ? 'Dataskydd och Integritet' : 'Data Protection and Privacy'}
                </h3>
                <div className="text-muted-foreground leading-relaxed pl-10 space-y-3">
                  <p>{language === 'sv' 
                    ? 'Vår insamling och användning av personuppgifter i samband med tjänsten beskrivs i vår Integritetspolicy, som genom hänvisning ingår i dessa villkor.'
                    : 'Our collection and use of personal data in connection with the Service is described in our Privacy Policy, which is incorporated by reference into these Terms.'}
                  </p>
                  <p>{language === 'sv'
                    ? 'Du bekräftar att du är "Personuppgiftsansvarig" för personuppgifterna för dina uppringare, och Alva agerar som "Personuppgiftsbiträde" för din räkning. Du ansvarar för att ha en rättslig grund för att samla in och behandla dessa uppgifter.'
                    : 'You acknowledge that you are the "Data Controller" for the personal data of your callers, and Alva acts as the "Data Processor" on your behalf. You are responsible for having a legal basis to collect and process this data.'}
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20 text-secondary text-sm font-bold">7</span>
                  {language === 'sv' ? 'Ansvarsbegränsning' : 'Limitation of Liability'}
                </h3>
                <p className="text-muted-foreground leading-relaxed pl-10">
                  {language === 'sv'
                    ? 'Tjänsten tillhandahålls "i befintligt skick". I den utsträckning som lagen tillåter ska Alva inte vara ansvarig för indirekta, tillfälliga eller följdskador (inklusive förlorad vinst eller förlorade data) som uppstår från din användning av tjänsten. Under inga omständigheter ska Alvas totala sammanlagda ansvar överstiga beloppet av de avgifter du har betalat till oss under de tolv (12) månaderna före händelsen som gav upphov till anspråket.'
                    : 'The Service is provided "as-is." To the maximum extent permitted by law, Alva shall not be liable for any indirect, incidental, or consequential damages (including lost profits or lost data) arising from your use of the Service. In no event shall Alva\'s total aggregate liability exceed the amount of fees you have paid to us in the twelve (12) months preceding the event giving rise to the claim.'}
                </p>
              </div>

              {/* Section 8 */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20 text-secondary text-sm font-bold">8</span>
                  {language === 'sv' ? 'Tillämplig Lag' : 'Governing Law'}
                </h3>
                <p className="text-muted-foreground leading-relaxed pl-10">
                  {language === 'sv'
                    ? 'Dessa villkor ska styras av och tolkas i enlighet med svensk lag. Eventuella juridiska tvister som uppstår från dessa villkor kommer att lösas uteslutande i domstolarna i Stockholm, Sverige.'
                    : 'These Terms shall be governed by and construed in accordance with the laws of Sweden. Any legal disputes arising from these Terms will be resolved exclusively in the courts of Stockholm, Sweden.'}
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* Privacy Policy */}
          <ScrollAnimation delay={0.1}>
            <div className="bg-card rounded-2xl border border-border/50 p-8 md:p-12 shadow-lg" id="privacy">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-primary-glow/10">
                  <Lock className="h-6 w-6 text-primary-glow" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  {language === 'sv' ? 'Alva Integritetspolicy' : 'Alva Privacy Policy'}
                </h2>
              </div>

              {/* Section 1 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-glow/20 text-primary-glow text-sm font-bold">1</span>
                  {language === 'sv' ? 'Introduktion & Våra Roller' : 'Introduction & Our Roles'}
                </h3>
                <div className="text-muted-foreground leading-relaxed pl-10 space-y-3">
                  <p>{language === 'sv'
                    ? 'Alva AI ("Alva", "vi", "oss") är engagerade i att skydda din integritet. Denna integritetspolicy förklarar hur vi samlar in, använder och skyddar personuppgifter i enlighet med den allmänna dataskyddsförordningen (GDPR).'
                    : 'Alva AI ("Alva," "we," "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect personal data in compliance with the General Data Protection Regulation (GDPR).'}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-secondary" />
                    {language === 'sv' ? 'Vår kontaktepost för integritetsrelaterade frågor är' : 'Our contact email for any privacy-related matters is'} <a href="mailto:support@hejalva.com" className="text-secondary hover:underline">support@hejalva.com</a>
                  </p>
                  <p>{language === 'sv' ? 'Vi agerar i två distinkta roller enligt GDPR:' : 'We act in two distinct roles under GDPR:'}</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>{language === 'sv' ? 'Personuppgiftsansvarig:' : 'Data Controller:'}</strong> {language === 'sv' 
                      ? 'När du, vår kund, registrerar dig för tjänsten är vi personuppgiftsansvariga för dina personuppgifter (t.ex. din e-post, företagsnamn).'
                      : 'When you, our Customer, sign up for the Service, we are the Data Controller for your personal data (e.g., your email, company name).'}
                    </li>
                    <li><strong>{language === 'sv' ? 'Personuppgiftsbiträde:' : 'Data Processor:'}</strong> {language === 'sv'
                      ? 'När vi hanterar samtal från dina kunder ("Slutanvändare") för din räkning är du personuppgiftsansvarig och vi agerar som ditt personuppgiftsbiträde.'
                      : 'When we handle calls from your customers ("End-Users") on your behalf, you are the Data Controller, and we act as your Data Processor.'}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-glow/20 text-primary-glow text-sm font-bold">2</span>
                  <Users className="h-5 w-5 text-primary-glow" />
                  {language === 'sv' ? 'Personuppgifter Vi Samlar In' : 'Personal Data We Collect'}
                </h3>
                <div className="text-muted-foreground leading-relaxed pl-10 space-y-4">
                  <div>
                    <p className="font-semibold text-foreground mb-2">{language === 'sv' ? 'Som Personuppgiftsansvarig (Från våra kunder)' : 'As a Data Controller (From our Customers)'}</p>
                    <p className="mb-2">{language === 'sv' ? 'När du registrerar dig för Alva samlar vi in:' : 'When you sign up for Alva, we collect:'}</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>{language === 'sv' ? 'Ditt namn' : 'Your Name'}</li>
                      <li>{language === 'sv' ? 'E-postadress' : 'Email Address'}</li>
                      <li>{language === 'sv' ? 'Företagsnamn' : 'Company Name'}</li>
                      <li>{language === 'sv' ? 'Betalningsinformation (säkert bearbetad av vår betalningsprocessor)' : 'Payment Information (securely processed by our payment processor)'}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">{language === 'sv' ? 'Som Personuppgiftsbiträde (Från dina uppringare)' : 'As a Data Processor (From your Callers)'}</p>
                    <p className="mb-2">{language === 'sv' ? 'När Alva hanterar ett samtal för din räkning behandlar vi:' : 'When Alva handles a call on your behalf, we process:'}</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>{language === 'sv' ? 'Slutanvändarens telefonnummer' : 'The End-User\'s Phone Number'}</li>
                      <li>{language === 'sv' ? 'Röstdata (från samtalsinspelningen)' : 'Voice Data (from the call audio recording)'}</li>
                      <li>{language === 'sv' ? 'Andra personuppgifter som slutanvändaren nämner under samtalet (t.ex. namn, e-post, mötesdetaljer).' : 'Any other personal data the End-User mentions during the call (e.g., their name, email, appointment details).'}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-glow/20 text-primary-glow text-sm font-bold">3</span>
                  {language === 'sv' ? 'Hur och Varför Vi Använder Personuppgifter' : 'How and Why We Use Personal Data'}
                </h3>
                <div className="text-muted-foreground leading-relaxed pl-10 space-y-3">
                  <p>{language === 'sv' ? 'Vi behandlar personuppgifter för följande legitima ändamål:' : 'We process personal data for the following legitimate purposes:'}</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>{language === 'sv' ? 'För att tillhandahålla tjänsten:' : 'To Provide the Service:'}</strong> {language === 'sv' 
                      ? 'För att svara på samtal, förstå förfrågningar, boka möten och utföra AI-receptionistens kärnfunktioner.'
                      : 'To answer calls, understand requests, book appointments, and perform the core functions of the AI receptionist.'}
                    </li>
                    <li><strong>{language === 'sv' ? 'För att bearbeta betalningar:' : 'To Process Payments:'}</strong> {language === 'sv' ? 'För att fakturera dig för din prenumeration.' : 'To bill you for your subscription.'}</li>
                    <li><strong>{language === 'sv' ? 'För att kommunicera med dig:' : 'To Communicate with You:'}</strong> {language === 'sv' 
                      ? 'För att skicka samtalssammanfattningar, kontonotifikationer och viktiga tjänsteuppdateringar.'
                      : 'To send you call summaries, account notifications, and important service updates.'}
                    </li>
                    <li><strong>{language === 'sv' ? 'För att förbättra vår tjänst:' : 'To Improve Our Service:'}</strong> {language === 'sv'
                      ? 'För att analysera data för kvalitetssäkring, identifiera trender och förbättra noggrannheten och prestandan hos vår AI.'
                      : 'To analyze data for quality assurance, identify trends, and improve the accuracy and performance of our AI.'}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-glow/20 text-primary-glow text-sm font-bold">4</span>
                  {language === 'sv' ? 'Våra Tredjepartsunderbiträden' : 'Our Third-Party Sub-processors'}
                </h3>
                <div className="text-muted-foreground leading-relaxed pl-10 space-y-3">
                  <p>{language === 'sv' 
                    ? 'Vi säljer inte dina personuppgifter. Vi använder ett begränsat antal tredjepartsunderbiträden som är nödvändiga för att vi ska kunna tillhandahålla tjänsten. Alla underbiträden är granskade för GDPR-efterlevnad.'
                    : 'We do not sell your personal data. We use a limited number of third-party sub-processors who are essential for us to provide the Service. All sub-processors are vetted for GDPR compliance.'}
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>{language === 'sv' ? 'Betalningsprocessor:' : 'Payment Processor:'}</strong> Mollie {language === 'sv' ? '(för att bearbeta dina prenumerationsbetalningar)' : '(to process your subscription payments)'}</li>
                    <li><strong>{language === 'sv' ? 'Telefonileverantör:' : 'Telephony Provider:'}</strong> {language === 'sv' ? 'En leverantör (t.ex. Telnyx) för att hantera samtalsinfrastrukturen.' : 'A provider (e.g., Telnyx) to handle the call infrastructure.'}</li>
                    <li><strong>{language === 'sv' ? 'Molnvärd:' : 'Cloud Hosting:'}</strong> {language === 'sv' ? 'En leverantör (t.ex. Amazon Web Services) för att säkert vara värd för vår applikation och data inom EU.' : 'A provider (e.g., Amazon Web Services) to securely host our application and data within the EU.'}</li>
                    <li><strong>{language === 'sv' ? 'AI & Röstleverantör:' : 'AI & Voice Provider:'}</strong> ElevenLabs {language === 'sv' ? '(för AI-driven röstgenerering och förståelse)' : '(for AI-powered voice generation and understanding)'}</li>
                    <li><strong>{language === 'sv' ? 'AI-agentramverk:' : 'AI Agent Framework:'}</strong> LiveKit {language === 'sv' ? '(för att driva vår realtids-AI-agent)' : '(to power our real-time AI agent)'}</li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-glow/20 text-primary-glow text-sm font-bold">5</span>
                  <Clock className="h-5 w-5 text-primary-glow" />
                  {language === 'sv' ? 'Policy för Datalagring' : 'Data Retention Policy'}
                </h3>
                <div className="text-muted-foreground leading-relaxed pl-10 space-y-3">
                  <p>{language === 'sv' 
                    ? 'Vi lagrar personuppgifter endast så länge det är nödvändigt för att uppfylla de syften som beskrivs ovan. Våra specifika lagringsperioder är:'
                    : 'We store personal data only for as long as necessary to fulfill the purposes outlined above. Our specific retention periods are:'}
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>{language === 'sv' ? 'Samtalsinspelningar:' : 'Call Audio Recordings:'}</strong> {language === 'sv' ? 'Raderas automatiskt efter 30 dagar.' : 'Automatically deleted after 30 days.'}</li>
                    <li><strong>{language === 'sv' ? 'Samtalsutskrifter:' : 'Call Transcripts:'}</strong> {language === 'sv' ? 'Raderas automatiskt efter 90 dagar.' : 'Automatically deleted after 90 days.'}</li>
                    <li><strong>{language === 'sv' ? 'AI-genererade sammanfattningar:' : 'AI-Generated Summaries:'}</strong> {language === 'sv' ? 'Bevaras i 12 månader för dina affärsregister.' : 'Retained for 12 months for your business records.'}</li>
                  </ul>
                  <p>{language === 'sv' 
                    ? 'Som kund kan du manuellt radera vilken samtalspost som helst från din instrumentpanel när som helst.'
                    : 'As a Customer, you can manually delete any call record from your dashboard at any time.'}
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-glow/20 text-primary-glow text-sm font-bold">6</span>
                  {language === 'sv' ? 'Dina Datarättigheter Enligt GDPR' : 'Your Data Rights Under GDPR'}
                </h3>
                <div className="text-muted-foreground leading-relaxed pl-10 space-y-3">
                  <p>{language === 'sv'
                    ? 'Du och dina slutanvändare har rättigheter över personuppgifter, inklusive rätten till tillgång, rättelse och radering ("rätten att bli glömd").'
                    : 'You and your End-Users have rights over personal data, including the right of access, rectification, and erasure ("right to be forgotten").'}
                  </p>
                  <p>{language === 'sv'
                    ? 'För att göra en begäran gällande dina personuppgifter eller en slutanvändares uppgifter, vänligen kontakta oss på'
                    : 'To make a request regarding your personal data or the data of an End-User, please contact us at'} <a href="mailto:support@hejalva.com" className="text-secondary hover:underline">support@hejalva.com</a>{language === 'sv' ? ', så hjälper vi dig att uppfylla din begäran.' : ', and we will assist you in fulfilling your request.'}
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-glow/20 text-primary-glow text-sm font-bold">7</span>
                  <Shield className="h-5 w-5 text-primary-glow" />
                  {language === 'sv' ? 'Datasäkerhet' : 'Data Security'}
                </h3>
                <p className="text-muted-foreground leading-relaxed pl-10">
                  {language === 'sv'
                    ? 'Vi tar säkerheten för dina uppgifter på största allvar. Vi använder lämpliga tekniska och organisatoriska åtgärder, inklusive kryptering av data under överföring och i vila, för att skydda personuppgifter mot obehörig åtkomst, förlust eller förstörelse.'
                    : 'We take the security of your data very seriously. We use appropriate technical and organizational measures, including encryption of data in transit and at rest, to protect personal data against unauthorized access, loss, or destruction.'}
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
