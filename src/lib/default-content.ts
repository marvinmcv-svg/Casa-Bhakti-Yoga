import { db } from "@/lib/db";

// All default Casa Bhakti content, bilingual, using REAL scraped imagery.
// The admin can edit every field of this afterward.

export const SITE_CONTENT: Record<string, { en: string; es: string }> = {
  "classes.body": {
    en: "From a gentle Hatha to a devotional Kirtan, every class is an invitation to return to yourself.",
    es: "Desde un Hatha suave hasta un Kirtan devocional, cada clase es una invitación a regresar a ti mismo.",
  },
  "classes.eyebrow": { en: "003 — Classes", es: "003 — Clases" },
  "classes.title": { en: "Practice with us", es: "Practica con nosotros" },
  "contact.body": {
    en: "We are in Santa Cruz de la Sierra, Bolivia. Reach out by WhatsApp to reserve your spot or ask anything.",
    es: "Estamos en Santa Cruz de la Sierra, Bolivia. Escríbenos por WhatsApp para reservar tu lugar o preguntar lo que necesites.",
  },
  "contact.eyebrow": { en: "008 — Visit", es: "008 — Visítanos" },
  "contact.facebookUrl": { en: "https://www.facebook.com/casabhaktiscz", es: "https://www.facebook.com/casabhaktiscz" },
  "contact.instagram": { en: "@casabhakti.scz", es: "@casabhakti.scz" },
  "contact.instagramUrl": { en: "https://www.instagram.com/casabhakti.scz/?hl=es", es: "https://www.instagram.com/casabhakti.scz/?hl=es" },
  "contact.phone1": { en: "+591 67394998", es: "+591 67394998" },
  "contact.phone2": { en: "+591 67409052", es: "+591 67409052" },
  "contact.title": { en: "Come practice with us", es: "Ven a practicar con nosotros" },
  "events.body": {
    en: "Retreats, trainings, and gatherings that deepen your practice and connection.",
    es: "Retiros, formaciones y encuentros que profundizan tu práctica y conexión.",
  },
  "events.eyebrow": { en: "006 — Events", es: "006 — Eventos" },
  "events.title": { en: "Special gatherings", es: "Encuentros especiales" },
  "footer.address": { en: "Santa Cruz de la Sierra, Bolivia", es: "Santa Cruz de la Sierra, Bolivia" },
  "footer.newsletterTitle": { en: "Join our circle", es: "Únete a nuestro círculo" },
  "footer.tagline": { en: "Templo de Yoga & Vedanta · Santa Cruz, Bolivia", es: "Templo de Yoga & Vedanta · Santa Cruz, Bolivia" },
  "gallery.body": {
    en: "Moments of practice, devotion, and community, captured in Santa Cruz.",
    es: "Momentos de práctica, devoción y comunidad, capturados en Santa Cruz.",
  },
  "gallery.eyebrow": { en: "007 — Gallery", es: "007 — Galería" },
  "gallery.title": { en: "Life at the temple", es: "Vida en el templo" },
  "hero.line1": { en: "Tu espacio", es: "Tu espacio" },
  "hero.line2": { en: "de silencio", es: "de silencio" },
  "hero.line3": { en: "y devoción", es: "y devoción" },
  "hero.subtitle": {
    en: "A temple of yoga and wisdom in the heart of Santa Cruz.",
    es: "Un templo de yoga y sabiduría en el corazón de Santa Cruz.",
  },
  "intro.body": {
    en: "Casa Bhakti is a sanctuary where yoga is lived, not just practiced. A place to find your center, connect with your essence, and grow in community, right here in Santa Cruz.",
    es: "Casa Bhakti es un refugio donde el yoga se vive, no solo se practica. Es un lugar para encontrar tu centro, conectar con tu esencia y crecer en comunidad, aquí en Santa Cruz.",
  },
  "intro.eyebrow": { en: "001 — About Us", es: "001 — Sobre Nosotros" },
  "intro.meetLink": { en: "Meet our teachers", es: "Conoce a nuestros maestros" },
  "intro.stat1.label": { en: "Founded", es: "Fundada" },
  "intro.stat1.value": { en: "2018", es: "2018" },
  "intro.stat2.label": { en: "Years of practice", es: "Años de práctica" },
  "intro.stat2.value": { en: "11+", es: "11+" },
  "intro.stat3.label": { en: "Teacher training", es: "Formación de profesores" },
  "intro.stat3.value": { en: "200h", es: "200h" },
  "intro.title": { en: "More than a yoga studio.", es: "Más que un yoga studio." },
  "nav.brand": { en: "Casa Bhakti", es: "Casa Bhakti" },
  "philosophy.body": {
    en: "Following Swami Sivananda, these four paths are trails that converge on the same inner truth.",
    es: "Siguiendo a Swami Sivananda, estos cuatro caminos son senderos que convergen en la misma verdad interior.",
  },
  "philosophy.eyebrow": { en: "002 — Tradition", es: "002 — Tradición" },
  "philosophy.path1.desc": {
    en: "The path of selfless service. Acting without expecting the fruit.",
    es: "El camino del servicio desinteresado. Actuar sin esperar el fruto.",
  },
  "philosophy.path1.title": { en: "Karma Yoga", es: "Karma Yoga" },
  "philosophy.path2.desc": {
    en: "The path of devotion. Opening the heart through song and love.",
    es: "El camino de la devoción. Abrir el corazón con canto y amor.",
  },
  "philosophy.path2.title": { en: "Bhakti Yoga", es: "Bhakti Yoga" },
  "philosophy.path3.desc": {
    en: "The path of meditation. Calming the waves of the mind to see the depths.",
    es: "El camino de la meditación. Calmar las olas de la mente para ver el fondo.",
  },
  "philosophy.path3.title": { en: "Raja Yoga", es: "Raja Yoga" },
  "philosophy.path4.desc": {
    en: "The path of wisdom. Inquiring into the nature of your true Self.",
    es: "El camino de la sabiduría. Indagar en la naturaleza de tu Ser verdadero.",
  },
  "philosophy.path4.title": { en: "Jnana Yoga", es: "Jnana Yoga" },
  "philosophy.title": { en: "The four paths of yoga", es: "Los cuatro caminos del yoga" },
  "quote.author": { en: "Swami Sivananda", es: "Swami Sivananda" },
  "quote.text": {
    en: "Health is wealth. Peace of mind is happiness. Yoga shows the way.",
    es: "La salud es riqueza. La paz mental es felicidad. Yoga muestra el camino.",
  },
  "schedule.body": {
    en: "We await you to live yoga in community. Sundays are special: meditation, asana, philosophy and kirtan.",
    es: "Te esperamos para vivir el yoga en comunidad. Los domingos son especiales: meditación, asana, filosofía y kirtan.",
  },
  "schedule.eyebrow": { en: "004 — Schedule", es: "004 — Horarios" },
  "schedule.title": { en: "Your week at the temple", es: "Tu semana en el templo" },
  "teachers.body": {
    en: "Our teachers walk the path before they share it. Trained in the Sivananda lineage and devoted to the heart.",
    es: "Nuestros maestros caminan el camino antes de compartirlo. Formados en el linaje Sivananda y entregados al corazón.",
  },
  "teachers.eyebrow": { en: "005 — Teachers", es: "005 — Maestros" },
  "teachers.title": { en: "Guides on the path", es: "Guías en el camino" },
  "testimonials.eyebrow": { en: "006 — Voices", es: "006 — Voces" },
  "testimonials.title": { en: "Words from our community", es: "Palabras de nuestra comunidad" },
  "testimonials.body": {
    en: "The practice leaves a mark. These are the voices of those who walked through our doors.",
    es: "La práctica deja una huella. Estas son las voces de quienes pasaron por nuestras puertas.",
  },
  "videos.eyebrow": { en: "009 — Watch", es: "009 — Mira" },
  "videos.title": { en: "Moving images", es: "Imágenes en movimiento" },
  "videos.body": {
    en: "Moments of practice, kirtan and stillness — captured on video.",
    es: "Momentos de práctica, kirtan y quietud — capturados en video.",
  },
};

