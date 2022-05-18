const mongoose = require("mongoose");

const mensajesSchema = new mongoose.Schema({
  usuario: String,
  hora: String,
  moderador: Boolean,
  mensaje: String,
});

module.exports = mongoose.model("mensajesSchema", mensajesSchema);
