'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { DYES } from '@/lib/data';
import { gsap, reduced } from '@/lib/motion';
import type { BagLine } from './Bag';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export default function DyeStudio({ onAdd }: { onAdd: (l: Omit<BagLine, 'qty'>) => void }) {
  const [active, setActive] = useState(0);
  const [size, setSize] = useState('M');
  const root = useRef<HTMLElement>(null);
  const dye = DYES[active];

  // La sección entera se tiñe: el color de fondo es el tinte elegido.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (reduced()) {
      el.style.setProperty('--dye-bg', dye.bg);
      el.style.setProperty('--dye-ink', dye.ink);
      return;
    }
    gsap.to(el, { '--dye-bg': dye.bg, '--dye-ink': dye.ink, duration: 0.9, ease: 'expo.out' });
    gsap.fromTo(el.querySelectorAll('.dye__detail > *'), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'expo.out' });
  }, [dye]);

  useEffect(() => {
    if (!root.current || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from('.dye__head > *', {
        y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  function onKey(e: React.KeyboardEvent) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
    const next = (active + d + DYES.length) % DYES.length;
    setActive(next);
    (root.current?.querySelectorAll<HTMLButtonElement>('.dye__opt')[next])?.focus();
  }

  return (
    <section
      className="dye"
      id="tintes"
      ref={root}
      aria-labelledby="dye-title"
      style={{ ['--dye-bg' as string]: DYES[0].bg, ['--dye-ink' as string]: DYES[0].ink }}
    >
      <div className="dye__head">
        <h2 id="dye-title">Elige el tinte. Te contamos de dónde viene.</h2>
        <p>Cuatro colores, cuatro comunidades. Toca uno y mira la prenda que sale de esa olla.</p>
      </div>

      <div className="dye__stage">
        <div className="dye__photos">
          {DYES.map((d, i) => (
            <Image
              key={d.id}
              src={d.photo}
              alt={d.alt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              quality={80}
              className="dye__photo"
              data-on={i === active ? '' : undefined}
              aria-hidden={i !== active}
            />
          ))}
        </div>

        <div className="dye__panel">
          <div className="dye__opts" role="radiogroup" aria-label="Tinte" onKeyDown={onKey}>
            {DYES.map((d, i) => (
              <button
                key={d.id}
                type="button"
                role="radio"
                aria-checked={i === active}
                tabIndex={i === active ? 0 : -1}
                className="dye__opt"
                onClick={() => setActive(i)}
              >
                <span className="dye__swatch" style={{ background: d.bg }} aria-hidden="true" />
                <span className="dye__name">{d.name}</span>
                <span className="dye__place">{d.community}</span>
              </button>
            ))}
          </div>

          <div className="dye__detail" aria-live="polite">
            <p className="dye__piece">{dye.piece}</p>
            <dl className="dye__facts">
              <div><dt>Planta</dt><dd>{dye.plant}</dd></div>
              <div><dt>Comunidad</dt><dd>{dye.community}</dd></div>
              <div><dt>Trabajo</dt><dd className="tnum">{dye.hours} horas a mano</dd></div>
            </dl>
            <div className="dye__buy">
              <div className="sizes" role="radiogroup" aria-label="Talla">
                {SIZES.map((s) => (
                  <button key={s} type="button" role="radio" aria-checked={size === s} className="size" onClick={() => setSize(s)}>{s}</button>
                ))}
              </div>
              <button
                type="button"
                className="btn btn--dye"
                onClick={() => onAdd({ sku: `QY-${dye.id}`, name: dye.piece, price: dye.price, size, img: dye.photo })}
              >
                Agregar · <span className="tnum">S/ {dye.price}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
