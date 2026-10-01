'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, reduced } from '@/lib/motion';

const TEXT = 'Una prenda QAYTU tarda entre veintinueve y ciento doce horas. No la apuramos: el color de la cochinilla necesita tres días para fijarse y una hilandera camina mientras hila.';

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current || reduced()) return;
    const ctx = gsap.context(() => {
      // Cada palabra pasa de tenue a tinta a medida que se lee: el ritmo de lectura lo marca el scroll.
      gsap.fromTo('.mf__w', { opacity: 0.16 }, {
        opacity: 1, stagger: 0.05, ease: 'none',
        scrollTrigger: { trigger: '.mf__text', start: 'top 80%', end: 'bottom 45%', scrub: true },
      });
      gsap.fromTo('.mf__a img', { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: root.current, scrub: true } });
      gsap.fromTo('.mf__b img', { yPercent: 12 }, { yPercent: -12, ease: 'none', scrollTrigger: { trigger: root.current, scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="mf" ref={root} aria-label="Por qué tardamos">
      <p className="mf__text">
        {TEXT.split(' ').map((w, i) => <span className="mf__w" key={i}>{w} </span>)}
      </p>
      <figure className="mf__a">
        <Image src="/img/detalle-mangas.jpg" alt="Manos dentro de las mangas de un suéter de punto gris." fill sizes="(max-width: 900px) 60vw, 30vw" quality={75} />
      </figure>
      <figure className="mf__b">
        <Image src="/img/tinte-lana.jpg" alt="Tintorera de Chinchero sumerge lana frente a madejas de colores colgadas." fill sizes="(max-width: 900px) 60vw, 26vw" quality={75} />
      </figure>
    </section>
  );
}
