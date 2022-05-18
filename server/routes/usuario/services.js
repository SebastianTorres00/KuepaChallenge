const usuarioSchema = require("../../models/usuario");

async function getUser(req, res) {
  try {
    const findUser = await usuarioSchema.findOne({
      usuario: req.query.usuario,
      password: req.query.password,
    });
    if (findUser !== null) {
      return res.send(findUser);
    } else {
      throw new Error("error GetUser");
    }
  } catch (error) {
    console.log(error);
    return res.send(false);
  }
}
async function createUser(req, res) {
  try {
    const newUser = new usuarioSchema(req.body);
    console.log("------>", req.body);
    const findUser = await usuarioSchema.findOne({usuario: newUser.usuario});
    if (findUser) throw new Error("ErrorCreate User");
    await newUser.save();
    return res.send(newUser);
  } catch (error) {
    console.log(error);
    return res.send(false);
  }
}

module.exports = {
  getUser,
  createUser,
};
