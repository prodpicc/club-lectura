/* MOTOR — arma la escena según el nombre del archivo (sala-3.html -> "sala-3").
   Genera el mismo HTML que tenían las páginas originales, así estilos.css sigue igual.
   Normalmente no hace falta editar este archivo: el contenido está en contenido.js */
(function () {
  var J = JUEGO, P = J.personajes, U = J.ui, L = J.libros, K = Object.keys(L);
  var n = (location.pathname.split('/').pop() || 'inicio').replace(/\.html?$/i, '') || 'inicio';

  var spr = function (q, pos, x) { return '<i class="spr ' + q + ' ' + pos + (x ? ' ' + x : '') + '"></i>'; };
  var trio = spr('nina', 'l') + spr('phoebe', 'c') + spr('rei', 'r');
  var nom = function (q) { return '<span class="nom ' + q + '">' + P[q] + '</span>'; };
  var tapa = function (k, tag, href, extra) {
    return '<' + tag + ' class="tapa ' + (extra || '') + 't-' + k + '"' + (href ? ' href="' + href + '"' : '') +
      '><b>' + L[k].emoji + '</b>' + L[k].titulo + '</' + tag + '>';
  };
  var parrafos = function (txt) {
    return txt.trim().split(/\n\s*\n/).map(function (p) {
      return '<p>' + p.trim().split('\n').map(function (s) { return s.trim(); }).join('<br>') + '</p>';
    }).join('');
  };
  var patron = function (s) {
    return '.*' + s.split('').map(function (c) { return '[' + c.toUpperCase() + c.toLowerCase() + ']'; }).join('') + '.*';
  };

  var r = { fondo: 'fondo-sala', id: n, h: '', html: '', musica: true, body: '' }, m, k, q;

  if (n === 'inicio') {
    r.fondo = 'fondo-biblio';
    r.html = '<h1 class="titulo">' + J.inicio.titulo + '</h1><p class="pista">' + J.inicio.pista +
      '</p><a class="puerta" href="golpes.html"><span>' + J.inicio.puerta + '</span></a><div class="caja">' + J.inicio.texto + '</div>';

  } else if (n === 'golpes') {
    r.fondo = 'fondo-biblio'; r.h = 'phoebe';
    r.html = '<div class="puerta golpea"></div><p class="golpe">' + J.golpes.golpe + '</p>' + spr('phoebe', 'c', 'tarde') +
      '<div class="opciones tarde"><a class="opcion" href="nombre.html">' + J.golpes.opcion + '</a></div>' +
      '<div class="caja tarde">' + nom('phoebe') + J.golpes.texto + '</div>';

  } else if (n === 'nombre') {
    var N = J.nombre;
    r.fondo = 'fondo-biblio';
    r.html = '<i id="bienvenida"></i><div class="puerta"></div>' + spr('phoebe', 'c') +
      '<div class="opciones t1"><a class="opcion gate" href="#bienvenida">' + U.continuar + '</a></div>' +
      '<div class="caja">' + nom('phoebe') + '<p class="t1">' + N.pregunta + '</p><p><span class="t2">' + N.saludoAntes +
      '</span><input class="campo" id="campo-nombre" maxlength="18" required pattern=".*\\S.*" placeholder="' + N.placeholder +
      '" autocomplete="off"><span class="t2">' + N.saludoDespues + '</span></p><p class="t2">' + N.pasa +
      '</p><a class="cubre t2" href="sala-1.html"></a><span class="flecha t2"></span></div>';

  } else if ((m = n.match(/^sala-(\d+)$/)) && J.sala[m[1] - 1]) {
    var i = +m[1], it = J.sala[i - 1], sig = i < J.sala.length ? 'sala-' + (i + 1) : 'voto-' + K[0];
    r.h = it[0];
    r.html = trio + (it[2]
      ? '<div class="opciones"><a class="opcion" href="' + sig + '.html">' + it[2] + '</a></div><div class="caja">' + nom(it[0]) + it[1] + '</div>'
      : '<a class="caja" href="' + sig + '.html">' + nom(it[0]) + it[1] + '</a>');

  } else if ((m = n.match(/^voto-(\w)$/)) && L[m[1]]) {
    k = m[1]; q = L[k].personaje; r.h = q;
    var nx = K[K.indexOf(k) + 1];
    r.html = trio + tapa(k, 'div', '', 'mini ') + '<a class="caja" href="' + (nx ? 'voto-' + nx : 'elegir') + '.html">' + nom(q) + L[k].voto + '</a>';

  } else if (n === 'elegir') {
    r.html = trio + '<div class="opciones tapas">' + K.map(function (x) { return tapa(x, 'a', 'despedida-' + x + '.html'); }).join('') +
      '</div><div class="caja">' + J.elegir + '</div>';

  } else if ((m = n.match(/^despedida-(\w)$/)) && L[m[1]]) {
    r.h = 'phoebe';
    r.html = trio + '<a class="caja" href="libro-' + m[1] + '.html">' + nom('phoebe') + J.despedida + '</a>';

  } else if ((m = n.match(/^libro-(\w)$/)) && L[m[1]]) {
    k = m[1];
    r.html = '<div class="velo"></div><div class="hoja"><span class="nota">' + U.notaBase64 + '</span><div class="libro"><h2>' + L[k].titulo +
      '</h2>' + parrafos(L[k].poema) + '<p class="ultima">' + btoa(J.respuesta) + '</p></div><label class="placa">' + U.preguntaLibro +
      ' <input id="dueno-' + k + '" required pattern="' + patron(J.respuesta) + '" maxlength="30" autocomplete="off" placeholder="' + U.placeholderLibro +
      '"></label><a class="opcion listo" href="reaccion-' + k + '.html">' + U.listo + '</a><a class="opcion listo-m" href="reaccion-' + k + '-monika.html">' + U.listo + '</a></div>';

  } else if ((m = n.match(/^reaccion-(\w)(-monika)?$/)) && L[m[1]]) {
    k = m[1]; q = L[k].personaje; r.id = 'reaccion-' + k; if (m[2]) r.body = ' con-monika';
    r.html = spr(q, 'c') + '<div class="opciones"><a class="opcion" href="bien-' + k + '.html">' + J.reaccion.gusto +
      '</a><a class="opcion" href="duda-' + k + '.html">' + J.reaccion.duda + '</a>' +
      (m[2] ? '<a class="opcion opt-monika" id="opt-m-' + k + '" href="monika-' + k + '.html">' + J.reaccion.monika + '</a>' : '') +
      '</div><div class="caja">' + nom(q) + J.reaccion.pregunta + '</div>';

  } else if ((m = n.match(/^(bien|duda)-(\w)$/)) && L[m[2]]) {
    q = L[m[2]].personaje;
    r.html = spr(q, 'c') + '<a class="caja" href="fin.html">' + nom(q) + J.finales[m[1] === 'bien' ? 'gusto' : 'duda'] + '</a>';

  } else if ((m = n.match(/^monika-(\w)$/)) && L[m[1]]) {
    q = L[m[1]].personaje; r.fondo = 'fondo-glitch'; r.musica = false;
    var v = J.video, yt = 'https://www.youtube.com/watch?v=' + v.id;
    r.html = '<div class="fx"></div>' + spr(q, 'c', 'terror') + '<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/' + v.id +
      (v.si ? '?si=' + v.si : '') + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe></div>' +
      '<a class="alt" href="' + yt + '" target="_blank" rel="noopener">' + U.videoAlt + '</a><a class="opcion sigue" href="fin.html">' + U.continuar +
      '</a><div class="caja roja">' + nom(q) + J.monika + '</div>';

  } else if (n === 'fin') {
    r.fondo = '';
    r.html = '<div class="creditos">' + J.creditos.map(function (c) { return '<div class="credito"><b>' + c[0] + '</b><span>' + c[1] + '</span></div>'; }).join('') + '</div>';

  } else {
    console.warn('Escena sin contenido en contenido.js:', n);
  }

  /* ---- Armado de la página ---- */
  document.title = J.titulo;
  document.body.className = 'pagina' + r.body;
  if (n === 'inicio' || n === 'nombre') {
    J.precargar.forEach(function (f) { document.head.insertAdjacentHTML('beforeend', '<link rel="preload" as="image" href="' + f + '">'); });
  }
  document.body.insertAdjacentHTML('afterbegin', '<a class="hud" href="inicio.html">' + U.inicio + '</a>\n' +
    '<section class="nodo ' + r.fondo + '" id="' + r.id + '"' + (r.h ? ' data-h="' + r.h + '"' : '') + '>' + r.html + '</section>');

  /* Puerta de inicio: se abre y un instante después pasa a la escena siguiente */
  document.querySelectorAll('a.puerta').forEach(function (p) {
    p.addEventListener('click', function (e) {
      if (p.classList.contains('abre')) return;
      e.preventDefault(); p.classList.add('abre');
      setTimeout(function () { location.href = p.getAttribute('href'); }, 650);
    });
  });

  /* Música: avisa al marco (index.html) si debe sonar. Vive en el marco, por eso no se reinicia. */
  var estado = r.musica ? 'on' : 'off';
  function avisar() { try { parent.postMessage({ musica: estado }, '*'); } catch (e) {} }
  avisar();
  if (r.musica) { addEventListener('pointerdown', avisar); addEventListener('keydown', avisar); }
})();
