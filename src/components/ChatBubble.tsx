import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type Step = "greeting" | "name" | "email" | "company" | "message" | "sending" | "done";

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
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = {
    greeting: language === "sv" ? "Hej! Vill du komma i kontakt med oss? Jag hjälper dig. Vad heter du?" : "Hi! Want to get in touch? I'll help you. What's your name?",
    askEmail: language === "sv" ? "Trevligt, {name}! Vilken e-postadress kan vi nå dig på?" : "Nice to meet you, {name}! What email can we reach you at?",
    invalidEmail: language === "sv" ? "Hmm, det ser inte ut som en giltig e-post. Kan du ange den igen?" : "Hmm, that doesn't look like a valid email. Could you try again?",
    askCompany: language === "sv" ? "Vilket företag representerar du?" : "What company do you represent?",
    askMessage: language === "sv" ? "Vad kan vi hjälpa dig med?" : "What can we help you with?",
    sending: language === "sv" ? "Tack! Skickar ditt meddelande..." : "Thank you! Sending your message...",
    done: language === "sv" ? "Meddelandet är skickat! Vi återkommer så snart som möjligt." : "Message sent! We'll get back to you as soon as possible.",
    error: language === "sv" ? "Något gick fel. Försök igen senare." : "Something went wrong. Please try again later.",
    placeholder: {
      name: language === "sv" ? "Ditt namn..." : "Your name...",
      email: language === "sv" ? "din@email.com" : "your@email.com",
      company: language === "sv" ? "Företagsnamn..." : "Company name...",
      message: language === "sv" ? "Ditt meddelande..." : "Your message...",
    },
    bubbleLabel: language === "sv" ? "Kontakta oss" : "Contact us",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && step === "greeting" && messages.length === 0) {
      setMessages([{ from: "bot", text: t.greeting }]);
      setStep("name");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen, step]);

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { from: "bot", text }]);
  };

  const handleSend = async () => {
    const value = input.trim();
    if (!value) return;

    setMessages((prev) => [...prev, { from: "user", text: value }]);
    setInput("");

    switch (step) {
      case "name":
        setFormData((d) => ({ ...d, name: value }));
        setTimeout(() => {
          addBotMessage(t.askEmail.replace("{name}", value));
          setStep("email");
        }, 400);
        break;

      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setTimeout(() => addBotMessage(t.invalidEmail), 400);
          return;
        }
        setFormData((d) => ({ ...d, email: value }));
        setTimeout(() => {
          addBotMessage(t.askCompany);
          setStep("company");
        }, 400);
        break;
      }

      case "company":
        setFormData((d) => ({ ...d, company: value }));
        setTimeout(() => {
          addBotMessage(t.askMessage);
          setStep("message");
        }, 400);
        break;

      case "message": {
        const finalData = { ...formData, message: value };
        setFormData(finalData);
        setStep("sending");
        addBotMessage(t.sending);

        try {
          const { error } = await supabase.functions.invoke("send-contact-email", {
            body: {
              name: finalData.name,
              email: finalData.email,
              message: `Företag: ${finalData.company}\n\n${finalData.message}`,
              phone: "",
            },
          });
          if (error) throw error;
          setTimeout(() => {
            addBotMessage(t.done);
            setStep("done");
          }, 500);
        } catch {
          setTimeout(() => {
            addBotMessage(t.error);
            setStep("message");
          }, 500);
        }
        break;
      }
    }
  };

  const getPlaceholder = () => {
    if (step === "name") return t.placeholder.name;
    if (step === "email") return t.placeholder.email;
    if (step === "company") return t.placeholder.company;
    if (step === "message") return t.placeholder.message;
    return "";
  };

  const canType = ["name", "email", "company", "message"].includes(step);

  return (
    <>
      {/* Floating button */}
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

      {/* Chat panel */}
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
              <button
                onClick={() => setIsOpen(false)}
                className="text-bark hover:text-night transition-colors"
              >
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
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "bg-earth text-cream rounded-br-md"
                        : "bg-sand text-night rounded-bl-md"
                    }`}
                  >
                    {msg.text}
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
                    type={step === "email" ? "email" : "text"}
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
