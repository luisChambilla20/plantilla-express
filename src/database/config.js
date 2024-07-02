const mongoose = require("mongoose");

const connectionMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS);

    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    console.log("Error al conectar la db");
  }
};

module.exports = { connectionMongo };
