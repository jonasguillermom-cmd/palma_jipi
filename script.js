/* ===== CONFIGURACIÓN (un solo lugar) ===== */
var WHATSAPP = "529341105505"; // WhatsApp de ventas: lada país + número, sin + ni espacios

/* ===== PRODUCTOS (estáticos, sin base de datos) =====
   t: tipo (sombrero | accesorio) · cat: categoría · p: precio (null = cotizar) · old: precio anterior
   feat: sale en el inicio · rel: sale como relacionado en cubanos.html · f: filtro de accesorios */
var PRODUCTS = [
  {id:"s1", t:"sombrero", cat:"Cubanos",  n:"Sombrero Cubano Artesanal", d:"Paja jipi natural tejida a mano. Tallas S, M, L y XL.", p:null, img:"sombrero_cubano.jpeg", href:"cubanos.html"},
  {id:"s2", t:"sombrero", cat:"Otros",    n:"Sombrero Clásico Natural",  d:"Tejido tradicional en color natural.",       p:1200, img:"clasico-natural.jpg", feat:1},
  {id:"s3", t:"sombrero", cat:"Vaqueros", n:"Texana Premium Negro",      d:"Texana de acabado premium en negro.",        p:2100, old:2800, img:"texana-premium-negro.jpg", feat:1},
  {id:"s4", t:"sombrero", cat:"Vaqueros", n:"Sombrero Vaquero Café",     d:"Vaquero en tono café, ala ancha.",           p:3500, img:"vaquero-cafe.jpg", feat:1},
  {id:"s5", t:"sombrero", cat:"Vaqueros", n:"Texana Estilo Rancher",     d:"Estilo rancher con mucho carácter.",         p:3200, img:"texana-rancher.jpg", badge:"Nuevo", feat:1},
  {id:"s6", t:"sombrero", cat:"Vaqueros", n:"Sombrero Vaquero",          d:"Vaquero clásico para uso diario.",           p:1500, img:"vaquero.jpg", rel:1},
  {id:"s7", t:"sombrero", cat:"Otros",    n:"Sombrero Panamá",           d:"Elegante, fresco y ligero.",                 p:1350, img:"panama.jpg", rel:1},
  {id:"s8", t:"sombrero", cat:"Otros",    n:"Sombrero Fedora",           d:"Estilo fedora tejido a mano.",               p:1100, img:"fedora.jpg", rel:1},
  {id:"s9", t:"sombrero", cat:"Otros",    n:"Sombrero Casual",           d:"Cómodo y versátil para el día a día.",       p:950,  img:"casual.jpg", rel:1},
  {id:"a1", t:"accesorio", f:"aretes",     n:"Aretes Mariposa",            d:"Aretes artesanales de palma jipijapa en forma de mariposa. Disponible en rosado.", p:150, img:"aretemariposa.png", badge:"Popular"},
  {id:"a2", t:"accesorio", f:"aretes",     n:"Aretes color verde",         d:"Diseño floral en tonos verdes suaves y naturales.", p:150, img:"areteverdeydorado.png"},
  {id:"a3", t:"accesorio", f:"aretes",     n:"Aretes espiral morado",      d:"Diseño circular en espiral con fibras tejidas en tonos morados. Ligeros y elegantes.", p:150, img:"arete2.png"},
  {id:"a4", t:"accesorio", f:"aretes",     n:"Aretes Flor Negro y Natural",d:"Tejidos a mano con diseño floral en tonos negro y natural.", p:150, img:"arete3.png"},
  {id:"a5", t:"accesorio", f:"aretes",     n:"Aretes Estrella con Flecos", d:"Estrella azul con flecos de colores: movimiento y frescura.", p:150, img:"arete4.png"},
  {id:"a6", t:"accesorio", f:"llaveros",   n:"Llavero circular",           d:"Tejido a mano con palma jipijapa. Ligero y versátil.", p:175, img:"llavero1.png"},
  {id:"a7", t:"accesorio", f:"alajeros",   n:"Alajero artesanal",          d:"Caja circular tejida a mano, de colores vibrantes y patrones geométricos. Ideal para joyería.", p:200, img:"alajero1.png"},
  {id:"a8", t:"accesorio", f:"tortilleros",n:"Tortillero Artesanal",       d:"Tejido tradicional multicolor. Conserva las tortillas calientes.", p:250, img:"tortillero1.png", badge:"Popular"},
  {id:"a9", t:"accesorio", f:"llaveros",   n:"Llavero en forma de sandía", d:"Llavero artesanal tejido a mano con forma de sandía.", p:150, img:"llavero2.png"},
  {id:"a10",t:"accesorio", f:"alajeros",   n:"Caja Artesanal Multicolor",  d:"Caja tejida a mano con fibras naturales y tejido tradicional.", p:200, img:"alajero2.png"}
];
var SOMB_CATS = ["Todos","Cubanos","Vaqueros","Niños","Damas","Otros"];
var ACC_FILTERS = [["todos","Todos"],["aretes","Aretes"],["llaveros","Llaveros"],["alajeros","Alajeros"],["tortilleros","Tortilleros"]];
var ALIAS = {fundas:"alajeros", regalo:"tortilleros"};

