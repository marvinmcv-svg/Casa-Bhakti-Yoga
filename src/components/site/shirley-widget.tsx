"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, type Lang } from "@/lib/i18n";
import { Send, X, Sparkles, Flower2 } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
  ts: number;
}

const WHATSAPP_URL = "https://wa.me/59167394998";

const QUICK_REPLIES_ES = [
  "¿Qué clases tienen?",
  "¿Cuáles son los horarios?",
  "¿Cuánto cuesta?",
  "Soy principiante, ¿por dónde empiezo?",
  "Quiero reservar una clase",
];

const QUICK_REPLIES_EN = [
  "What classes do you offer?",
  "What's the schedule?",
  "How much does it cost?",
  "I'm a beginner, where do I start?",
  "I want to book a class",
];

export function ShirleyWidget() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevLangRef = useRef<Lang>(lang);

  const greeting =
    lang === "es"
      ? "¡Hola! ✦ Soy Shirley, de Casa Bhakti. ¿En qué puedo ayudarte hoy? Puedo contarte sobre nuestras clases, horarios, o ayudarte a reservar tu primera clase. 🌿"
      : "Hi! ✦ I'm Shirley from Casa Bhakti. How can I help you today? I can tell you about our classes, schedule, or help you book your first class. 🌿";

  // Load conversation from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cb-shirley-chat");
      if (stored) {
        const parsed = JSON.parse(stored) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          setHasGreeted(true);
        }
      }
    } catch {}
  }, []);

  // Persist conversation
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem("cb-shirley-chat", JSON.stringify(messages.slice(-30)));
      } catch {}
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  // Greet on first open
  useEffect(() => {
    if (open && !hasGreeted) {
      setMessages([{ role: "assistant", content: greeting, ts: Date.now() }]);
      setHasGreeted(true);
    }
  }, [open, hasGreeted, greeting]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // Update greeting language when lang changes (only if greeting is the only message)
  useEffect(() => {
    if (prevLangRef.current === lang) return;
    prevLangRef.current = lang;
    if (hasGreeted && messages.length === 1 && messages[0].role === "assistant") {
      setMessages([{ role: "assistant", content: greeting, ts: Date.now() }]);
    }
  }, [lang, hasGreeted, messages, greeting]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    const userMsg: Message = { role: "user", content: trimmed, ts: Date.now() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const responseText = data.response || data.error || "…";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: responseText, ts: Date.now() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            lang === "es"
              ? "Tuve un problemita técnico 🙏 Mientras tanto, escríbenos por WhatsApp y te ayudamos: https://wa.me/59167394998"
              : "I had a small technical issue 🙏 In the meantime, message us on WhatsApp: https://wa.me/59167394998",
          ts: Date.now(),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const quickReplies = lang === "es" ? QUICK_REPLIES_ES : QUICK_REPLIES_EN;
  const showQuickReplies = messages.length <= 2;

  // Detect if Shirley's last message mentions booking/whatsapp
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const showBookingCta =
    open &&
    lastAssistant &&
    (lastAssistant.content.toLowerCase().includes("whatsapp") ||
      lastAssistant.content.toLowerCase().includes("reserv") ||
      lastAssistant.content.toLowerCase().includes("wa.me") ||
      lastAssistant.content.toLowerCase().includes("book"));

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      lang === "es"
        ? "Hola Shirley me ayudó por el chat y quiero reservar una clase 🙏"
        : "Hi, Shirley helped me on the chat and I'd like to book a class 🙏"
    );
    window.open(`${WHATSAPP_URL}?text=${text}`, "_blank");
    toast.success(lang === "es" ? "Abriendo WhatsApp…" : "Opening WhatsApp…");
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            onClick={() => setOpen(true)}
            className="group fixed bottom-6 right-6 z-[55] flex items-center gap-3 rounded-full bg-clay py-3 pl-3 pr-5 text-cream shadow-2xl shadow-clay/30 transition-all hover:bg-clay/90 hover:pr-6 sm:bottom-8 sm:right-8"
            aria-label={lang === "es" ? "Hablar con Shirley" : "Chat with Shirley"}
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-cream/15">
              <Flower2 size={20} className="text-cream" />
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-sage" />
              </span>
            </div>
            <div className="text-left">
              <div className="text-sm font-medium leading-tight">Shirley</div>
              <div className="text-[9px] uppercase tracking-[0.15em] text-cream/70">
                {lang === "es" ? "Recepcionista · Online" : "Receptionist · Online"}
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed bottom-0 right-0 z-[56] flex h-[100svh] w-full flex-col bg-cream sm:bottom-6 sm:right-6 sm:h-[560px] sm:max-h-[80vh] sm:w-[380px] sm:rounded-2xl sm:border sm:border-border sm:shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-espresso px-4 py-3.5 text-cream sm:rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-clay/30">
                  <Flower2 size={18} className="text-cream" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-espresso bg-sage" />
                </div>
                <div>
                  <div className="font-serif text-lg leading-tight">Shirley</div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-cream/60">
                    {lang === "es" ? "Casa Bhakti · Recepcionista" : "Casa Bhakti · Receptionist"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-cream/10"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto scrollbar-elegant bg-cream px-4 py-4"
            >
              {messages.map((m, i) => (
                <MessageBubble key={i} message={m} lang={lang} />
              ))}

              {sending && (
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-clay/15">
                    <Flower2 size={14} className="text-clay" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-secondary px-4 py-3">
                    <Dot delay={0} />
                    <Dot delay={0.15} />
                    <Dot delay={0.3} />
                  </div>
                </div>
              )}

              {/* Booking CTA */}
              <AnimatePresence>
                {showBookingCta && !sending && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={openWhatsApp}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-medium text-white transition-colors hover:bg-[#1da851]"
                  >
                    <WhatsAppIcon size={16} />
                    {lang === "es" ? "Reservar por WhatsApp" : "Book via WhatsApp"}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Quick replies */}
            <AnimatePresence>
              {showQuickReplies && !sending && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-1.5 border-t border-border bg-cream px-4 pt-3"
                >
                  {quickReplies.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-clay/30 bg-clay/5 px-3 py-1.5 text-xs text-clay transition-colors hover:bg-clay hover:text-cream"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-border bg-cream p-3 sm:rounded-b-2xl"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === "es" ? "Escribe a Shirley…" : "Message Shirley…"}
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-clay"
                disabled={sending}
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay text-cream transition-colors hover:bg-clay/90 disabled:opacity-40"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ message, lang }: { message: Message; lang: "es" | "en" }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-clay/15">
          <Flower2 size={14} className="text-clay" />
        </div>
      )}
      <div
        className={`max-w-[78%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-clay text-cream"
            : "rounded-bl-sm bg-secondary text-espresso"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
      className="block h-1.5 w-1.5 rounded-full bg-muted-foreground"
    />
  );
}

function WhatsAppIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
