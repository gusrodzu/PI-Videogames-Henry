const validate = (input) => {
  let errors = {};

  // Verifica el campo `name`: solo letras y longitud entre 2 y 30 caracteres.
  if (input.name && !/^[A-Za-z\s]{2,30}$/.test(input.name)) {
    errors.name = "Se requiere un nombre válido, solo letras y entre 2 y 30 caracteres.";
  }

  // Verifica el campo `image`: URL válida.
  if (input.image && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
    errors.image = "Se requiere una URL válida para la imagen.";
  }

  // Verifica el campo `genres`: al menos un género seleccionado.
  // if (!input.genres || !input.genres.some((genre) => genre === true)) {
  //   errors.genres = "Selecciona al menos un campo";
  // }
  

  // Verifica el campo `description`: entre 10 y 1500 caracteres.
  if (input.description && !/^[\w\s\d\S]{10,1500}$/.test(input.description)) {
    errors.description =
      "Se requiere una descripción de entre 10 y 1500 caracteres.";
  }

  // Verifica el campo `platforms`: de 2 a 100 caracteres y separados por un solo espacio.
  if (input.platforms && !/^[A-Za-z0-9\s]{2,100}(?:\s[A-Za-z0-9\s]{2,100})*$/.test(input.platforms)) {
    errors.platforms =
      "Se permiten de 2 a 100 caracteres para cada plataforma y deben estar separadas por un solo espacio.";
  }

  // Verifica el campo `date`: no está vacío y no excede el día actual.
  if (input.date && !input.date.trim()) {
    errors.date = "Se requiere una fecha valida.";
  } else {
    const today = new Date();
    const inputDate = new Date(input.date);

    if (inputDate > today) {
      errors.date = "La fecha de lanzamiento no puede ser una fecha futura.";
    } else {
      errors.date = "";
    }
  }

  // Verifica el campo `rating`: número entre 0 y 5 con un solo decimal.
  if (input.rating && !/^(5(\.0)?|[0-4](\.[0-9])?)$/.test(input.rating)) {
    errors.rating =
      "La calificación debe estar entre 0 y 5. Solo se acepta un decimal.";
  }

  return errors;
};

export default validate;
