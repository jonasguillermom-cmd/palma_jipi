/* ===== CONFIGURACIÓN ===== */
var WHATSAPP = "520000000000"; // lada país + número, sin + ni espacios

/* ===== PRODUCTOS (estáticos, sin base de datos). Edita nombre, precio e imagen ===== */
var TOP = [
  {n:"Sombrero Jipi Clásico",   d:"Ala media, tejido firme",       p:450, img:"imagen/productos/sombrero-1.jpg"},
  {n:"Sombrero Fino de Gala",   d:"Tejido muy apretado",           p:850, img:"imagen/productos/sombrero-2.jpg"},
  {n:"Sombrero Campesino",      d:"Ala ancha para el sol",         p:380, img:"imagen/productos/sombrero-3.jpg"},
  {n:"Sombrero Estilo Panamá",  d:"Copa estructurada",             p:950, img:"imagen/productos/sombrero-4.jpg"},
  {n:"Sombrero Jipi Natural",   d:"Color natural de la palma",     p:420, img:"imagen/productos/sombrero-5.jpg"},
  {n:"Sombrero Ala Corta",      d:"Ligero para uso diario",        p:390, img:"imagen/productos/sombrero-6.jpg"},
  {n:"Sombrero con Cinta",      d:"Cinta tejida a juego",          p:520, img:"imagen/productos/sombrero-7.jpg"},
  {n:"Sombrero Infantil",       d:"Talla para niñas y niños",      p:280, img:"imagen/productos/sombrero-8.jpg"}
];
var OTROS = [
  {n:"Bolsa de Palma",          d:"Tejida con fibra jipijapa",     p:320, img:"imagen/productos/otro-1.jpg"},
  {n:"Sombrero Miniatura",      d:"Decorativo, recuerdo artesanal",p:120, img:"imagen/productos/otro-2.jpg"},
  {n:"Abanico de Palma",        d:"Tejido a mano",                 p:90,  img:"imagen/productos/otro-3.jpg"},
  {n:"Portavasos de Palma",     d:"Set de 4 piezas",               p:150, img:"imagen/productos/otro-4.jpg"}
];

function tarjeta(x){
  var msg = encodeURIComponent("Hola, me interesa: " + x.n + " ($" + x.p + " MXN)");
  return '<article class="tarjeta"><div class="foto"><img src="'+x.img+'" alt="'+x.n+'"></div>' +
    '<h3>'+x.n+'</h3><p class="detalle">'+x.d+'</p><div class="precio">$'+x.p.toLocaleString("es-MX")+' MXN</div>' +
    '<a class="btn small" target="_blank" rel="noopener" href="https://wa.me/'+WHATSAPP+'?text='+msg+'">Pedir por WhatsApp</a></article>';
}
document.getElementById("grid-top").innerHTML = TOP.map(tarjeta).join("");
document.getElementById("grid-otros").innerHTML = OTROS.map(tarjeta).join("");

/* ===== CARRUSEL ===== */
var slides = document.querySelectorAll(".hero-slide"), dots = document.querySelectorAll(".hero-dot"), cur = 0, timer;
function goSlide(i){
  slides[cur].classList.remove("active"); dots[cur].classList.remove("active");
  cur = (i + slides.length) % slides.length;
  slides[cur].classList.add("active"); dots[cur].classList.add("active");
  clearInterval(timer); timer = setInterval(function(){ goSlide(cur + 1); }, 6000);
}
function changeSlide(d){ goSlide(cur + d); }
goSlide(0);

/* Oculta imágenes rotas (hasta que pongas tus fotos se ve el color de fondo) */
document.querySelectorAll("img").forEach(function(im){
  im.addEventListener("error", function(){ im.style.visibility = "hidden"; });
});
