'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { JOURNEY } from '@/lib/data';
import { gsap, reduced } from '@/lib/motion';

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || !track.current || reduced()) return;
    const mm = gsap.matchMedia();
    // Solo en escritorio el recorrido se ancla y avanza en horizontal; en móvil es una lista vertical normal.
    mm.add('(min-width: 900px)', () => {
      const t = track.current!;
      const dist = () => t.scrollWidth - window.innerWidth;
      const tween = gsap.to(t, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: root.current, start: 'top top', end: () => `+=${dist()}`,
          pin: true, scrub: 0.6, invalidateOnRefresh: true,
        },
      });
      gsap.utils.toArray<HTMLElement>('.step__img').forEach((img) => {
        gsap.fromTo(img, { xPercent: -8 }, {
          xPercent: 8, ease: 'none',
          scrollTrigger: { trigger: img, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
        });
      });
      const bar = root.current!.querySelector<HTMLElement>('.journey__bar span');
      if (bar) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${dist()}`, scrub: true } });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="journey" id="origen" ref={root} aria-labelledby="journey-title">
      <div className="journey__track" ref={track}>
        <div className="journey__intro">
          <h2 id="journey-title">De la puna a tu ropero, en cinco paradas.</h2>
          <p>Seguimos cada suéter desde el lomo de la alpaca hasta la etiqueta cosida en Lima. Desliza para recorrerlo.</p>
        </div>
        {JOURNEY.map((s, i) => (
          <article className="step" key={s.title}>
            <div className="step__frame">
              <Image className="step__img" src={s.img} alt={s.alt} fill sizes="(max-width: 900px) 100vw, 40vw" quality={75} />
            </div>
            <div className="step__text">
              <h3><span className="step__n tnum">{i + 1}</span>{s.title}</h3>
              <p className="step__place">{s.place}</p>
              <p>{s.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="journey__bar" aria-hidden="true"><span /></div>
    </section>
  );
}