const CLASS_TYPES = [
  {
    nameEn: "Hatha Yoga",
    nameEs: "Hatha Yoga",
    descriptionEn:
      "The classical foundation. Postures, breath and awareness to balance body and mind.",
    descriptionEs:
      "La base clásica. Posturas, respiración y conciencia para equilibrar cuerpo y mente.",
    level: "all",
    durationMin: 90,
    imageUrl: "/media/hero-yoga-class.jpg",
    order: 0,
  },
  {
    nameEn: "Meditation",
    nameEs: "Meditación",
    descriptionEn:
      "Still the mind and rest in the Self. Guided meditation in the Raja Yoga tradition.",
    descriptionEs:
      "Aquietar la mente y descansar en el Ser. Meditación guiada en la tradición del Raja Yoga.",
    level: "all",
    durationMin: 60,
    imageUrl: "/media/hero-yoga-meditation.jpg",
    order: 1,
  },
  {
    nameEn: "Kirtan",
    nameEs: "Kirtan",
    descriptionEn:
      "Devotional chanting of mantras. Open the heart and sing together as one voice.",
    descriptionEs:
      "Canto devocional de mantras. Abre el corazón y canta junto a otros como una sola voz.",
    level: "all",
    durationMin: 90,
    imageUrl: "/media/hero-kirtan.jpg",
    order: 2,
  },
  {
    nameEn: "Vedanta Philosophy",
    nameEs: "Filosofía Vedanta",
    descriptionEn:
      "Study the timeless wisdom of the Upanishads and the path of self-inquiry.",
    descriptionEs:
      "Estudia la sabiduría atemporal de los Upanishads y el camino de la auto-indagación.",
    level: "all",
    durationMin: 90,
    imageUrl: "/media/about-bhakti.jpg",
    order: 3,
  },
  {
    nameEn: "Vinyasa Flow",
    nameEs: "Vinyasa Flow",
    descriptionEn:
      "A moving meditation. Breath-led sequences that build strength and grace.",
    descriptionEs:
      "Una meditación en movimiento. Secuencias guiadas por la respiración que construyen fuerza y gracia.",
    level: "intermediate",
    durationMin: 75,
    imageUrl: "/media/hero-yoga-retreat.jpg",
    order: 4,
  },
];

