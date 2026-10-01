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
        <span>Marca ficticia creada para portafolio. Precios y piezas de demostración, sin venta real.</span>
        <a className="badge" href="https://github.com/danielyatacoblas" rel="noopener">Diseñado y desarrollado por Daniel Yataco</a>
      </div>
    </footer>
  );
}
