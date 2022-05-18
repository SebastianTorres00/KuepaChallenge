const mensajesSchema = require("../../models/mensajes");
const usuarioSchema = require("../../models/usuario");

async function getMessages(req, res) {
  try {
    const isUser = await mensajesSchema.findOne({usuario: req.query.usuario});
    if (!isUser) return res.send(false);
    const mensajes = await mensajesSchema.find({usuario: req.query.usuario});
    return res.send(mensajes);
  } catch (error) {
    console.log("error MessageByUser", error);
  }
}
async function savedMessage(req, res) {
  try {
    const newMessage = new mensajesSchema(req.body);
    await newMessage.save();
    return res.send();
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = {
  getMessages,
  savedMessage,
};