const SCHEDULE = [
  { day: 0, start: "08:15", end: "09:00", classIdx: 1, instructorEn: "Kalyani Dasi", instructorEs: "Kalyani Dasi", online: true },
  { day: 0, start: "09:00", end: "10:30", classIdx: 0, instructorEn: "Kalyani Dasi", instructorEs: "Kalyani Dasi", online: false },
  { day: 0, start: "10:30", end: "12:00", classIdx: 3, instructorEn: "Pablo Narayana", instructorEs: "Pablo Narayana", online: true },
  { day: 0, start: "18:30", end: "20:00", classIdx: 2, instructorEn: "Kalyani Dasi", instructorEs: "Kalyani Dasi", online: true },
  { day: 1, start: "09:00", end: "10:30", classIdx: 0, instructorEn: "Pablo Narayana", instructorEs: "Pablo Narayana", online: false },
  { day: 1, start: "18:30", end: "19:45", classIdx: 4, instructorEn: "Pablo Narayana", instructorEs: "Pablo Narayana", online: false },
  { day: 2, start: "09:00", end: "10:30", classIdx: 4, instructorEn: "Kalyani Dasi", instructorEs: "Kalyani Dasi", online: false },
  { day: 2, start: "18:30", end: "19:30", classIdx: 1, instructorEn: "Kalyani Dasi", instructorEs: "Kalyani Dasi", online: true },
  { day: 3, start: "09:00", end: "10:30", classIdx: 0, instructorEn: "Pablo Narayana", instructorEs: "Pablo Narayana", online: false },
  { day: 3, start: "18:30", end: "20:00", classIdx: 2, instructorEn: "Kalyani Dasi", instructorEs: "Kalyani Dasi", online: false },
  { day: 4, start: "09:00", end: "10:30", classIdx: 4, instructorEn: "Kalyani Dasi", instructorEs: "Kalyani Dasi", online: false },
  { day: 4, start: "18:30", end: "19:45", classIdx: 1, instructorEn: "Pablo Narayana", instructorEs: "Pablo Narayana", online: true },
  { day: 5, start: "09:00", end: "10:30", classIdx: 0, instructorEn: "Pablo Narayana", instructorEs: "Pablo Narayana", online: false },
  { day: 6, start: "10:00", end: "11:30", classIdx: 0, instructorEn: "Kalyani Dasi", instructorEs: "Kalyani Dasi", online: false },
  { day: 6, start: "17:00", end: "18:30", classIdx: 4, instructorEn: "Pablo Narayana", instructorEs: "Pablo Narayana", online: false },
];

