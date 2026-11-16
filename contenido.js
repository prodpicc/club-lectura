/* ============================================================
   CONTENIDO DEL JUEGO — acá se edita TODO (textos, video, música, créditos)
   No hace falta tocar los .html: todos son iguales y los arma motor.js.
   Los textos aceptan HTML (<b>, <i>, <br>...).
   ============================================================ */
const JUEGO = {

  titulo: "Club de Lectura ♡",

  /* ---------- MÚSICA (suena en index.html) ---------- */
  musica: { archivo: "musica.mp3", volumen: 0.5 },   // volumen de 0 a 1

  /* ---------- VIDEO de las escenas de Monika ----------
     Es lo que viene después de "v=" en la URL de YouTube.
     "si" es opcional (déjalo vacío si no lo tenés). */
  video: { id: "VMaiRexFLVM", si: "NO-5dURvYXDyuHNi" },

  /* ---------- LA CLAVE SECRETA ----------
     Lo que hay que escribir en la placa del libro para llegar a Monika
     (no distingue mayúsculas). La pista en Base64 al final de cada
     poema se calcula sola a partir de esta palabra. */
  respuesta: "Monika",

  /* ---------- PERSONAJES (nombre que se muestra) ----------
     No cambies las claves (phoebe, nina, rei): el CSS las usa. */
  personajes: { phoebe: "Phoebe", nina: "Nina", rei: "Rei" },

  /* ---------- TEXTOS DE INTERFAZ ---------- */
  ui: {
    inicio: "↺ Inicio",
    continuar: "Continuar",
    listo: "¡Listo!",
    preguntaLibro: "¿A quién le pertenece este libro?",
    placeholderLibro: "Escribí un nombre",
    notaBase64: "Base64",
    videoAlt: "¿No se ve? Abrir en YouTube"
  },

  /* ---------- ESCENAS DE LA PUERTA ---------- */
  inicio: {
    titulo: "Club de Lectura ♡",
    pista: "▼ Hacé clic en la puerta ▼",
    puerta: "Sala de lectura",
    texto: "Estás en la biblioteca, frente a la puerta de la sala de lectura. Hoy es tu primer día en el club."
  },
  golpes: {
    golpe: "¡TOC, TOC!",
    texto: "¡Buenos días! ¿Venís al club de lectura?",
    opcion: "Sí"
  },
  nombre: {
    pregunta: "¡Bienvenida! ¿Cómo te llamás?",
    placeholder: "Tu nombre",
    saludoAntes: "¡Un gusto, ",
    saludoDespues: "! Yo soy Phoebe.",
    pasa: "Pasá, las demás miembros ya están dentro."
  },

  /* ---------- CONVERSACIÓN EN LA SALA ----------
     Cada línea: [quién habla, texto]  (sala-1.html, sala-2.html, ...)
     Si lleva un tercer valor, es una pregunta con botón de respuesta:
       [quién, texto, "texto del botón"]
     Para agregar líneas: sumá un renglón acá y copiá un sala-N.html
     (todos son idénticos) con el número siguiente. */
  sala: [
    ["phoebe", "Dejame presentarte a las chicas, ella es Nina."],
    ["nina",   "Es un placer conocerte, espero que te sientas cómoda y disfrutes de nuestro humilde club."],
    ["phoebe", "Y ella es Rei."],
    ["rei",    "¿No serás nuestro stalker, verdad?"],
    ["nina",   "¡¿Stalker?!"],
    ["phoebe", "No le hagas caso a Rei, solo le gustan mucho las historias de misterio."],
    ["rei",    "No me lo estoy inventando, te juro que hay alguien siguiéndonos desde que empezamos el club. Incluso le dije a Phoebe que no invitara más gente por las dudas. Hablando de eso, ¿cómo te enteraste de nuestro club?"],
    ["rei",    "¿Cómo te enteraste de nuestro club?", "No lo recuerdo."],
    ["phoebe", "Bueno, no importa. Lo que importa es que estamos todas aquí reunidas por nuestro amor a la lectura. Realmente esperamos que las pases bien y que podamos ser todas amigas, ¿verdad chicas?"],
    ["nina",   "Por supuesto."],
    ["rei",    "Supongo que sí."],
    ["phoebe", "¡Perfecto! En ese caso, dejame explicarte cómo funciona nuestro club: cada semana escogemos un libro para leer y en la próxima reunión discutimos qué nos pareció."],
    ["phoebe", "Ahora estábamos por elegir uno de poemas, pero no nos podemos decidir. Tengo una idea: ya que sos la nueva miembro, ¿por qué no nos ayudás a desempatar?"]
  ],

  /* ---------- LIBROS ----------
     Las claves a / n / d NO se cambian (el CSS y los nombres de archivo
     dependen de ellas). El orden es el de la votación y el de las tapas.
     personaje = quién lo propone y quién reacciona después.
     voto = lo que dice al proponerlo.
     poema: una línea por renglón; una línea en blanco separa estrofas. */
  libros: {
    a: { emoji: "🕷️", titulo: "Arachne", personaje: "rei",
         voto: "¡Yo quiero este!",
         poema: `
¿Sabes lo que escuché de Amy?
A Amy le gustan las arañas.
Asquerosas, retorcidas, peludas, feas arañas
Por eso no es mi amiga.

Amy tiene una linda voz al cantar.
La escuché cantar mi canción favorita de amor.
Cada vez que canta el coro, mi corazón late al ritmo de las palabras.
Pero le gustan las arañas.
Por eso no es mi amiga.

Una vez, me lastimé muy mal la pierna.
Amy me ayudó a levantarme y me llevó a la enfermería.
Intenté no dejar que me tocara.
Le gustan las arañas y sus manos probablemente son asquerosas.
Por eso no es mi amiga.

Amy tiene muchos amigos.
Siempre la veo hablando con gente.
Probablemente hable de arañas.
¿Y si a sus amigos les empiezan a gustar también?
Por eso no es mi amiga.

No importa si tiene otros hobbies.
No importa si lo mantiene en privado.
No importa si no lastima a nadie.

Es asqueroso.
Ella es asquerosa.
El mundo está mejor sin amantes de las arañas.

Y se lo contaré a todos.
` },
    n: { emoji: "🦝", titulo: "Little Raccoon", personaje: "nina",
         voto: "Yo creo que este podría ser interesante.",
         poema: `
Sucedió en la oscuridad de la noche mientras cortaba pan para un bocadillo culposo.
Mi atención fue atrapada por un mapache que se apresuraba fuera de mi ventana.
Esa fue, yo creo, la primera vez que noté mis extrañas tendencias como una humana inusual.
Le dí al mapache un pedazo de pan, mi subconsciente al tanto de las consecuencias.
Al tanto de que un mapache alimentado siempre volverá por más.
La tentadora belleza de mi cuchillo de corte fue el síntoma.
El pan, mi curiosidad hambrienta.
El mapache, un impulso.

La luna incrementa su fase reflejando aún más luz en mi cuchillo de corte.
La mismísima luz resplandeciente en los ojos de mi amigo el mapache.
Rebano el pan, fresco y suave. El mapache se emociona.
O quizás meramente estoy proyectando mis emociones al recientemente satisfecho animal.

El mapache empezó a seguirme.
Podrías decir que nos hemos acostumbrado bastante el uno al otro.
El mapache está hambriento más y más seguido, por lo que mi pan siempre es útil.
Cada vez que blando mi cuchillo de corte el mapache me muestra su emoción.
Una descarga de sangre. Condicionamiento pavloviano clásico. Rebano el pan.

Y me alimento otra vez.
` },
    d: { emoji: "🍾", titulo: "El diablo de la botella", personaje: "phoebe",
         voto: "¡Y a mí me gusta este!",
         poema: `
Destapo mi cabeza como una jarra de galletas.
Es mi lugar secreto donde guardo mis sueños.
Pequeñas bolas de luz solar, frotándose como varios gatitos.
Alcanzó uno adentro y lo saco con mi pulgar y dedo índice.
Es cálido y da cosquillas.
¡Pero no hay tiempo que perder! Lo pongo en una botella que lo va a proteger.
Y pongo la botella en la repisa donde están las demás.
Pensamiento feliz, pensamiento feliz, pensamiento feliz en botellas, todas en fila.

Mi colección me consigue amigos.
Cada botella una estrella de hacer remiendos.
A veces mi amigo se siente de alguna manera.
Y a salvar el día van mis botellas.

Noche tras noche, más sueños.
Amigo tras amigo, más botellas.
Más profundo y profundo mis dedos van.
Como explorando una cueva, descubriendo secretos ocultos en grietas.
Cavando y cavando.
Rascando y rascando.

Quito el polvo encima de mis botellas.
El tiempo ya no parece pasar.
Mi repisa vacía necesita aún más.
Mis amigos a través de mi puerta cerrada miran detrás.

Finalmente, todo bien. Abro y mis amigos entran.
Ellos entran apresurados. ¿De verdad tanto quieren mis botellas?
Yo frenéticamente las bajo de la repisa, una tras otra.
Pasándolas a cada uno de mis amigos.
Cada una de las botellas.
Pero cuando dejo ir una, se rompe contra el suelo enfrente de mi.
Pensamiento feliz, pensamiento feliz, pensamiento feliz en trozos por todo el suelo.

Se suponía que eran para mis amigos, los cuales no están sonriendo.
Están todos gritando, rogando. Algo.
Pero solo escucho eco, eco, eco, eco, eco

En mi cabeza.
` }
  },

  /* ---------- ELEGIR, DESPEDIDA Y REACCIONES ---------- */
  elegir: "Elegí el libro de poemas que leerá el club esta semana.",
  despedida: "¡Perfecto! Ahora cada una deberá leerlo en casa para la próxima reunión. ¡Nos vemos!",
  reaccion: {
    pregunta: "¿Y bien? ¿Qué te pareció?",
    gusto: "¡Me gustó mucho!",
    duda: "Creo que no lo entendí.",
    monika: "¿Quién es Monika?"        // aparece solo si escribiste la clave
  },
  finales: { gusto: "Me alegra mucho.", duda: "Oh, qué lástima." },
  monika: "¿Cómo sabes de eso?",       // lo que dice el personaje junto al video

  /* ---------- CRÉDITOS: [rol, nombre] ---------- */
  creditos: [
    ["Dirección", "Ana Lago"],
    ["Guion", "Ana Lago"],
    ["Manejo de redes", "Aldana Arces"],
    ["Dirección de audiovisuales", "Aldana Arces"],
    ["Dirección de arte", "Franca Rodriguez Picco"],
    ["Código", "Franca Rodriguez Picco"]
  ],

  /* ---------- Imágenes que se precargan en inicio y nombre ---------- */
  precargar: ["puerta-abierta.png", "aula.jpg"]
};
