const validate = (input) => {
  let error = {};

  if (!input.name || !/^[A-Za-z\s]{2,30}$/.test(input.name)) {
    error.name = "A name of only letters is required.";
  } else {
    error.name = "";
  }

  if (!input.image || !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
    error.image = "A valid URL is required.";
  } else {
    error.image = "";
  }

  if (!input.genres.length) {
    error.genres = "Select at least one genre.";
  } else {
    error.genres = "";
  }

  if (!input.description || !/^[\w\s\d\S]{10,1500}$/.test(input.description)) {
    error.description =
      "A minimum of 10 characters and a maximum of 1500 is required.";
  } else {
    error.description = "";
  }

  if (!input.platforms || !/^[A-Za-z0-9\s]{2,100}$/.test(input.platforms)) {
    error.platforms =
      "From 2 to 100 characters allowed. Each platform must be separated by a single space.";
  } else {
    error.platforms = "";
  }

  if (!input.date) {
    error.date = "A date is required.";
  } else {
    error.date = "";
  }

  if (!/^(5(\.0)?|[0-4](\.[0-9])?)$/.test(input.rating)) {
    error.rating =
      "The rating must be from 0 to 5. Only one decimal is accepted.";
  } else {
    error.rating = "";
  }

  if (
    error.name === "" &&
    error.image === "" &&
    error.genres === "" &&
    error.description === "" &&
    error.platforms === "" &&
    error.date === "" &&
    error.rating === ""
  ) {
    return {};
  }

  return error;
};

export default validate;