const TEACHERS = [
  {
    nameEn: "Kalyani Dasi",
    nameEs: "Kalyani Dasi",
    roleEn: "Founder & Lead Teacher",
    roleEs: "Fundadora y Maestra Principal",
    bioEn:
      "Born in Bolivia, Kalyani has practiced yoga for over 11 years. She founded Casa Bhakti in 2018, certified in the Sivananda tradition, and blends devotion (Bhakti) with a deep knowledge of Vedanta philosophy.",
    bioEs:
      "Nacida en Bolivia, Kalyani practica yoga desde hace más de 11 años. Fundó Casa Bhakti en 2018, certificada en la tradición Sivananda, y combina la devoción (Bhakti) con un profundo conocimiento de la filosofía Vedanta.",
    specialtiesEn: "Bhakti Yoga · Vedanta · Kirtan",
    specialtiesEs: "Bhakti Yoga · Vedanta · Kirtan",
    imageUrl: "/media/teacher-01.jpg",
    order: 0,
  },
  {
    nameEn: "Pablo Narayana",
    nameEs: "Pablo Narayana",
    roleEn: "Teacher & Co-Guide",
    roleEs: "Maestro y Co-Guía",
    bioEn:
      "Born in Mexico City, Pablo began yoga in 2011 and spent four years traveling and living in ashrams learning from great teachers. Founder of @sadhananow, he teaches Hatha, Vedanta and the art of presence.",
    bioEs:
      "Nacido en la Ciudad de México, Pablo comenzó el yoga en 2011 y pasó cuatro años viajando y viviendo en ashrams aprendiendo de grandes maestros. Fundador de @sadhananow, enseña Hatha, Vedanta y el arte de la presencia.",
    specialtiesEn: "Hatha Yoga · Vedanta · Meditation",
    specialtiesEs: "Hatha Yoga · Vedanta · Meditación",
    imageUrl: "/media/teacher-02.jpg",
    order: 1,
  },
  {
    nameEn: "Swami Kashi Muktananda",
    nameEs: "Swami Kashi Muktananda",
    roleEn: "Visiting Teacher",
    roleEs: "Maestro Visitante",
    bioEn:
      "For over 20 years he has lived in the Himalayas and Sivananda ashrams, studying Sanskrit, Hindi and Vedanta with his guru Swami Chaitanyananda of Uttarkashi — a direct disciple of the Sivananda lineage.",
    bioEs:
      "Por más de 20 años ha vivido en los Himalayas y ashrams Sivananda, estudiando sánscrito, hindi y Vedanta con su guru Swami Chaitanyananda de Uttarkashi — discípulo directo del linaje Sivananda.",
    specialtiesEn: "Vedanta · Sanskrit · Mantra",
    specialtiesEs: "Vedanta · Sánscrito · Mantra",
    imageUrl: "/media/teacher-swami-kashi.jpeg",
    order: 2,
  },
];

const EVENTS = [
  {
    titleEn: "Profesorado de Yoga — 200 Hours",
    titleEs: "Profesorado de Yoga — 200 Horas",
    descriptionEn:
      "A five-week, 200-hour immersion into the four paths of yoga — service, devotion, meditation and wisdom. For beginners, advanced practitioners and teachers alike. Certification included.",
    descriptionEs:
      "Una inmersión de cinco semanas y 200 horas en los cuatro caminos del yoga — servicio, devoción, meditación y sabiduría. Para principiantes, practicantes avanzados y maestros. Certificación incluida.",
    dateOffsetDays: 90,
    endTime: "18:00",
    locationEn: "Casa Bhakti, Santa Cruz",
    locationEs: "Casa Bhakti, Santa Cruz",
    imageUrl: "/media/event-01.jpeg",
    priceEn: "Inquire via WhatsApp",
    priceEs: "Consultar por WhatsApp",
    featured: true,
    order: 0,
  },
  {
    titleEn: "Yoga en Santa Cruz — Community Route",
    titleEs: "Yoga en Santa Cruz — Ruta Comunitaria",
    descriptionEn:
      "A month-long journey across 8 yoga centers of the city. The first 10 to complete the route win a month of unlimited free classes. A celebration of the Santa Cruz yoga community.",
    descriptionEs:
      "Un viaje de un mes por 8 centros de yoga de la ciudad. Los primeros 10 en completar la ruta ganan un mes de clases ilimitadas gratis. Una celebración de la comunidad de yoga de Santa Cruz.",
    dateOffsetDays: 30,
    endTime: null,
    locationEn: "8 studios across Santa Cruz",
    locationEs: "8 estudios en Santa Cruz",
    imageUrl: "/media/event-02.jpeg",
    priceEn: "Free",
    priceEs: "Gratis",
    featured: true,
    order: 1,
  },
  {
    titleEn: "Sunday Kirtan & Satsang",
    titleEs: "Kirtan & Satsang Dominical",
    descriptionEn:
      "Our weekly gathering of heart-opening mantra chanting, guided meditation and spiritual discourse. In person and online. All are welcome.",
    descriptionEs:
      "Nuestro encuentro semanal de canto de mantras que abre el corazón, meditación guiada y discurso espiritual. Presencial y en línea. Todos son bienvenidos.",
    dateOffsetDays: 7,
    endTime: "20:00",
    locationEn: "Casa Bhakti & Online",
    locationEs: "Casa Bhakti y En línea",
    imageUrl: "/media/kirtan-01.png",
    priceEn: "50 Bs",
    priceEs: "50 Bs",
    featured: false,
    order: 2,
  },
];

