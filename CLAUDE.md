# Jahan — Body Awareness Test & Event Website

Тест осознанности тела + лендинг для мероприятий Джахана.
Dev: http://localhost:3000, Next.js 14.2 + Supabase

## Задачи

ROADMAP.md ← единый источник правды

## Context Files

| Тема | Файл |
|------|------|
| Задачи | `ROADMAP.md` |
| Тест | `components/body-test/` |
| Лендинг | `app/page.tsx` |
| Check Modules | `.claude/docs/check/*.md` (7 modules) |

## MCP Tools

- **Grok** (19 tools): X search, web search, image/video gen, vision, code executor
- **Perplexity** (5 tools): search, ask, reason, research
- **Typefully**: tweet scheduling
- **Gemini**: visual design (global, always available)

## Commands (8 Orchestrators)

**Pipeline:** `/plan` → `/plan-audit` → [execute] → `/audit` → `/check` → `/ops ship`

| Command | Role | Subcommands |
|---------|------|-------------|
| `/plan` | Architect | `feature`, ROADMAP IDs, `как PO` |
| `/plan-audit` | Gate Keeper | (stays separate — context isolation) |
| `/check` | VP Engineering | `tests security perf api design flow visual` |
| `/audit` | Review Board | `reality verify`, `--focus="..."` |
| `/market` | CMO | `audit cro copy voice ads seo social publish trends monitor` |
| `/research` | Analyst | `quick ask deep full x skills` |
| `/ops` | COO | `save ship meta` |
| `/gemini-ui` | Design Lead | `review component ux landing image screenshot compare` |

## Commands

```bash
pnpm dev          # :3000
pnpm lint
pnpm build
```

## Structure

```
app/              # Next.js pages (/, /test)
components/       # UI components (body-test/)
lib/              # Utilities
.claude/commands/ # 7 orchestrator commands
.claude/docs/     # Check modules
```

## Key Facts

- **Язык контента:** русский
- **Дизайн:** purple-to-pink градиенты, Inter + Cyrillic
- **Тест:** 6 этапов (Intro → Breathing → Scanning → Validation → Rating → Results)
- **8 зон тела**, 4 измерения (awareness, tension, emotional, control)
- **Lead capture:** Supabase `leads` table
- **Аудио:** Supabase storage для медитаций
- **Deploy:** Vercel

## Mindset

- **Ship fast, fix forward** — минимум для работающего решения
- **Один таск → коммит → следующий** — атомарные изменения
- **Язык контента: русский** (UI, copy, instructions)

## Health Disclaimer

Body awareness test is NOT medical diagnosis. Always include:
"Тест не является медицинской диагностикой. Для медицинских вопросов обратитесь к врачу."
