'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export type BagLine = { sku: string; name: string; price: number; size: string; qty: number; img: string };

export default function Bag({ lines, open, onClose, onQty }: {
  lines: BagLine[];
  open: boolean;
  onClose: () => void;
  onQty: (index: number, delta: number) => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const shipping = total >= 600 || total === 0 ? 0 : 25;

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prev?.focus();
    };
  }, [open, onClose]);

  return (
    <div className="bag" data-open={open ? '' : undefined} data-modal-open={open ? '' : undefined} aria-hidden={!open} inert={!open}>
      <button type="button" className="bag__scrim" aria-label="Cerrar bolsa" onClick={onClose} tabIndex={-1} />
      <div className="bag__panel" role="dialog" aria-modal="true" aria-labelledby="bag-title" tabIndex={-1} ref={panel}>
        <div className="bag__top">
          <h2 id="bag-title">Tu bolsa</h2>
          <button type="button" className="bag__close" onClick={onClose}>Cerrar</button>
        </div>

        {lines.length === 0 ? (
          <div className="bag__empty">
            <p>Tu bolsa está vacía.</p>
            <a href="#coleccion" onClick={onClose} className="btn btn--ink">Ver la colección</a>
          </div>
        ) : (
          <ul className="bag__lines" data-lenis-prevent>
            {lines.map((l, i) => (
              <li key={`${l.sku}-${l.size}`} className="line">
                <div className="line__img"><Image src={l.img} alt="" fill sizes="80px" quality={70} /></div>
                <div className="line__info">
                  <p className="line__name">{l.name}</p>
                  <p className="line__meta">Talla {l.size}</p>
                  <div className="qty">
                    <button type="button" onClick={() => onQty(i, -1)} aria-label={`Quitar una unidad de ${l.name}`}>−</button>
                    <span className="tnum" aria-live="polite">{l.qty}</span>
                    <button type="button" onClick={() => onQty(i, 1)} aria-label={`Agregar una unidad de ${l.name}`}>+</button>
                  </div>
                </div>
                <p className="line__price tnum">S/ {(l.price * l.qty).toLocaleString('es-PE')}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="bag__foot">
          <div className="bag__row"><span>Envío</span><span className="tnum">{shipping ? `S/ ${shipping}` : 'Gratis'}</span></div>
          <div className="bag__row bag__row--total"><span>Total</span><span className="tnum">S/ {(total + shipping).toLocaleString('es-PE')}</span></div>
          <button type="button" className="btn btn--ink btn--block" disabled aria-describedby="bag-note">Pagar</button>
          <p id="bag-note" className="bag__note">Pago desactivado: esta es una tienda demo.</p>
        </div>
      </div>
    </div>
  );
}
