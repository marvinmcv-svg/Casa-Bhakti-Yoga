import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { ensureDefaultAdmin } from "@/lib/auth";
import { seedDatabase } from "@/lib/default-content";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const DAYS_ES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const DAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function buildContext(): Promise<string> {
  await ensureDefaultAdmin();
  await seedDatabase();

  const [content, classes, schedule, events, teachers] = await Promise.all([
    db.siteContent.findMany(),
    db.classType.findMany({ orderBy: { order: "asc" } }),
    db.classSchedule.findMany({
      include: { classType: true },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    }),
    db.event.findMany({ where: { date: { gte: new Date() } }, orderBy: { date: "asc" }, take: 5 }),
    db.teacher.findMany({ orderBy: { order: "asc" } }),
  ]);

  const cm: Record<string, { en: string; es: string }> = {};
  for (const c of content) cm[c.key] = { en: c.valueEn, es: c.valueEs };

  const phone = cm["contact.phone1"]?.es ?? "+591 67394998";
  const phone2 = cm["contact.phone2"]?.es ?? "+591 67409052";
  const ig = cm["contact.instagram"]?.es ?? "@casabhakti.scz";
  const addr = cm["contact.address"]?.es ?? "Santa Cruz de la Sierra, Bolivia";

  // Schedule grouped by day
  const byDay: Record<number, string[]> = {};
  for (const s of schedule) {
    const day = s.dayOfWeek;
    if (!byDay[day]) byDay[day] = [];
    const cls = classes.find((c) => c.id === s.classTypeId);
    const nameEs = cls?.nameEs ?? "?";
    const nameEn = cls?.nameEn ?? "?";
    byDay[day].push(
      `${s.startTime}-${s.endTime} | ES:${nameEs} / EN:${nameEn} | ${s.instructorEs} | ${s.online ? "presencial + online" : "presencial"}`
    );
  }

  const scheduleText = DAYS_EN.map((d, i) => {
    const items = byDay[i];
    if (!items || items.length === 0) return `${d}: (sin clases / no classes)`;
    return `${d}:\n  ${items.join("\n  ")}`;
  }).join("\n");

  const classesText = classes
    .map(
      (c) =>
        `- ${c.nameEs} / ${c.nameEn} | nivel:${c.level} | ${c.durationMin}min | ES:${c.descriptionEs} | EN:${c.descriptionEn}`
    )
    .join("\n");

  const eventsText = events
    .map((e) => {
      const d = new Date(e.date);
      return `- ${e.titleEs} / ${e.titleEn} | ${d.toLocaleDateString("es-BO", { day: "numeric", month: "short", year: "numeric" })} | ${e.locationEs} | ${e.priceEs}`;
    })
    .join("\n");

  const teachersText = teachers
    .map((t) => `- ${t.nameEs} / ${t.nameEn} | ${t.roleEs} / ${t.roleEn} | ${t.specialtiesEs}`)
    .join("\n");

  return `INFORMACIÓN ACTUAL DE CASA BHAKTI (usa ESTO para responder, siempre actualizada):

CONTACTO:
- Teléfono/WhatsApp: ${phone} (también ${phone2})
- Instagram: ${ig}
- Ubicación: ${addr}
- WhatsApp link: https://wa.me/59167394998

PRECIOS:
- Clase suelta: 50 Bs
- Mensualidad: 450 Bs/mes
- Profesorado de Yoga (200h): consultar por WhatsApp

CLASES:
${classesText}

HORARIO SEMANAL:
${scheduleText}

EVENTOS PRÓXIMOS:
${eventsText}

MAESTROS:
${teachersText}

FILOSOFÍA:
- Tradición de Swami Sivananda
- Los 4 caminos del yoga: Karma (servicio), Bhakti (devoción), Raja (meditación), Jnana (sabiduría)
- Advaita Vedanta, Hatha Yoga clásico
- Domingos es el día de comunidad: 8:15 Meditación, 9:00 Yoga, 10:30 Vedanta, 18:30 Kirtan`;
}

