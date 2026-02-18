import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Типы для базы данных
export interface Lead {
  id?: string
  name: string
  email: string
  phone?: string
  telegram?: string
  room_preference?: string
  motivation?: string
  test_results?: Record<string, number>
  created_at?: string
}

// Функция для сохранения лида
export async function saveLead(lead: Lead) {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select()
    .single()

  if (error) {
    console.error('Error saving lead:', error)
    throw error
  }

  return data
}

// Функция для получения URL аудиофайла из Storage
export function getAudioUrl(filename: string): string {
  const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, '')
  if (!sanitized || sanitized.startsWith('.')) {
    throw new Error('Invalid audio filename')
  }

  const { data } = supabase.storage
    .from('Audio')
    .getPublicUrl(sanitized)

  return data.publicUrl
}
