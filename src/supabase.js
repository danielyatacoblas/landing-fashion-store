// Cliente mínimo contra Supabase REST (anon key, RLS insert-only).
// Si no hay env configurado, cae en modo "local" y no falla.
const URL = (window.__QAYTU__ && window.__QAYTU__.SUPABASE_URL) || '';
const KEY = (window.__QAYTU__ && window.__QAYTU__.SUPABASE_ANON) || '';

async function post(table, row) {
  if (!URL || !KEY) {
    console.info('[qaytu] supabase sin configurar — payload:', table, row);
    return { ok: false, reason: 'no-config' };
  }
  try {
    const r = await fetch(`${URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });
    return { ok: r.ok, status: r.status };
  } catch (e) {
    return { ok: false, reason: 'network', error: String(e) };
  }
}

export const sb = {
  leads: (email, source) => post('leads', { email, source, created_at: new Date().toISOString() }),
  events: (name, data) => post('events', { name, data, created_at: new Date().toISOString() }),
  abHero: (variant, action) => post('ab_hero', { variant, action, created_at: new Date().toISOString() }),
};