function $(id){ return document.getElementById(id); }
function money(n){ return "$" + n.toLocaleString("es-MX") + " MXN"; }
function wa(msg){ return "https://wa.me/" + WHATSAPP + (msg ? "?text=" + encodeURIComponent(msg) : ""); }
document.querySelectorAll("[data-wa]").forEach(function(a){ if(!a.getAttribute("href") || a.getAttribute("href")==="#") a.href = wa(""); });

/* ===== TARJETAS ===== */
function tarjeta(x){
  var precio = x.p == null ? '<div class="precio">Cotiza tu talla</div>' : '<div class="precio">' + (x.old ? '<s>'+money(x.old)+'</s> ' : '') + money(x.p) + '</div>';
  var btn = x.p == null
    ? '<a class="btn small" target="_blank" rel="noopener" href="'+wa("Hola, quiero cotizar: "+x.n)+'">Cotizar por WhatsApp</a>'
    : '<button class="btn small" type="button" data-add="'+x.id+'">Agregar al carrito</button>';
  var foto = '<div class="foto">' + (x.badge ? '<span class="tag">'+x.badge+'</span>' : '') + '<img src="'+x.img+'" alt="'+x.n+'"></div>';
  var titulo = x.href ? '<a href="'+x.href+'" class="tit">'+x.n+'</a>' : x.n;
  return '<article class="tarjeta">' + (x.href ? '<a href="'+x.href+'">'+foto+'</a>' : foto) + '<h3>'+titulo+'</h3><p class="detalle">'+x.d+'</p>'+precio+btn+'</article>';
}
function pinta(sel, list){ document.querySelectorAll('[data-grid="'+sel+'"]').forEach(function(g){ g.innerHTML = list.map(tarjeta).join(""); }); }
function chips(sel, items, activo, ruta){
  document.querySelectorAll('[data-chips="'+sel+'"]').forEach(function(c){
    c.innerHTML = items.map(function(i){ return '<a class="chip'+(i[0]===activo?' on':'')+'" href="'+ruta+i[0]+'">'+i[1]+'</a>'; }).join("");
  });
}
var params = new URLSearchParams(location.search), q = (params.get("q")||"").toLowerCase().trim();
function buscar(list){ return list.filter(function(x){ return (x.n+" "+x.d+" "+(x.cat||x.f||"")).toLowerCase().indexOf(q) > -1; }); }

