'use client';
import { useEffect, useState } from 'react';

export default function Header({ count, onBag }: { count: number; onBag: () => void }) {
  const [solid, setSolid] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (!count) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 320);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <header className="hd" data-solid={solid ? '' : undefined}>
      <a href="#top" className="hd__mark" aria-label="QAYTU, volver al inicio">QAYTU</a>
      <nav className="hd__nav" aria-label="Principal">
        <a href="#tintes">Tintes</a>
        <a href="#origen">Origen</a>
        <a href="#coleccion">Colección</a>
        <a href="#drop">Próximo drop</a>
      </nav>
      <button type="button" className="hd__bag" onClick={onBag} aria-label={`Abrir bolsa, ${count} piezas`}>
        Bolsa <span className="hd__count" data-bump={bump ? '' : undefined}>{count}</span>
      </button>
    </header>
  );
}
