import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type Step = "greeting" | "name" | "email" | "phone" | "company" | "purpose" | "sending" | "done";


interface ChatMessage {
  from: "bot" | "user";
  text: string;
}

const ChatBubble = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("greeting");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", purpose: "" });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = {
    greeting: language === "sv"
      ? "Hej! Vill du komma i kontakt med oss? Jag hjälper dig. Vad heter du?"
      : "Hi! Want to get in touch? I'll help you. What's your name?",
    askEmail: language === "sv"
      ? "Trevligt, {name}! Vilken e-postadress kan vi nå dig på?"
      : "Nice to meet you, {name}! What email can we reach you at?",
    invalidEmail: language === "sv"
      ? "Hmm, det ser inte ut som en giltig e-post. Kan du ange den igen?"
      : "Hmm, that doesn't look like a valid email. Could you try again?",
    askPhone: language === "sv"
      ? "Vad är ditt telefonnummer?"
      : "What's your phone number?",
    askCompany: language === "sv"
      ? "Vilket företag representerar du?"
      : "What company do you represent?",
    askPurpose: language === "sv"
      ? "Vad gäller din förfrågan?"
      : "What is your inquiry about?",
    sending: language === "sv"
      ? "Tack! Skickar din förfrågan..."
      : "Thank you! Sending your inquiry...",
    done: language === "sv"
      ? "Din förfrågan är skickad! Vi återkommer så snart som möjligt."
      : "Your inquiry has been sent! We'll get back to you as soon as possible.",
    error: language === "sv"
      ? "Något gick fel. Försök igen senare."
      : "Something went wrong. Please try again later.",
    placeholder: {
      name: language === "sv" ? "Ditt namn..." : "Your name...",
      email: language === "sv" ? "din@email.com" : "your@email.com",
      phone: language === "sv" ? "+46 70 123 4567" : "+46 70 123 4567",
      company: language === "sv" ? "Företagsnamn..." : "Company name...",
    },
    purposeOptions: language === "sv"
      ? [
          { label: "Kundtjänst", value: "kundtjänst" },
          { label: "Försäljning", value: "försäljning" },
        ]
      : [
          { label: "Customer Service", value: "kundtjänst" },
          { label: "Sales", value: "försäljning" },
        ],
    bubbleLabel: language === "sv" ? "Kontakta oss" : "Contact us",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  useEffect(() => {
    if (isOpen && step === "greeting" && messages.length === 0) {
      setMessages([{ from: "bot", text: t.greeting }]);
      setStep("name");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen, step]);

  const addBotMessage = (text: string, options?: { label: string; value: string }[]) => {
    setMessages((prev) => [...prev, { from: "bot", text, options }]);
  };

  const extractName = (raw: string): string => {
    const cleaned = raw.toLowerCase()
      .replace(/^(hej|hallå|tjena|tja|hi|hello|hey|hejsan|god\s*(dag|morgon|kväll))[,!.\s]*/i, "")
      .replace(/^(jag\s+heter|mitt\s+namn\s+är|i'm|my\s+name\s+is|i\s+am|det\s+är)[,.\s]*/i, "")
      .trim();
    if (cleaned) return cleaned.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return raw.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
  };

  const extractEmail = (raw: string): string | null => {
    const match = raw.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
    return match ? match[0].toLowerCase() : null;
  };

  const extractPhone = (raw: string): string => {
    const cleaned = raw.replace(/[^\d+\-\s()]/g, "").trim();
    return cleaned || raw.trim();
  };

  const extractCompany = (raw: string): string => {
    const cleaned = raw.toLowerCase()
      .replace(/^(jag\s+(jobbar|arbetar)\s+(på|hos|för|vid)|i\s+(work\s+)?(at|for)|det\s+är|vi\s+heter|företaget\s+(heter|är))[,.\s]*/i, "")
      .trim();
    if (cleaned) return cleaned.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return raw.trim();
  };

  const submitForm = async (data: typeof formData) => {
    setStep("sending");
    addBotMessage(t.sending);

    const purposeLabel = data.purpose === "försäljning"
      ? (language === "sv" ? "Försäljning" : "Sales")
      : (language === "sv" ? "Kundtjänst" : "Customer Service");

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: [
            `Namn: ${data.name}`,
            `Telefon: ${data.phone}`,
            `E-post: ${data.email}`,
            `Företag: ${data.company}`,
            `Syfte: ${data.purpose}`,
          ].join("\n"),
        },
      });
      if (error) throw error;
      setTimeout(() => { addBotMessage(t.done); setStep("done"); }, 500);
    } catch {
      setTimeout(() => { addBotMessage(t.error); setStep("purpose"); }, 500);
    }
  };

  const handleSend = async () => {
    const value = input.trim();
    if (!value) return;

    setMessages((prev) => [...prev, { from: "user", text: value }]);
    setInput("");

    switch (step) {
      case "name": {
        const name = extractName(value);
        setFormData((d) => ({ ...d, name }));
        setTimeout(() => { addBotMessage(t.askEmail.replace("{name}", name)); setStep("email"); }, 400);
        break;
      }
      case "email": {
        const email = extractEmail(value);
        if (!email) { setTimeout(() => addBotMessage(t.invalidEmail), 400); return; }
        setFormData((d) => ({ ...d, email }));
        setTimeout(() => { addBotMessage(t.askPhone); setStep("phone"); }, 400);
        break;
      }
      case "phone": {
        const phone = extractPhone(value);
        setFormData((d) => ({ ...d, phone }));
        setTimeout(() => { addBotMessage(t.askCompany); setStep("company"); }, 400);
        break;
      }
      case "company": {
        const company = extractCompany(value);
        setFormData((d) => ({ ...d, company }));
        setTimeout(() => { addBotMessage(t.askPurpose); setStep("purpose"); }, 400);
        break;
      }
      case "purpose": {
        const finalData = { ...formData, purpose: value };
        setFormData(finalData);
        submitForm(finalData);
        break;
      }
    }
  };

  const getPlaceholder = () => {
    if (step === "name") return t.placeholder.name;
    if (step === "email") return t.placeholder.email;
    if (step === "phone") return t.placeholder.phone;
    if (step === "company") return t.placeholder.company;
    if (step === "purpose") return language === "sv" ? "T.ex. försäljning, support..." : "E.g. sales, support...";
    return "";
  };

  const canType = ["name", "email", "phone", "company", "purpose"].includes(step);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-earth text-cream shadow-elevated flex items-center justify-center hover:bg-night transition-colors"
            aria-label={t.bubbleLabel}
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-cream border border-sand-dark rounded-2xl shadow-elevated flex flex-col overflow-hidden"
            style={{ height: "460px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-sand-dark bg-warm-white">
              <div>
                <p className="font-serif text-lg text-night leading-tight">Alva AI</p>
                <p className="text-xs text-stone">
                  {language === "sv" ? "Kontaktassistent" : "Contact assistant"}
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-bark hover:text-night transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[80%]">
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.from === "user"
                          ? "bg-earth text-cream rounded-br-md"
                          : "bg-sand text-night rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {/* Purpose selection buttons */}
                    {msg.options && step === "purpose" && (
                      <div className="flex gap-2 mt-2">
                        {msg.options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handlePurposeSelect(opt.value)}
                            className="px-4 py-2 rounded-full border border-sand-dark bg-warm-white text-sm font-medium text-earth hover:bg-earth hover:text-cream transition-colors"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {step === "sending" && (
                <div className="flex justify-start">
                  <div className="px-4 py-2.5 rounded-2xl rounded-bl-md bg-sand">
                    <Loader2 className="h-4 w-4 animate-spin text-bark" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {canType && (
              <div className="px-4 py-3 border-t border-sand-dark bg-warm-white">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type={step === "email" ? "email" : step === "phone" ? "tel" : "text"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={getPlaceholder()}
                    className="flex-1 px-4 py-2.5 rounded-full border border-sand-dark bg-cream text-night text-sm outline-none focus:border-moss transition-colors placeholder:text-stone"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-9 h-9 rounded-full bg-earth text-cream flex items-center justify-center hover:bg-night transition-colors disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === "done" && (
              <div className="px-4 py-3 border-t border-sand-dark bg-warm-white text-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-moss hover:text-earth transition-colors"
                >
                  {language === "sv" ? "Stäng" : "Close"}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBubble;