const GALLERY = [
  { imageUrl: "/media/gallery-01.jpg", captionEn: "Morning practice", captionEs: "Práctica matutina", type: "image" },
  { imageUrl: "/media/gallery-02.jpg", captionEn: "Devotion in motion", captionEs: "Devoción en movimiento", type: "image" },
  { imageUrl: "/media/gallery-03.jpg", captionEn: "The temple space", captionEs: "El espacio del templo", type: "image" },
  { imageUrl: "/media/gallery-04.jpg", captionEn: "Kirtan night", captionEs: "Noche de kirtan", type: "image" },
  { imageUrl: "/media/gallery-05.jpg", captionEn: "Community", captionEs: "Comunidad", type: "image" },
  { imageUrl: "/media/gallery-06.jpg", captionEn: "Stillness", captionEs: "Quietud", type: "image" },
  { imageUrl: "/media/gallery-07.jpg", captionEn: "Breath", captionEs: "Respiración", type: "image" },
  { imageUrl: "/media/gallery-08.jpg", captionEn: "Asana", captionEs: "Asana", type: "image" },
  { imageUrl: "/media/gallery-09.jpg", captionEn: "Meditation", captionEs: "Meditación", type: "image" },
  { imageUrl: "/media/gallery-10.jpg", captionEn: "Gathering", captionEs: "Encuentro", type: "image" },
  { imageUrl: "/media/gallery-11.jpg", captionEn: "Light", captionEs: "Luz", type: "image" },
  { imageUrl: "/media/gallery-12.jpg", captionEn: "Presence", captionEs: "Presencia", type: "image" },
];

const TESTIMONIALS = [
  {
    quoteEn: "Sometimes we believe yoga is only postures on a mat, but in reality it is a way of seeing life. At Casa Bhakti we explore these teachings every day.",
    quoteEs: "A veces creemos que el yoga es solo posturas en un mat, pero en realidad es una forma de ver la vida. En Casa Bhakti exploramos estas enseñanzas todos los días.",
    authorName: "Kalyani Dasi",
    authorRoleEn: "Founder",
    authorRoleEs: "Fundadora",
    authorImage: "/media/teacher-01.jpg",
    rating: 5, featured: true, order: 0,
  },
  {
    quoteEn: "Becoming a yoga teacher is not learning to teach… it is remembering how to live in presence.",
    quoteEs: "Convertirse en profesor de yoga no es aprender a enseñar… es recordar cómo vivir en presencia.",
    authorName: "Pablo Narayana",
    authorRoleEn: "Teacher & Co-Guide",
    authorRoleEs: "Maestro y Co-Guía",
    authorImage: "/media/teacher-02.jpg",
    rating: 5, featured: true, order: 1,
  },
  {
    quoteEn: "The paradox is that we are, at the same time, human and divine.",
    quoteEs: "La paradoja es que somos al mismo tiempo, humanos y divinos.",
    authorName: "Baba Ram Dass",
    authorRoleEn: "Inspiration",
    authorRoleEs: "Inspiración",
    authorImage: "",
    rating: 5, featured: false, order: 2,
  },
  {
    quoteEn: "Health is wealth. Peace of mind is happiness. Yoga shows the way.",
    quoteEs: "La salud es riqueza. La paz mental es felicidad. Yoga muestra el camino.",
    authorName: "Swami Sivananda",
    authorRoleEn: "Lineage",
    authorRoleEs: "Linaje",
    authorImage: "",
    rating: 5, featured: false, order: 3,
  },
];

const VIDEOS = [
  {
    titleEn: "Casa Bhakti — A way of life",
    titleEs: "Casa Bhakti — Una forma de vida",
    descriptionEn: "Truth, wisdom, compassion, love, equanimity and peace. And the fact of living a life accordingly.",
    descriptionEs: "Verdad, sabiduría, compasión, amor, ecuanimidad y paz. Y el hecho de vivir una vida en consecuencia.",
    videoUrl: "/media/hero-bhakti-video.mp4",
    posterUrl: "/media/hero-yoga-retreat.jpg",
    sourceEn: "Casa Bhakti",
    sourceEs: "Casa Bhakti",
    featured: true, order: 0,
  },
];

