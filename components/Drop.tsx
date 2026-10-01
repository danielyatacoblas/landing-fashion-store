'use client';
import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { sb } from '@/lib/supabase';

type State = 'idle' | 'sending' | 'ok' | 'error';

export default function Drop() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get('email') || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setState('error');
      setError('Revisa el correo: falta la @ o el dominio.');
      return;
    }
    setState('sending');
    const r = await sb.leads(email, 'qaytu-drop');
    if (r.ok || ('reason' in r && r.reason === 'no-config')) {
      setState('ok');
      form.reset();
    } else {
      setState('error');
      setError('No pudimos guardar tu correo. Prueba de nuevo en un minuto.');
    }
  }

  return (
    <section className="drop" id="drop" aria-labelledby="drop-title">
      <div className="drop__img">
        <Image src="/img/abrigo-tren.jpg" alt="Modelo con abrigo largo camel en el andén de una estación." fill sizes="(max-width: 900px) 100vw, 45vw" quality={75} />
      </div>
      <div className="drop__body">
        <h2 id="drop-title">Drop Puna: 12 abrigos, 24 de octubre.</h2>
        <p>Abrigos de alpaca teñidos con nogal y tejidos en Taquile. La lista recibe el acceso 48 horas antes que nadie.</p>
        {state === 'ok' ? (
          <p className="drop__ok" role="status">Estás dentro. Te escribimos el 22 de octubre con tu enlace de acceso.</p>
        ) : (
          <form className="drop__form" onSubmit={submit} noValidate>
            <label htmlFor="drop-email">Tu correo</label>
            <div className="drop__row">
              <input
                id="drop-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="nombre@correo.com"
                aria-invalid={state === 'error'}
                aria-describedby="drop-msg"
                onInput={() => state === 'error' && setState('idle')}
              />
              <button type="submit" className="btn btn--ink" disabled={state === 'sending'}>
                {state === 'sending' ? 'Guardando…' : 'Entrar a la lista'}
              </button>
            </div>
            <p id="drop-msg" className="drop__msg" aria-live="polite">{state === 'error' ? error : 'Un correo antes del drop. Nada más.'}</p>
          </form>
        )}
      </div>
    </section>
  );
}
