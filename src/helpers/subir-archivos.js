const { v4: uuidv4 } = require("uuid");
const path = require("path");

const subirArchivoHelper = (
  files,
  extencionPermitida = ["txt", "png", "jpg", "jpeg"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const sampleFile = files.sampleFile;
    const nombreCortado = sampleFile.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];
    const nombreTemp = uuidv4() + "." + extension;

    if (!extencionPermitida.includes(extension)) {
      return reject("Extensión de archivo no permitida");
    }

    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    // Guardar el archivo
    sampleFile.mv(uploadPath, function (err) {
      if (err) return reject(err);

      resolve(nombreTemp);
    });
  });
};

module.exports = subirArchivoHelper;
