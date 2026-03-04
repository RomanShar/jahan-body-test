import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

async function sendTelegramNotification(lead: {
  name: string
  email: string
  phone?: string
  telegram?: string
}) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return

  const lines = [
    `🔔 *Новая заявка на ретрит!*`,
    ``,
    `👤 *Имя:* ${escapeMarkdown(lead.name)}`,
    `📧 *Email:* ${escapeMarkdown(lead.email)}`,
  ]

  if (lead.phone) {
    lines.push(`📱 *Телефон:* ${escapeMarkdown(lead.phone)}`)
  }
  if (lead.telegram) {
    lines.push(`✈️ *Telegram:* ${escapeMarkdown(lead.telegram)}`)
  }

  lines.push(``, `🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Lisbon' })}`)

  const text = lines.join('\n')

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'MarkdownV2',
        }),
      }
    )

    if (!res.ok) {
      console.error('Telegram notification failed:', await res.text())
    }
  } catch (err) {
    console.error('Telegram notification error:', err)
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, telegram } = body

    // Basic server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const lead = {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || undefined,
      telegram: telegram?.trim() || undefined,
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    }

    // Send Telegram notification (fire & forget — don't block response)
    sendTelegramNotification(lead)

    return NextResponse.json({ success: true, id: data.id })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
