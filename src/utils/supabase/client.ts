import { createClient as createBrowserClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import type { cookies, Cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY environment variables.'
  )
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

export function createSupabaseClient(cookieStore: Cookies) {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () =>
        cookieStore.getAll().map((cookie) => ({
          name: cookie.name,
          value: cookie.value,
        })),
      setAll: (cookies) => {
        cookies.forEach((cookie) => {
          cookieStore.set(cookie)
        })
      },
    },
  })
}
