/* ===== CONFIGURACIÓN (un solo lugar) ===== */
var WHATSAPP = "520000000000"; // lada país + número, sin + ni espacios

/* ===== PRODUCTOS estáticos. c = categoría del menú (Finos, Campesinos, Clásicos, Accesorios) ===== */
var TOP = [
  {n:"Sombrero Jipi Clásico",  c:"Clásicos",    d:"Ala media, tejido firme",        p:450, img:"imagen/productos/sombrero-1.jpg"},
  {n:"Sombrero Fino de Gala",  c:"Finos",       d:"Tejido muy apretado",            p:850, img:"imagen/productos/sombrero-2.jpg"},
  {n:"Sombrero Campesino",     c:"Campesinos",  d:"Ala ancha para el sol",          p:380, img:"imagen/productos/sombrero-3.jpg"},
  {n:"Sombrero Estilo Panamá", c:"Finos",       d:"Copa estructurada",              p:950, img:"imagen/productos/sombrero-4.jpg"},
  {n:"Sombrero Jipi Natural",  c:"Clásicos",    d:"Color natural de la palma",      p:420, img:"imagen/productos/sombrero-5.jpg"},
  {n:"Campesino Ligero",       c:"Campesinos",  d:"Ligero para uso diario",         p:390, img:"imagen/productos/sombrero-6.jpg"},
  {n:"Sombrero con Cinta",     c:"Finos",       d:"Cinta tejida a juego",           p:520, img:"imagen/productos/sombrero-7.jpg"},
  {n:"Sombrero Infantil",      c:"Clásicos",    d:"Talla para niñas y niños",       p:280, img:"imagen/productos/sombrero-8.jpg"}
];
var OTROS = [
  {n:"Bolsa de Palma",         c:"Accesorios",  d:"Tejida con fibra jipijapa",      p:320, img:"imagen/productos/otro-1.jpg"},
  {n:"Sombrero Miniatura",     c:"Accesorios",  d:"Decorativo, recuerdo artesanal", p:120, img:"imagen/productos/otro-2.jpg"},
  {n:"Abanico de Palma",       c:"Accesorios",  d:"Tejido a mano",                  p:90,  img:"imagen/productos/otro-3.jpg"},
  {n:"Portavasos de Palma",    c:"Accesorios",  d:"Set de 4 piezas",                p:150, img:"imagen/productos/otro-4.jpg"}
];
var ALL = TOP.concat(OTROS);
function $(id){ return document.getElementById(id); }
function money(n){ return "$" + n.toLocaleString("es-MX") + " MXN"; }

/* WhatsApp: todos los enlaces con data-wa usan el número de arriba */
document.querySelectorAll("[data-wa]").forEach(function(a){ a.href = "https://wa.me/" + WHATSAPP; });

/* ===== TARJETAS ===== */
function tarjeta(x){
  var i = ALL.indexOf(x);
  return '<article class="tarjeta"><div class="foto"><img src="'+x.img+'" alt="'+x.n+'"></div>' +
    '<h3>'+x.n+'</h3><p class="detalle">'+x.d+'</p><div class="precio">'+money(x.p)+'</div>' +
    '<button class="btn small" type="button" data-add="'+i+'">Agregar al carrito</button></article>';
}
if($("grid-top")){
  var params = new URLSearchParams(location.search), q = (params.get("q")||"").toLowerCase(), cat = params.get("cat")||"";
  if(q || cat){
    var res = ALL.filter(function(x){
      return (!cat || x.c === cat) && (!q || (x.n+" "+x.d+" "+x.c).toLowerCase().indexOf(q) > -1);
    });
    $("titulo-top").textContent = cat ? cat.toUpperCase() : 'RESULTADOS PARA "' + q.toUpperCase() + '"';
    $("grid-top").innerHTML = res.length ? res.map(tarjeta).join("") : '<p class="center" style="grid-column:1/-1">No encontramos productos. Escríbenos y lo tejemos para ti.</p>';
    if($("sec-otros")) $("sec-otros").style.display = "none";
    if($("ver-todos")) $("ver-todos").innerHTML = '<a href="index.html#tienda" class="ver-todos">Ver todos los productos</a>';
  } else {
    $("grid-top").innerHTML = TOP.map(tarjeta).join("");
    if($("grid-otros")) $("grid-otros").innerHTML = OTROS.map(tarjeta).join("");
  }
}

/* ===== CARRITO (se guarda en el navegador) ===== */
var cart = {};
try { cart = JSON.parse(localStorage.getItem("jipi_cart") || "{}"); } catch(e) { cart = {}; }
function renderCart(){
  var ids = Object.keys(cart).filter(function(i){ return ALL[i]; }), total = 0, count = 0, html = "";
  ids.forEach(function(i){
    var p = ALL[i], q = cart[i]; total += p.p*q; count += q;
    html += '<div class="row"><span>'+p.n+'<br><small>'+money(p.p)+'</small></span><span class="qty"><button data-m="'+i+'">−</button> '+q+' <button data-p="'+i+'">+</button></span></div>';
  });
  $("items").innerHTML = html || "<p>Tu carrito está vacío.</p>";
  $("total").textContent = money(total); $("count").textContent = count;
  var msg = "Hola, quiero pedir:\n" + ids.map(function(i){ return "• "+cart[i]+" x "+ALL[i].n; }).join("\n") + "\nTotal: " + money(total);
  $("checkout").href = count ? "https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(msg) : "#";
  try { localStorage.setItem("jipi_cart", JSON.stringify(cart)); } catch(e) {}
}
function drawer(open){ $("drawer").classList.toggle("open", open); $("overlay").classList.toggle("on", open); }
document.addEventListener("click", function(e){
  var t = e.target.closest("button"); if(!t) return;
  if(t.dataset.add){ cart[t.dataset.add] = (cart[t.dataset.add]||0)+1; renderCart(); drawer(true); }
  if(t.dataset.p){ cart[t.dataset.p]++; renderCart(); }
  if(t.dataset.m){ if(--cart[t.dataset.m] <= 0) delete cart[t.dataset.m]; renderCart(); }
});
$("btn-carrito").onclick = function(){ drawer(true); };
$("close").onclick = $("overlay").onclick = function(){ drawer(false); };
renderCart();

/* ===== BUSCAR ===== */
$("btn-buscar").onclick = function(){ var b = $("searchbar"); b.hidden = !b.hidden; if(!b.hidden) $("q").focus(); };
$("searchbar").onsubmit = function(e){ e.preventDefault(); var v = $("q").value.trim(); if(v) location.href = "index.html?q=" + encodeURIComponent(v) + "#tienda"; };

/* ===== CARRUSEL (solo si la página lo tiene) ===== */
var slides = document.querySelectorAll(".hero-slide"), dots = document.querySelectorAll(".hero-dot"), cur = 0, timer;
function goSlide(i){
  if(!slides.length) return;
  slides[cur].classList.remove("active"); dots[cur].classList.remove("active");
  cur = (i + slides.length) % slides.length;
  slides[cur].classList.add("active"); dots[cur].classList.add("active");
  clearInterval(timer); timer = setInterval(function(){ goSlide(cur + 1); }, 6000);
}
function changeSlide(d){ goSlide(cur + d); }
goSlide(0);

/* Oculta imágenes rotas hasta que pongas tus fotos */
document.querySelectorAll("img").forEach(function(im){
  function ocultar(){ im.style.visibility = "hidden"; }
  im.addEventListener("error", ocultar);
  if(im.complete && im.naturalWidth === 0) ocultar();
});
