'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, reduced } from '@/lib/motion';

const WORD = ['Q', 'A', 'Y', 'T', 'U'];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current || reduced()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('.hero__media', { clipPath: 'inset(12% 12% 12% 12%)', scale: 1.08, duration: 1.6 })
        .from('.hero__letter', { yPercent: 105, duration: 1.2, stagger: 0.06 }, '-=1.15')
        .from('.hero__copy > *', { y: 18, opacity: 0, duration: 0.9, stagger: 0.08 }, '-=0.9');

      // Al hacer scroll la foto se aleja y la palabra sube más rápido: profundidad sin efectos añadidos.
      gsap.to('.hero__img', {
        yPercent: 12, scale: 1.06, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__word', {
        yPercent: -40, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root} aria-labelledby="hero-title">
      <div className="hero__media">
        <Image
          className="hero__img"
          src="/img/hero.jpg"
          alt="Modelo con chaqueta de punto rojo carmín frente a un telón verde."
          fill
          priority
          sizes="100vw"
          quality={80}
        />
        <div className="hero__shade" aria-hidden="true" />
      </div>

      <div className="hero__copy">
        <h1 id="hero-title">Alpaca teñida con plantas de los Andes.</h1>
        <p>Cada prenda lleva el nombre de quien la hiló, la tiñó y la tejió. Cochinilla, qolle y chilca: nada sintético toca la fibra.</p>
        <div className="hero__ctas">
          <a className="btn btn--light" href="#coleccion">Ver la colección</a>
          <a className="btn btn--ghost-light" href="#tintes">Elegir por tinte</a>
        </div>
      </div>

      <p className="hero__tag">
        Chaqueta Puka · cochinilla · 46 horas a mano
      </p>

      <div className="hero__word" aria-hidden="true">
        {WORD.map((l, i) => (
          <span className="hero__clip" key={i}><span className="hero__letter">{l}</span></span>
        ))}
      </div>
    </section>
  );
}
