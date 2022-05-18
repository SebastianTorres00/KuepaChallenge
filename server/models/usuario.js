const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
  usuario: String,
  password: String,
  estudiante: Boolean,
  moderador: Boolean,
});

module.exports = mongoose.model("usuarioSchema", usuarioSchema);
