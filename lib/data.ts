// Datos de demostración: marca, piezas, precios y comunidades son ficticios.
export type Dye = {
  id: string;
  name: string;
  plant: string;
  community: string;
  hours: number;
  bg: string;
  ink: string;
  photo: string;
  alt: string;
  piece: string;
  price: number;
};

export const DYES: Dye[] = [
  { id: 'cochinilla', name: 'Cochinilla', plant: 'Insecto del nopal, Dactylopius coccus', community: 'Chinchero, Cusco', hours: 46,
    bg: '#8f1d22', ink: '#fbeee9', photo: '/img/rojo.jpg', alt: 'Mujer de perfil con suéter de punto grueso rojo carmín.', piece: 'Suéter Puka', price: 690 },
  { id: 'qolle', name: 'Qolle', plant: 'Flor de Buddleja coriacea', community: 'Pitumarca, Cusco', hours: 38,
    bg: '#d9a21b', ink: '#1d1405', photo: '/img/amarillo.jpg', alt: 'Mujer con lentes y suéter amarillo de cuello alto apoyada en una columna.', piece: 'Cuello alto Q’illu', price: 640 },
  { id: 'chilca', name: 'Chilca', plant: 'Hojas de Baccharis latifolia', community: 'Lamay, Valle Sagrado', hours: 41,
    bg: '#1f5a3a', ink: '#eef6ef', photo: '/img/verde.jpg', alt: 'Mujer con suéter verde de punto grueso entre árboles.', piece: 'Suéter Q’omer', price: 670 },
  { id: 'natural', name: 'Sin teñir', plant: 'Alpaca baby en su color de origen', community: 'Puna de Ocongate', hours: 29,
    bg: '#d8cbb8', ink: '#1b1611', photo: '/img/natural.jpg', alt: 'Mujer cubriéndose el rostro con un cuello alto de alpaca beige.', piece: 'Cuello alto Paqo', price: 590 },
];

export type Product = {
  sku: string;
  name: string;
  line: 'Mujer' | 'Hombre' | 'Unisex';
  dye: string;
  price: number;
  img: string;
  alt: string;
  edition: number;
};

export const PRODUCTS: Product[] = [
  { sku: 'QY-01', name: 'Suéter Puka', line: 'Mujer', dye: 'Cochinilla', price: 690, img: '/img/rojo-cielo.jpg', alt: 'Modelo con suéter rojo trenzado frente a un cielo nublado.', edition: 80 },
  { sku: 'QY-02', name: 'Cuello alto Q’illu', line: 'Mujer', dye: 'Qolle', price: 640, img: '/img/amarillo.jpg', alt: 'Suéter amarillo de cuello alto.', edition: 60 },
  { sku: 'QY-03', name: 'Cárdigan Tanta', line: 'Unisex', dye: 'Sin teñir', price: 720, img: '/img/hombre-crudo.jpg', alt: 'Hombre con suéter crudo de mangas gris carbón.', edition: 70 },
  { sku: 'QY-04', name: 'Bufanda Rupay', line: 'Unisex', dye: 'Cochinilla + achiote', price: 260, img: '/img/naranja.jpg', alt: 'Bufanda naranja de punto grueso sobre abrigo marrón.', edition: 150 },
  { sku: 'QY-05', name: 'Abrigo Qosqo', line: 'Mujer', dye: 'Nogal', price: 1480, img: '/img/abrigo-camel.jpg', alt: 'Modelo con abrigo largo camel apoyada en un muro de piedra.', edition: 40 },
  { sku: 'QY-06', name: 'Suéter Iskay', line: 'Mujer', dye: 'Sin teñir + nogal', price: 760, img: '/img/bicolor.jpg', alt: 'Modelo con suéter bicolor crudo y negro cubriéndose el rostro.', edition: 50 },
  { sku: 'QY-07', name: 'Sobretodo Rumi', line: 'Hombre', dye: 'Ceniza de molle', price: 1620, img: '/img/abrigo-gris.jpg', alt: 'Modelo con sobretodo gris oscuro de lana.', edition: 35 },
  { sku: 'QY-08', name: 'Polera Wayra', line: 'Hombre', dye: 'Sin teñir', price: 380, img: '/img/taller.jpg', alt: 'Hombre con polera beige junto a un riel de ropa.', edition: 120 },
];

export const JOURNEY = [
  { title: 'La puna', place: 'Ocongate, 4 300 m', text: 'Las alpacas se esquilan una vez al año. Solo usamos el vellón del lomo, el más fino.', img: '/img/puna.jpg', alt: 'Llamas pastando bajo nevados de los Andes.' },
  { title: 'El hilado', place: 'Chinchero', text: 'Cada madeja se hila a huso, caminando. Una hilandera tarda nueve horas por suéter.', img: '/img/hilado.jpg', alt: 'Mujer andina con sombrero hilando lana con un huso.' },
  { title: 'El tinte', place: 'Chinchero', text: 'Plantas y cochinilla hierven en ollas de barro. El alumbre fija el color sin químicos.', img: '/img/tenido.jpg', alt: 'Tintorera vierte agua de tinte desde un cuenco de barro.' },
  { title: 'El telar', place: 'Pitumarca', text: 'Los bordes y etiquetas se tejen en telar de cintura con iconografía de cada comunidad.', img: '/img/telar.jpg', alt: 'Manos tejiendo en un telar de cintura con hilos rojos.' },
  { title: 'El taller', place: 'Barranco, Lima', text: 'Cortamos, cosemos y numeramos cada pieza. La etiqueta lleva el nombre de quien la tejió.', img: '/img/ovillos.jpg', alt: 'Canasta con ovillos de lana teñida de colores.' },
];
