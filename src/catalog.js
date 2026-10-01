// Catálogo QAYTU — datos de demostración. Todas las piezas son ficticias.
export const CATALOG = [
  { sku: 'QY-04', num: '04', view: 'A', name: "Chaleco Qayt'u", price: 740,
    tags: ['alpaca', 'cochinilla'],
    meta: ['Alpaca · Cochinilla', 'Chinchero', '46 h'],
    thumb: { kind: 'vest' } },
  { sku: 'QY-07', num: '07', view: 'A', name: 'Manta Puyu', price: 980,
    tags: ['alpaca', 'indigo'],
    meta: ['Alpaca', 'Taquile · Puno', '62 h'],
    thumb: { kind: 'blanket' } },
  { sku: 'QY-02', num: '02', view: 'B', name: 'Camisa Yuraq', price: 420,
    tags: ['pima', 'crudo'],
    meta: ['Pima crudo', 'Lima', '18 h'],
    thumb: { kind: 'shirt' } },
  { sku: 'QY-11', num: '11', view: 'B', name: 'Abrigo Qosqo', price: 1860,
    tags: ['alpaca', 'tara'],
    meta: ['Alpaca · Tara', 'Lamay', '112 h'],
    thumb: { kind: 'coat' } },
  { sku: 'QY-09', num: '09', view: 'A', name: 'Falda Tika', price: 560,
    tags: ['algodon', 'cochinilla'],
    meta: ['Algodón · Cochinilla', 'Chinchero', '28 h'],
    thumb: { kind: 'skirt' } },
  { sku: 'QY-15', num: '15', view: 'C', name: 'Bolso Chuspa', price: 320,
    tags: ['alpaca', 'telar'],
    meta: ['Alpaca · Telar', 'Taquile', '22 h'],
    thumb: { kind: 'bag' } },
  { sku: 'QY-18', num: '18', view: 'C', name: 'Chalina Wayra', price: 280,
    tags: ['alpaca', 'indigo'],
    meta: ['Alpaca · Índigo', 'Lamay', '14 h'],
    thumb: { kind: 'scarf' } },
  { sku: 'QY-21', num: '21', view: 'B', name: 'Pantalón Rumi', price: 680,
    tags: ['algodon', 'tara'],
    meta: ['Algodón · Tara', 'Lima', '26 h'],
    thumb: { kind: 'pants' } },
];

const SHAPES = {
  vest: `<path d="M 55 30 L 55 100 L 145 100 L 145 30 L 125 20 L 100 30 L 75 20 Z" fill="none"/>
         <path d="M 100 30 L 100 100" stroke-dasharray="2 3"/>`,
  blanket: `<rect x="40" y="30" width="120" height="140" fill="none"/>
            <path d="M 40 60 H 160 M 40 90 H 160 M 40 120 H 160 M 40 150 H 160" stroke-dasharray="2 3"/>`,
  shirt: `<path d="M 55 30 L 55 110 L 145 110 L 145 30 L 125 25 L 110 40 L 90 40 L 75 25 Z" fill="none"/>
          <path d="M 55 50 L 35 70 L 35 95 L 55 85 M 145 50 L 165 70 L 165 95 L 145 85" fill="none"/>`,
  coat: `<path d="M 50 25 L 50 160 L 150 160 L 150 25 L 125 15 L 115 35 L 100 50 L 85 35 L 75 15 Z" fill="none"/>
         <path d="M 100 50 L 100 160" stroke-dasharray="2 3"/>
         <path d="M 50 25 L 25 70 L 25 110 L 50 100 M 150 25 L 175 70 L 175 110 L 150 100" fill="none"/>`,
  skirt: `<path d="M 70 30 L 60 160 L 140 160 L 130 30 Z" fill="none"/>
          <path d="M 70 30 Q 100 40 130 30" stroke-dasharray="2 3"/>`,
  bag: `<path d="M 60 60 L 60 160 L 140 160 L 140 60 Z" fill="none"/>
        <path d="M 70 60 Q 100 20 130 60" fill="none"/>`,
  scarf: `<rect x="80" y="20" width="40" height="160" fill="none"/>
          <path d="M 80 40 H 120 M 80 80 H 120 M 80 120 H 120 M 80 160 H 120" stroke-dasharray="2 3"/>`,
  pants: `<path d="M 65 30 L 135 30 L 140 160 L 110 160 L 100 70 L 90 160 L 60 160 Z" fill="none"/>
          <path d="M 100 30 L 100 70" stroke-dasharray="2 3"/>`,
};

export function thumbSVG(kind) {
  const shape = SHAPES[kind] || SHAPES.shirt;
  return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <defs>
      <pattern id="g-${kind}" width="12" height="12" patternUnits="userSpaceOnUse">
        <path d="M0 0 H12 M0 0 V12" stroke="#1a1612" stroke-opacity="0.1" stroke-width="0.5"/>
      </pattern>
    </defs>
    <rect width="200" height="200" fill="url(#g-${kind})"/>
    <g stroke="#1a1612" stroke-width="1.4" fill="none">${shape}</g>
    <path d="M 100 15 L 100 185" stroke="#b4342a" stroke-width="1" opacity="0.6"/>
    <circle cx="100" cy="15" r="2" fill="#b4342a"/>
    <circle cx="100" cy="185" r="2" fill="#b4342a"/>
  </svg>`;
}
