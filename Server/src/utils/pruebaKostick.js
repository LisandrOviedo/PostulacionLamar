const arreglo = [
  { pregunta: 1, respuesta: "a. Soy trabajador tenaz" },
  { pregunta: 1, respuesta: "b. No soy voluble" },
  {
    pregunta: 2,
    respuesta: "a. Me gusta hacer el trabajo mejor que los demás",
  },
  {
    pregunta: 2,
    respuesta: "b. Me gusta seguir con lo que he empezado hasta terminarlo",
  },
  {
    pregunta: 3,
    respuesta: "a. Me gusta enseñar a la gente cómo hacer las cosas",
  },
  { pregunta: 3, respuesta: "b. Me gusta hacer las cosas lo mejor posible" },
  { pregunta: 4, respuesta: "a. Me gusta hacer las cosas graciosas" },
  {
    pregunta: 4,
    respuesta: "b. Me gusta decir a la gente lo que tiene que hacer",
  },
  { pregunta: 5, respuesta: "a. Me gusta pertenecer a grupos" },
  { pregunta: 5, respuesta: "b. Me gusta sobresalir en los grupos" },
  { pregunta: 6, respuesta: "a. Me gusta tener un amigo íntimo" },
  { pregunta: 6, respuesta: "b. En un grupo me gusta tener varios amigos" },
  {
    pregunta: 7,
    respuesta: "a. Yo cambio rápidamente cuando lo creo necesario",
  },
  { pregunta: 7, respuesta: "b. Yo intento tener amigos íntimos" },
  {
    pregunta: 8,
    respuesta:
      "a. Me gusta 'pagar con la misma moneda' cuando alguien me ofende",
  },
  { pregunta: 8, respuesta: "b. Me gusta hacer cosas nuevas y diferentes" },
  { pregunta: 9, respuesta: "a. Quiero que mi jefe me estime" },
  {
    pregunta: 9,
    respuesta: "b. Me gusta decir a la gente cuando está equivocada",
  },
  {
    pregunta: 10,
    respuesta: "a. Me gusta seguir las instrucciones que me dan",
  },
  { pregunta: 10, respuesta: "b. Me gusta agradar a mis superiores" },
  { pregunta: 11, respuesta: "a. Me esfuerzo mucho" },
  { pregunta: 11, respuesta: "b. Soy ordenado, pongo todo en su lugar" },
  {
    pregunta: 12,
    respuesta: "a. Yo logro que la gente haga lo que tiene que hacer",
  },
  { pregunta: 12, respuesta: "b. No me altero fácilmente" },
  {
    pregunta: 13,
    respuesta: "a. Me gusta decir al grupo lo que tiene que hacer",
  },
  {
    pregunta: 13,
    respuesta: "b. Cuando comienzo un trabajo, no lo dejo hasta terminarlo",
  },
  { pregunta: 14, respuesta: "a. Me gusta ser animado e interesante" },
  { pregunta: 14, respuesta: "b. Yo quiero ser una persona rica y famosa" },
  { pregunta: 15, respuesta: "a. Me gusta identificarme con grupos" },
  {
    pregunta: 15,
    respuesta: "b. Me gusta ayudar a las personas a que tomen una conclusión",
  },
  { pregunta: 16, respuesta: "a. Me preocupa cuando alguien no me estima" },
  { pregunta: 16, respuesta: "b. Me gusta que la gente note mi presencia" },
  { pregunta: 17, respuesta: "a. Me gusta experimentar cosas nuevas" },
  {
    pregunta: 17,
    respuesta: "b. Prefiero trabajar con otras personas que solo",
  },
  {
    pregunta: 18,
    respuesta: "a. Algunas veces culpo a otros cuando las cosas salen mal",
  },
  {
    pregunta: 18,
    respuesta: "b. Me molesta cuando le soy antipático a alguien",
  },
  { pregunta: 19, respuesta: "a. Me gusta complacer a mis superiores" },
  {
    pregunta: 19,
    respuesta: "b. Me gusta experimentar trabajos nuevos y diferentes",
  },
  {
    pregunta: 20,
    respuesta:
      "a. Me gusta que me den instrucciones precisas para hacer un trabajo",
  },
  {
    pregunta: 20,
    respuesta: "b. Me gusta experimentar trabajos nuevos y diferentes",
  },
  {
    pregunta: 21,
    respuesta: "a. Me gusta tener una amplia gama de experiencias",
  },
  {
    pregunta: 21,
    respuesta: "b. Me gusta tener una estrecha relación con unos pocos amigos",
  },
  { pregunta: 22, respuesta: "a. Me gusta que me digan qué hacer" },
  { pregunta: 22, respuesta: "b. Me gusta tomar mis propias decisiones" },
  { pregunta: 23, respuesta: "a. Me gusta ser el centro de atención" },
  { pregunta: 23, respuesta: "b. Me gusta ser una persona reservada" },
  { pregunta: 24, respuesta: "a. Me gusta buscar aventuras" },
  { pregunta: 24, respuesta: "b. Me gusta mantenerme seguro y protegido" },
  { pregunta: 25, respuesta: "a. Me gusta tener una rutina establecida" },
  { pregunta: 25, respuesta: "b. Me gusta probar cosas nuevas y espontáneas" },
  { pregunta: 26, respuesta: "a. Me gusta que me valoren por mi trabajo" },
  { pregunta: 26, respuesta: "b. Me gusta que me valoren por mi personalidad" },
  { pregunta: 27, respuesta: "a. Me gusta trabajar en equipo" },
  { pregunta: 27, respuesta: "b. Me gusta trabajar de forma independiente" },
  {
    pregunta: 28,
    respuesta: "a. Me gusta tener el control de las situaciones",
  },
  {
    pregunta: 28,
    respuesta: "b. Me gusta seguir el flujo y adaptarme a las circunstancias",
  },
  { pregunta: 29, respuesta: "a. Me gusta recibir reconocimiento y elogios" },
  { pregunta: 29, respuesta: "b. Me gusta mantener un perfil bajo" },
  {
    pregunta: 30,
    respuesta:
      "a. Me gusta explorar diferentes opciones antes de tomar una decisión",
  },
  {
    pregunta: 30,
    respuesta: "b. Me gusta tomar decisiones rápidas y seguir adelante",
  },
  { pregunta: 31, respuesta: "a. Me gusta tener un horario estructurado" },
  {
    pregunta: 31,
    respuesta: "b. Me gusta tener flexibilidad y libertad en mi horario",
  },
  {
    pregunta: 32,
    respuesta: "a. Me gusta recibir instrucciones claras y específicas",
  },
  {
    pregunta: 32,
    respuesta: "b. Me gusta tener libertad para hacer las cosas a mi manera",
  },
  { pregunta: 33, respuesta: "a. Me gusta ser el líder en un grupo" },
  { pregunta: 33, respuesta: "b. Me gusta contribuir como miembro del equipo" },
  { pregunta: 34, respuesta: "a. Me gusta ser elogiado en público" },
  { pregunta: 34, respuesta: "b. Me gusta recibir reconocimiento en privado" },
  {
    pregunta: 35,
    respuesta: "a. Me gusta explorar nuevas ideas y posibilidades",
  },
  {
    pregunta: 35,
    respuesta: "b. Me gusta seguir métodos y procedimientos establecidos",
  },
  { pregunta: 36, respuesta: "a. Me gusta tener un plan claro y seguirlo" },
  {
    pregunta: 36,
    respuesta: "b. Me gusta ir con la corriente y adaptarme a los cambios",
  },
  {
    pregunta: 37,
    respuesta: "a. Me gusta ser el centro de atención en eventos sociales",
  },
  {
    pregunta: 37,
    respuesta: "b. Me gusta pasar desapercibido en eventos sociales",
  },
  {
    pregunta: 38,
    respuesta: "a. Me gusta asumir riesgos y enfrentar desafíos",
  },
  {
    pregunta: 38,
    respuesta: "b. Me gusta evitar situaciones arriesgadas y mantenerme seguro",
  },
  {
    pregunta: 39,
    respuesta: "a. Me gusta tener una rutina estable y predecible",
  },
  {
    pregunta: 39,
    respuesta: "b. Me gusta tener variedad y cambios en mi rutina",
  },
  { pregunta: 40, respuesta: "a. Me gusta que me reconozcan por mis logros" },
  {
    pregunta: 40,
    respuesta: "b. Me gusta que me aprecien por mi personalidad",
  },
  { pregunta: 41, respuesta: "a. Me gusta trabajar en colaboración con otros" },
  { pregunta: 41, respuesta: "b. Me gusta trabajar de forma independiente" },
  { pregunta: 42, respuesta: "a. Me gusta tomar decisiones y liderar" },
  { pregunta: 42, respuesta: "b. Me gusta seguir las decisiones de otros" },
  {
    pregunta: 43,
    respuesta: "a. Me gusta recibir elogios y reconocimiento público",
  },
];
