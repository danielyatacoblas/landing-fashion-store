'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/data';
import { gsap, reduced } from '@/lib/motion';
import type { BagLine } from './Bag';

const FILTERS = ['Todo', 'Mujer', 'Hombre', 'Unisex'] as const;

export default function Collection({ onAdd }: { onAdd: (l: Omit<BagLine, 'qty'>) => void }) {
  const [f, setF] = useState<(typeof FILTERS)[number]>('Todo');
  const root = useRef<HTMLElement>(null);
  const items = useMemo(() => (f === 'Todo' ? PRODUCTS : PRODUCTS.filter((p) => p.line === f)), [f]);

  useEffect(() => {
    if (!root.current || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.card', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'expo.out',
        scrollTrigger: { trigger: '.grid', start: 'top 85%' },
      });
    }, root);
    return () => ctx.revert();
  }, [items]);

  return (
    <section className="col" id="coleccion" ref={root} aria-labelledby="col-title">
      <div className="col__head">
        <h2 id="col-title">Colección Otoño Andino</h2>
        <div className="chips" role="group" aria-label="Filtrar por línea">
          {FILTERS.map((x) => (
            <button key={x} type="button" className="chip" aria-pressed={f === x} onClick={() => setF(x)}>
              {x}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid">
        {items.map((p, i) => (
          <li className={`card ${i === 0 && items.length % 3 === 2 ? 'card--wide' : ''}`} key={p.sku}>
            <div className="card__media">
              <Image src={p.img} alt={p.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" quality={75} />
              <button
                type="button"
                className="card__quick"
                onClick={() => onAdd({ sku: p.sku, name: p.name, price: p.price, size: 'M', img: p.img })}
              >
                Agregar talla M
              </button>
            </div>
            <div className="card__info">
              <h3>{p.name}</h3>
              <span className="tnum">S/ {p.price.toLocaleString('es-PE')}</span>
              <p>{p.dye} · {p.line} · edición de {p.edition}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
