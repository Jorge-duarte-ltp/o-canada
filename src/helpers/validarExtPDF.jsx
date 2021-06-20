export const validarExtPdf = (nombre, type) => {
  let ext = `.${nombre.split(".").pop()}`;
  ext = ext.toLowerCase();
  if (
    (ext === ".pdf" && type.includes("application/pdf")) ||
    (ext === ".jpg" && type.includes("image/jpg")) ||
    (ext === ".jpeg" && type.includes("image/jpeg"))
  ) {
    return true;
  } else {
    return false;
  }
};