function buildSystemPrompt(context: string, lang: "es" | "en"): string {
  const langInstruction =
    lang === "es"
      ? "Responde SIEMPRE en español. Escribe de forma natural, cálida y cercana como una boliviana amable."
      : "Responde SIEMPRE en inglés. Escribe de forma natural, cálida y cercana, como una guía amable.";

  return `Eres Shirley, la recepcionista virtual de Casa Bhakti, un templo de Yoga & Vedanta en Santa Cruz de la Sierra, Bolivia.

TU PERSONALIDAD:
- Cálida, acogedora, espiritual pero práctica. Hablas con el corazón.
- Usas un lenguaje sencillo y cercano. A veces un emoji sutil (✦ 🙏 🌿) pero sin exagerar.
- Eres como una amiga que conoce bien el mundo del yoga y te guía con cariño.
- Concisa: respuestas cortas (2-5 frases normalmente), nunca párrafos largos.

TU TRABAJO (EMBUDO DE VENTA):
1. SALUDAR: Da la bienvenida con calidez. Pregunta qué busca el visitante.
2. ENTENDER: ¿Es principiante? ¿Tiene experiencia? ¿Busca relajación, ejercicio, algo espiritual? ¿Qué horario le queda?
3. RECOMENDAR: Sugiere la clase adecuada según su nivel y necesidad. Menciona el horario concreto.
4. GUIAR A RESERVAR: Cuando el visitante muestre interés, invítalo a reservar. Da siempre un siguiente paso claro:
   - "Para reservar tu lugar, escríbenos por WhatsApp: https://wa.me/59167394998"
   - O "Puedes ver el horario completo en la sección Horarios de la página"

PREGUNTAS FRECUENTES QUE SABES RESPONDER:
- Precios (50 Bs clase suelta, 450 Bs mes)
- Horarios (consulta el horario semanal abajo)
- Qué clase me conviene (pregunta su nivel y recomienda)
- Qué traer (ropa cómoda, botella de agua, mat si tienes — sino hay)
- Dónde quedan (Santa Cruz de la Sierra, Bolivia — dar dirección por WhatsApp)
- Hay clases online (sí, algunas — indica cuáles según el horario)
- Cuánto duran las clases (según el tipo, 60-90 min)
- Kirtan (explica: canto devocional de mantras, abre el corazón, todos bienvenidos)
- Profesorado (200h, 5 semanas, 4 caminos del yoga)

REGLAS:
- ${langInstruction}
- NUNCA inventes precios, horarios o eventos que no estén en la información. Si no lo sabes, di "Déjame confirmarlo por WhatsApp" y da el link.
- Si el visitante quiere reservar o tiene una pregunta específica que requiere atención humana, SIEMPRE ofrece el WhatsApp: https://wa.me/59167394998
- No seas pushy, pero guía con suavidad hacia reservar cuando sea el momento.
- Si saludan, saluda y pregunta cómo puedes ayudar. No des toda la info de golpe.

${context}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = Array.isArray(body.messages) ? body.messages : [];
    const lang: "es" | "en" = body.lang === "en" ? "en" : "es";

    // Take last 10 messages to keep context manageable
    const recent = messages.slice(-10);

    if (recent.length === 0 || recent[recent.length - 1].role !== "user") {
      return NextResponse.json({ error: "INVALID_MESSAGES" }, { status: 400 });
    }

    const context = await buildContext();
    const systemPrompt = buildSystemPrompt(context, lang);

    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: systemPrompt },
        ...recent.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      thinking: { type: "disabled" },
    });

    const response =
      completion.choices[0]?.message?.content ??
      (lang === "es"
        ? "Disculpa, no pude procesar eso. ¿Puedes repetirlo? 🙏"
        : "Sorry, I couldn't process that. Could you repeat? 🙏");

    return NextResponse.json({ response, lang });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("[chat] error:", msg);
    return NextResponse.json(
      {
        error: "CHAT_ERROR",
        response:
          "Disculpa, tengo un pequeño problema técnico. Mientras tanto, escríbenos por WhatsApp y te ayudamos enseguida: https://wa.me/59167394998 🙏",
      },
      { status: 500 }
    );
  }
}
