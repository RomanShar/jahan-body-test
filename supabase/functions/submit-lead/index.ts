import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!
    )

    const body = await req.json()
    const { name, email, phone, telegram } = body

    // Basic server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return new Response(JSON.stringify({ error: 'Invalid name' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
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
      return new Response(JSON.stringify({ error: 'Failed to save lead' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Send Telegram notification (fire & forget)
    sendTelegramNotification(lead)

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&')
}

async function sendTelegramNotification(lead: {
  name: string
  email: string
  phone?: string
  telegram?: string
}) {
  const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN')
  const chatId = Deno.env.get('TELEGRAM_CHAT_ID')
  if (!botToken || !chatId) return

  const lines = [
    `🔔 *Новая заявка на ретрит\\!*`,
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

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join('\n'),
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