export async function seedDatabase(force = false) {
  if (force) {
    await db.video.deleteMany();
    await db.testimonial.deleteMany();
    await db.galleryItem.deleteMany();
    await db.event.deleteMany();
    await db.classSchedule.deleteMany();
    await db.classType.deleteMany();
    await db.teacher.deleteMany();
    await db.siteContent.deleteMany();
  }

  // Site content — always upsert, but use empty update so we NEVER overwrite admin edits.
  for (const [key, val] of Object.entries(SITE_CONTENT)) {
    await db.siteContent.upsert({
      where: { key },
      create: { key, valueEn: val.en, valueEs: val.es },
      update: force ? { valueEn: val.en, valueEs: val.es } : {},
    });
  }

  // Classes — only seed if table is empty
  if ((await db.classType.count()) === 0) {
    const classIds: string[] = [];
    for (const c of CLASS_TYPES) {
      const created = await db.classType.create({ data: c });
      classIds.push(created.id);
    }
    for (let i = 0; i < SCHEDULE.length; i++) {
      const s = SCHEDULE[i];
      await db.classSchedule.create({
        data: {
          dayOfWeek: s.day, startTime: s.start, endTime: s.end,
          classTypeId: classIds[s.classIdx],
          instructorEn: s.instructorEn, instructorEs: s.instructorEs,
          online: s.online, order: i,
        },
      });
    }
  }

  if ((await db.teacher.count()) === 0) {
    for (const t of TEACHERS) await db.teacher.create({ data: t });
  }

  if ((await db.event.count()) === 0) {
    for (const e of EVENTS) {
      const date = new Date();
      date.setDate(date.getDate() + e.dateOffsetDays);
      date.setHours(9, 0, 0, 0);
      await db.event.create({
        data: {
          titleEn: e.titleEn, titleEs: e.titleEs,
          descriptionEn: e.descriptionEn, descriptionEs: e.descriptionEs,
          date, endTime: e.endTime,
          locationEn: e.locationEn, locationEs: e.locationEs,
          imageUrl: e.imageUrl, priceEn: e.priceEn, priceEs: e.priceEs,
          featured: e.featured, order: e.order,
        },
      });
    }
  }

  if ((await db.galleryItem.count()) === 0) {
    for (let i = 0; i < GALLERY.length; i++) {
      await db.galleryItem.create({ data: { ...GALLERY[i], order: i } });
    }
  }

  if ((await db.testimonial.count()) === 0) {
    for (const t of TESTIMONIALS) await db.testimonial.create({ data: t });
  }

  if ((await db.video.count()) === 0) {
    for (const v of VIDEOS) await db.video.create({ data: v });
  }

  return { seeded: true, forced: force };
}

export const GALLERY_IMAGES = [
  "/media/gallery-01.jpg", "/media/gallery-02.jpg", "/media/gallery-03.jpg",
  "/media/gallery-04.jpg", "/media/gallery-05.jpg", "/media/gallery-06.jpg",
  "/media/gallery-07.jpg", "/media/gallery-08.jpg", "/media/gallery-09.jpg",
  "/media/gallery-10.jpg", "/media/gallery-11.jpg", "/media/gallery-12.jpg",
  "/media/hero-yoga-retreat.jpg", "/media/hero-yoga-meditation.jpg",
  "/media/hero-yoga-class.jpg", "/media/hero-kirtan.jpg",
  "/media/about-yoga-practice.jpg", "/media/about-studio.jpg", "/media/about-bhakti.jpg",
  "/media/kirtan-01.png", "/media/kirtan-02.png", "/media/kirtan-03.png",
  "/media/kirtan-04.png", "/media/kirtan-05.png", "/media/kirtan-06.png",
  "/media/teacher-01.jpg", "/media/teacher-02.jpg", "/media/teacher-03.jpg",
  "/media/teacher-04.jpg", "/media/teacher-05.jpg", "/media/teacher-06.jpg",
  "/media/teacher-07.jpg", "/media/teacher-swami-kashi.jpeg",
  "/media/event-01.jpeg", "/media/event-02.jpeg",
  ...Array.from({ length: 15 }, (_, i) => `/media/gallery-${String(i + 1).padStart(2, "0")}.jpg`),
];
