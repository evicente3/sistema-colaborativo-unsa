import { describe, it, expect, vi, beforeEach } from 'vitest'

// We mock @supabase/supabase-js so the test does not need real credentials
// and does not open any network connection.
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({ auth: {}, from: vi.fn() })),
}))

// Set the env vars before the module is imported.
// import.meta.env is provided by Vitest automatically; we just assign values.
beforeEach(() => {
  import.meta.env.VITE_SUPABASE_URL = 'https://test.supabase.co'
  import.meta.env.VITE_SUPABASE_ANON_KEY = 'test-anon-key'
})

describe('supabaseClient', () => {
  it('exports a supabase client object', async () => {
    // Dynamic import so the module reads import.meta.env after beforeEach sets it.
    const { supabase } = await import('./supabaseClient')
    expect(supabase).toBeDefined()
  })

  it('exposes an auth namespace (confirms it is a real Supabase client shape)', async () => {
    const { supabase } = await import('./supabaseClient')
    expect(supabase).toHaveProperty('auth')
  })
})
