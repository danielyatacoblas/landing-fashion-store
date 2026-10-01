import { waLink } from '@/lib/contact';

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft__cols">
        <div>
          <h2 className="ft__h">Taller</h2>
          <p>Jr. Domeyer 128, Barranco<br />Lima, Perú</p>
        </div>
        <div>
          <h2 className="ft__h">Comunidades</h2>
          <p>Chinchero · Pitumarca<br />Lamay · Ocongate · Taquile</p>
        </div>
        <div>
          <h2 className="ft__h">Ayuda</h2>
          <p>Envíos a todo el Perú<br />Cambios en 30 días</p>
        </div>
        <div>
          <h2 className="ft__h">Fotografía</h2>
          <p>Imágenes de <a href="https://www.pexels.com" rel="noopener">Pexels</a> bajo su licencia libre.</p>
        </div>
      </div>
      <p className="ft__word" aria-hidden="true">QAYTU</p>
      <div className="ft__legal">
        <span>Diseño demo: la marca, las piezas y los precios son ficticios. ¿Quieres una tienda así para tu marca?</span>
        <a className="badge" href={waLink('QAYTU (tienda de moda)')} target="_blank" rel="noopener">Diseño y desarrollo: Daniel Yataco · WhatsApp <span className="nowrap">975 118 790</span></a>
      </div>
    </footer>
  );
}
