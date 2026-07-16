"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

type Dict = Record<string, { es: string; en: string }>;

// UI chrome labels (buttons, nav, admin). Site copy lives in the DB.
export const UI: Dict = {
  "nav.home": { es: "Inicio", en: "Home" },
  "nav.about": { es: "Sobre Nosotros", en: "About" },
  "nav.classes": { es: "Clases", en: "Classes" },
  "nav.schedule": { es: "Horarios", en: "Schedule" },
  "nav.teachers": { es: "Maestros", en: "Teachers" },
  "nav.events": { es: "Eventos", en: "Events" },
  "nav.gallery": { es: "Galería", en: "Gallery" },
  "nav.contact": { es: "Contacto", en: "Contact" },
  "cta.book": { es: "Reservar Clase", en: "Book a Class" },
  "cta.whatsapp": { es: "Escríbenos", en: "Message Us" },
  "cta.viewSchedule": { es: "Ver Horarios", en: "View Schedule" },
  "cta.allEvents": { es: "Todos los Eventos", en: "All Events" },
  "cta.moreInfo": { es: "Más Información", en: "More Info" },
  "cta.joinNow": { es: "Únete Ahora", en: "Join Now" },
  "cta.send": { es: "Enviar", en: "Send" },
  "cta.subscribe": { es: "Suscribirse", en: "Subscribe" },
  "label.level.beginner": { es: "Principiante", en: "Beginner" },
  "label.level.intermediate": { es: "Intermedio", en: "Intermediate" },
  "label.level.advanced": { es: "Avanzado", en: "Advanced" },
  "label.level.all": { es: "Todos los niveles", en: "All levels" },
  "label.online": { es: "En línea", en: "Online" },
  "label.inPerson": { es: "Presencial", en: "In person" },
  "label.free": { es: "Gratis", en: "Free" },
  "label.sunday": { es: "Domingo", en: "Sunday" },
  "label.monday": { es: "Lunes", en: "Monday" },
  "label.tuesday": { es: "Martes", en: "Tuesday" },
  "label.wednesday": { es: "Miércoles", en: "Wednesday" },
  "label.thursday": { es: "Jueves", en: "Thursday" },
  "label.friday": { es: "Viernes", en: "Friday" },
  "label.saturday": { es: "Sábado", en: "Saturday" },
  "schedule.weekly": { es: "Horario Semanal", en: "Weekly Schedule" },
  "schedule.noClasses": { es: "Sin clases este día", en: "No classes this day" },
  "contact.title": { es: "Visítanos", en: "Visit Us" },
  "contact.address": { es: "Santa Cruz de la Sierra, Bolivia", en: "Santa Cruz de la Sierra, Bolivia" },
  "contact.followUs": { es: "Síguenos", en: "Follow Us" },
  "contact.newsletter": { es: "Boletín", en: "Newsletter" },
  "contact.newsletterDesc": { es: "Recibe nuestras novedades, eventos y enseñanzas.", en: "Receive our news, events and teachings." },
  "contact.name": { es: "Nombre", en: "Name" },
  "contact.email": { es: "Correo", en: "Email" },
  "contact.message": { es: "Mensaje", en: "Message" },
  "footer.rights": { es: "Todos los derechos reservados.", en: "All rights reserved." },
  "footer.admin": { es: "Admin", en: "Admin" },
  "admin.login.title": { es: "Portal de Administración", en: "Admin Portal" },
  "admin.login.subtitle": { es: "Casa Bhakti", en: "Casa Bhakti" },
  "admin.login.username": { es: "Usuario", en: "Username" },
  "admin.login.password": { es: "Contraseña", en: "Password" },
  "admin.login.submit": { es: "Ingresar", en: "Sign In" },
  "admin.login.error": { es: "Usuario o contraseña incorrectos.", en: "Incorrect username or password." },
  "admin.login.back": { es: "Volver al sitio", en: "Back to site" },
  "admin.nav.dashboard": { es: "Panel", en: "Dashboard" },
  "admin.nav.content": { es: "Contenido", en: "Content" },
  "admin.nav.classes": { es: "Clases", en: "Classes" },
  "admin.nav.schedule": { es: "Horarios", en: "Schedule" },
  "admin.nav.events": { es: "Eventos", en: "Events" },
  "admin.nav.teachers": { es: "Maestros", en: "Teachers" },
  "admin.nav.gallery": { es: "Galería", en: "Gallery" },
  "admin.nav.logout": { es: "Cerrar Sesión", en: "Logout" },
  "admin.nav.viewSite": { es: "Ver Sitio", en: "View Site" },
  "admin.common.save": { es: "Guardar", en: "Save" },
  "admin.common.saving": { es: "Guardando…", en: "Saving…" },
  "admin.common.saved": { es: "Guardado", en: "Saved" },
  "admin.common.add": { es: "Añadir", en: "Add" },
  "admin.common.edit": { es: "Editar", en: "Edit" },
  "admin.common.delete": { es: "Eliminar", en: "Delete" },
  "admin.common.cancel": { es: "Cancelar", en: "Cancel" },
  "admin.common.create": { es: "Crear", en: "Create" },
  "admin.common.update": { es: "Actualizar", en: "Update" },
  "admin.common.confirmDelete": { es: "¿Eliminar este elemento?", en: "Delete this item?" },
  "admin.common.titleEn": { es: "Título (Inglés)", en: "Title (English)" },
  "admin.common.titleEs": { es: "Título (Español)", en: "Title (Spanish)" },
  "admin.common.nameEn": { es: "Nombre (Inglés)", en: "Name (English)" },
  "admin.common.nameEs": { es: "Nombre (Español)", en: "Name (Spanish)" },
  "admin.common.descEn": { es: "Descripción (Inglés)", en: "Description (English)" },
  "admin.common.descEs": { es: "Descripción (Español)", en: "Description (Spanish)" },
  "admin.common.imageUrl": { es: "URL de Imagen", en: "Image URL" },
  "admin.common.order": { es: "Orden", en: "Order" },
  "admin.common.selectImage": { es: "Elegir de la galería", en: "Choose from gallery" },
  "admin.placeholder.search": { es: "Buscar…", en: "Search…" },
};

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cb-lang") as Lang | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "es" || stored === "en") setLangState(stored);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("cb-lang", lang);
    } catch {}
    document.documentElement.lang = lang;
  }, [lang, ready]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((p) => (p === "es" ? "en" : "es")),
    []
  );

  const t = useCallback(
    (key: string) => {
      const entry = UI[key];
      if (!entry) return key;
      return entry[lang] ?? entry.es ?? key;
    },
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang, toggle, t }),
    [lang, setLang, toggle, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

// Pick the right language value from a bilingual pair
export function pick(en: string, es: string, lang: Lang) {
  return lang === "en" ? en : es;
}
