'use client';
import { useCallback, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, reduced } from '@/lib/motion';
import { sb } from '@/lib/supabase';
import Header from './Header';
import Hero from './Hero';
import DyeStudio from './DyeStudio';
import Journey from './Journey';
import Collection from './Collection';
import Manifesto from './Manifesto';
import Drop from './Drop';
import Footer from './Footer';
import Bag, { type BagLine } from './Bag';

const BAG_KEY = 'qaytu:bag:v2';

export default function Store() {
  const [bag, setBag] = useState<BagLine[]>([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState('');

  // Lenis + ScrollTrigger comparten el mismo reloj para que el scroll suave no desincronice los pins.
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  useEffect(() => {
    try { setBag(JSON.parse(localStorage.getItem(BAG_KEY) || '[]')); } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(BAG_KEY, JSON.stringify(bag)); } catch {}
  }, [bag]);

  const add = useCallback((line: Omit<BagLine, 'qty'>) => {
    setBag((cur) => {
      const hit = cur.find((l) => l.sku === line.sku && l.size === line.size);
      if (hit) return cur.map((l) => (l === hit ? { ...l, qty: l.qty + 1 } : l));
      return [...cur, { ...line, qty: 1 }];
    });
    setToast(`${line.name} · talla ${line.size} en tu bolsa`);
    sb.events('add_to_bag', { sku: line.sku, size: line.size });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const count = bag.reduce((s, l) => s + l.qty, 0);

  return (
    <>
      <a href="#coleccion" className="skip">Saltar a la colección</a>
      <Header count={count} onBag={() => setOpen(true)} />
      <main>
        <Hero />
        <DyeStudio onAdd={add} />
        <Journey />
        <Collection onAdd={add} />
        <Manifesto />
        <Drop />
      </main>
      <Footer />
      <Bag
        lines={bag}
        open={open}
        onClose={() => setOpen(false)}
        onQty={(i, d) => setBag((cur) => cur.flatMap((l, k) => (k !== i ? [l] : l.qty + d <= 0 ? [] : [{ ...l, qty: l.qty + d }])))}
      />
      <div className="toast" role="status" aria-live="polite" data-show={toast ? '' : undefined}>
        <span>{toast}</span>
        <button type="button" onClick={() => { setOpen(true); setToast(''); }}>Ver bolsa</button>
      </div>
    </>
  );
}
