const municipios = [
  {
    estado: "Amazonas",
    municipios: [
      "Autónomo Alto Orinoco",
      "Autónomo Atabapo",
      "Autónomo Atures",
      "Autónomo Autana",
      "Autónomo Manapiare",
      "Autónomo Maroa",
      "Autónomo Río Negro",
    ],
  },
  {
    estado: "Anzoátegui",
    municipios: [
      "Anaco",
      "Aragua",
      "Diego Bautista Urbaneja",
      "Fernando De Peñalver",
      "Francisco De Miranda",
      "Francisco Del Carmen Carvajal",
      "Guanta",
      "Independencia",
      "José Gregorio Monagas",
      "Juan Antonio Sotillo",
      "Juan Manuel Cajigal",
      "Libertad",
      "Manuel Ezequiel Bruzual",
      "Pedro María Freites",
      "Píritu",
      "San José De Guanipa",
      "San Juan De Capistrano",
      "Santa Ana",
      "Simón Bolívar",
      "Simón Rodríguez",
      "Sir Arthur Mc Gregor",
    ],
  },
  {
    estado: "Apure",
    municipios: [
      "Achaguas",
      "Biruaca",
      "Muñoz",
      "Páez",
      "Pedro Camejo",
      "Rómulo Gallegos",
      "San Fernando",
    ],
  },
  {
    estado: "Aragua",
    municipios: [
      "Bolívar",
      "Camatagua",
      "Francisco Linares Alcántara",
      "Girardot",
      "José Ángel Lamas",
      "José Félix Rivas",
      "José Rafael Revenga",
      "Libertador",
      "Mario Briceño Iragorry",
      "Ocumare De La Costa De Oro",
      "San Casimiro",
      "San Sebastián",
      "Santiago Mariño",
      "Santos Michelena",
      "Sucre",
      "Tovar",
      "Urdaneta",
      "Zamora",
    ],
  },
  {
    estado: "Barinas",
    municipios: [
      "Alberto Arvelo Torrealba",
      "Andrés Eloy Blanco",
      "Antonio José De Sucre",
      "Arismendi",
      "Barinas",
      "Bolívar",
      "Cruz Paredes",
      "Ezequiel Zamora",
      "Obispos",
      "Pedraza",
      "Rojas",
      "Sosa",
    ],
  },
  {
    estado: "Bolívar",
    municipios: [
      "Bolivariano Angostura",
      "Caroní",
      "Cedeño",
      "El Callao",
      "Gran Sabana",
      "Heres",
      "Padre Pedro Chien",
      "Piar",
      "Roscio",
      "Sifontes",
      "Sucre",
    ],
  },
  {
    estado: "Miranda",
    municipios: [
      "Acevedo",
      "Andrés Bello",
      "Baruta",
      "Bolivariano Guaicaipuro",
      "Brión",
      "Buroz",
      "Carrizal",
      "Chacao",
      "Cristobal Rojas",
      "El Hatillo",
      "Independencia",
      "Lander",
      "Los Salias",
      "Páez",
      "Paz Castillo",
      "Pedro Gual",
      "Plaza",
      "Simón Bolívar",
      "Sucre",
      "Urdaneta",
      "Zamora",
    ],
  },
  {
    estado: "Carabobo",
    municipios: [
      "Bejuma",
      "Carlos Arvelo",
      "Diego Ibarra",
      "Guacara",
      "Juan José Mora",
      "Libertador",
      "Los Guayos",
      "Miranda",
      "Montalban",
      "Naguanagua",
      "Puerto Cabello",
      "San Diego",
      "San Joaquín",
      "Valencia",
    ],
  },
  {
    estado: "Cojedes",
    municipios: [
      "Anzoátegui",
      "El Pao",
      "Ezequiel Zamora",
      "Girardot",
      "Lima Blanco",
      "Ricaurte",
      "Romulo Gallegos",
      "Tinaco",
      "Tinaquillo",
    ],
  },
  {
    estado: "Delta Amacuro",
    municipios: ["Antonio Diaz", "Casacoima", "Pedernales", "Tucupita"],
  },
  {
    estado: "Dependencias Federales",
    municipios: [
      "Archipiélago Los Roques",
      "La Blanquilla",
      "La Orchila",
      "La Tortuga",
      "Las Aves",
      "Los Frailes",
      "Los Hermanos",
      "Los Testigos",
      "Territorio Nacional",
    ],
  },
  { estado: "Distrito Capital", municipios: ["Bolivariano Libertador"] },
  {
    estado: "Falcón",
    municipios: [
      "Acosta",
      "Bolívar",
      "Buchivacoa",
      "Cacique Manaure",
      "Carirubana",
      "Colina",
      "Dabajuro",
      "Democracia",
      "Falcón",
      "Federación",
      "Jacura",
      "Los Taques",
      "Mauroa",
      "Miranda",
      "Monseñor Iturriza",
      "Palmasola",
      "Petit",
      "Píritu",
      "San Francisco",
      "Silva",
      "Sucre",
      "Tocópero",
      "Unión",
      "Urumaco",
      "Zamora",
    ],
  },
  {
    estado: "Guárico",
    municipios: [
      "Autónomo José Tadeo Monagas",
      "Camaguán",
      "Chaguaramas",
      "El Socorro",
      "Francisco De Miranda",
      "José Felix Ribas",
      "Juan Germán Roscio",
      "Juan José Rondón",
      "Julián Mellado",
      "Leonardo Infante",
      "Ortiz",
      "Pedro Zaraza",
      "San Gerónimo De Guayabal",
      "San José De Guaribe",
      "Santa María De Ipire",
    ],
  },
  { estado: "La Guaira", municipios: ["Vargas"] },
  {
    estado: "Lara",
    municipios: [
      "Andrés Eloy Blanco",
      "Crespo",
      "Iribarren",
      "Jiménez",
      "Morán",
      "Palavecino",
      "Simón Planas",
      "Torres",
      "Urdaneta",
    ],
  },
  {
    estado: "Mérida",
    municipios: [
      "Alberto Adriani",
      "Andrés Bello",
      "Antonio Pinto Salinas",
      "Aricagua",
      "Arzobispo Chacón",
      "Campo Elías",
      "Caracciolo Parra Olmedo",
      "Cardenal Quintero",
      "Guaraque",
      "Julio César Salas",
      "Justo Briceño",
      "Libertador",
      "Miranda",
      "Obispo Ramos De Lora",
      "Padre Noguera",
      "Pueblo Llano",
      "Rangel",
      "Rivas Dávila",
      "Santos Marquina",
      "Sucre",
      "Tovar",
      "Tulio Febres Cordero",
      "Zea",
    ],
  },
  {
    estado: "Monagas",
    municipios: [
      "Acosta",
      "Aguasay",
      "Bolívar",
      "Caripe",
      "Cedeño",
      "Ezequiel Zamora",
      "Libertador",
      "Maturín",
      "Piar",
      "Punceres",
      "Santa Bárbara",
      "Sotillo",
      "Uracoa",
    ],
  },
  {
    estado: "Nueva Esparta",
    municipios: [
      "Antolín Del Campo",
      "Arismendi",
      "Díaz",
      "García",
      "Gómez",
      "Maneiro",
      "Marcano",
      "Mariño",
      "Península De Macanao",
      "Tubores",
      "Villalba",
    ],
  },
  {
    estado: "Portuguesa",
    municipios: [
      "Agua Blanca",
      "Araure",
      "Esteller",
      "Guanare",
      "Guanarito",
      "Monseñor José Vicente De Unda",
      "Ospino",
      "Páez",
      "Papelón",
      "San Genaro De Boconoito",
      "San Rafael De Onoto",
      "Santa Rosalía",
      "Sucre",
      "Turén",
    ],
  },
  {
    estado: "Sucre",
    municipios: [
      "Andrés Eloy Blanco",
      "Andrés Mata",
      "Arismendi",
      "Benítez",
      "Bermúdez",
      "Bolívar",
      "Cajigal",
      "Cruz Salmerón Acosta",
      "Libertador",
      "Mariño",
      "Mejía",
      "Montes",
      "Ribero",
      "Sucre",
      "Valdez",
    ],
  },
  {
    estado: "Táchira",
    municipios: [
      "Andrés Bello",
      "Antonio Rómulo Costa",
      "Ayacucho",
      "Bolívar",
      "Cárdenas",
      "Cordoba",
      "Fernández Feo",
      "Francisco De Miranda",
      "García De Hevia",
      "Guásimos",
      "Independencia",
      "Jáuregui",
      "José María Vargas",
      "Junín",
      "Libertad",
      "Libertador",
      "Lobatera",
      "Michelena",
      "Panamericano",
      "Pedro María Ureña",
      "Rafael Urdaneta",
      "Samuel Darío Maldonado",
      "San Cristóbal",
      "San Judas Tadeo",
      "Seboruco",
      "Simón Rodríguez",
      "Sucre",
      "Torbes",
      "Uribante",
    ],
  },
  {
    estado: "Trujillo",
    municipios: [
      "Andrés Bello",
      "Boconó",
      "Bolívar",
      "Candelaria",
      "Carache",
      "Escuque",
      "José Felipe Márquez Cañizales",
      "Juan Vicente Campo Elías",
      "La Ceiba",
      "Miranda",
      "Monte Carmelo",
      "Motatán",
      "Pampán",
      "Pampanito",
      "Rafael Rangel",
      "San Rafael De Carvajal",
      "Sucre",
      "Trujillo",
      "Urdaneta",
      "Valera",
    ],
  },
  {
    estado: "Yaracuy",
    municipios: [
      "Aristides Bastidas",
      "Bolívar",
      "Bruzual",
      "Cocorote",
      "Independencia",
      "José Antonio Páez",
      "La Trinidad",
      "Manuel Monge",
      "Nirgua",
      "Peña",
      "San Felipe",
      "Sucre",
      "Urachiche",
      "Veroes",
    ],
  },
  {
    estado: "Zulia",
    municipios: [
      "Almirante Padilla",
      "Baralt",
      "Cabimas",
      "Catatumbo",
      "Colon",
      "Francisco Javier Pulgar",
      "Indigena Bolivariano Guajira",
      "Jesús Enrique Lossada",
      "Jesús María Semprún",
      "La Cañada De Urdaneta",
      "Lagunillas",
      "Machiques De Perijá",
      "Mara",
      "Maracaibo",
      "Miranda",
      "Rosario De Perijá",
      "San Francisco",
      "Santa Rita",
      "Simón Bolívar",
      "Sucre",
      "Valmore Rodríguez",
    ],
  },
];

module.exports = {
  municipios,
};