pinta("featured", PRODUCTS.filter(function(x){ return x.feat; }));
pinta("related",  PRODUCTS.filter(function(x){ return x.rel; }));
if(document.querySelector('[data-grid="sombreros"]')){
  var cat = params.get("cat") || "Todos", lista;
  if(q){ lista = buscar(PRODUCTS); $("titulo-cat").textContent = 'RESULTADOS PARA "' + q.toUpperCase() + '"'; cat = ""; }
  else { lista = PRODUCTS.filter(function(x){ return x.t==="sombrero" && (cat==="Todos" || x.cat===cat); }); $("titulo-cat").textContent = cat==="Todos" ? "TODOS LOS SOMBREROS" : cat.toUpperCase(); }
  chips("sombreros", SOMB_CATS.map(function(c){ return [c,c]; }), cat, "sombreros.html?cat=");
  document.querySelectorAll('[data-chips="sombreros"] a').forEach(function(a){ a.href = a.href.replace(/cat=(.*)$/, function(m,v){ return "cat="+v; }); });
  pinta("sombreros", lista);
  if(!lista.length) $("vacio").hidden = false;
}
if(document.querySelector('[data-grid="accesorios"]')){
  var fil = (params.get("filtro")||"todos").toLowerCase(); fil = ALIAS[fil] || fil;
  var acc = PRODUCTS.filter(function(x){ return x.t==="accesorio" && (fil==="todos" || x.f===fil); });
  chips("accesorios", ACC_FILTERS, fil, "accesorios.html?filtro=");
  pinta("accesorios", acc); $("contador").textContent = "Mostrando " + acc.length + " productos";
}

/* ===== PÁGINA DEL SOMBRERO CUBANO ===== */
if($("foto-main")){
  var talla = "S";
  function cotiza(){ $("cotizar").href = wa("Hola, quiero cotizar el Sombrero Cubano Artesanal en talla " + talla); }
  document.querySelectorAll(".thumbs img").forEach(function(t){ t.onclick = function(){
    $("foto-main").src = t.getAttribute("src"); document.querySelectorAll(".thumbs img").forEach(function(o){ o.classList.remove("on"); }); t.classList.add("on"); }; });
  document.querySelectorAll("#tallas .chip").forEach(function(b){ b.onclick = function(){
    talla = b.textContent; document.querySelectorAll("#tallas .chip").forEach(function(o){ o.classList.remove("on"); }); b.classList.add("on"); cotiza(); }; });
  cotiza();
}

/* ===== FORMULARIO DE CONTACTO → WhatsApp ===== */
if($("form-contacto")){
  $("form-contacto").onsubmit = function(e){
    e.preventDefault(); var f = e.target;
    window.open(wa("Hola, soy " + f.nombre.value + ". Asunto: " + f.asunto.value + ".\n" + f.msg.value + "\nTel: " + f.tel.value + " · Correo: " + f.correo.value), "_blank");
  };
}

/* ===== CARRITO (se guarda en el navegador) ===== */
var cart = {};
try { cart = JSON.parse(localStorage.getItem("jipi_cart2") || "{}"); } catch(e) { cart = {}; }
function prod(id){ return PRODUCTS.filter(function(x){ return x.id===id; })[0]; }
function renderCart(){
  var ids = Object.keys(cart).filter(function(i){ return prod(i) && prod(i).p != null; }), total = 0, count = 0, html = "";
  ids.forEach(function(i){
    var p = prod(i), n = cart[i]; total += p.p*n; count += n;
    html += '<div class="row"><span>'+p.n+'<br><small>'+money(p.p)+'</small></span><span class="qty"><button data-m="'+i+'">−</button> '+n+' <button data-p="'+i+'">+</button></span></div>';
  });
  $("items").innerHTML = html || "<p>Tu carrito está vacío.</p>";
  $("total").textContent = money(total); $("count").textContent = count;
  var msg = "Hola, quiero pedir:\n" + ids.map(function(i){ return "• "+cart[i]+" x "+prod(i).n; }).join("\n") + "\nTotal: " + money(total);
  $("checkout").href = count ? wa(msg) : "#";
  try { localStorage.setItem("jipi_cart2", JSON.stringify(cart)); } catch(e) {}
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

/* ===== BUSCAR y MENÚ MÓVIL ===== */
$("btn-buscar").onclick = function(){ var b = $("searchbar"); b.hidden = !b.hidden; if(!b.hidden) $("q").focus(); };
$("searchbar").onsubmit = function(e){ e.preventDefault(); var v = $("q").value.trim(); if(v) location.href = "sombreros.html?q=" + encodeURIComponent(v); };
$("btn-menu").onclick = function(){ $("mainnav").classList.toggle("open"); };

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
