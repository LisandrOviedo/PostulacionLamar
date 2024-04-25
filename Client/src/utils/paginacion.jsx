export const calcularPaginasARenderizar = (paginaActual, totalPaginas) => {
  const paginasARenderizar = [];

  // Calcular el rango de páginas a renderizar
  let inicio = Math.max(1, paginaActual - 2);
  let fin = Math.min(totalPaginas, paginaActual + 2);

  // Agregar la primera página si no está duplicada
  if (inicio > 1) {
    paginasARenderizar.push(1);
  }

  // Agregar páginas intermedias
  for (let i = inicio; i <= fin; i++) {
    paginasARenderizar.push(i);
  }

  // Agregar la última página si no está duplicada
  if (fin < totalPaginas) {
    paginasARenderizar.push(totalPaginas);
  }

  return paginasARenderizar;
};

export const infoPaginador = (
  paginaActual,
  limitePorPagina,
  totalRegistros
) => {
  return (
    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
      Mostrando{" "}
      <span className="font-semibold text-gray-900 dark:text-white">
        {paginaActual * limitePorPagina - limitePorPagina}-
        {paginaActual * limitePorPagina > totalRegistros
          ? totalRegistros
          : paginaActual * limitePorPagina}
      </span>{" "}
      de{" "}
      <span className="font-semibold text-gray-900 dark:text-white">
        {totalRegistros}
      </span>{" "}
      registros. Página actual: {paginaActual}
    </span>
  );
};
