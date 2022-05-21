import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import Usuario from "../models/Usuario.js";

const registrarUsuario = async (req, res) => {
  //! Evitar registros duplicados

  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  //* Si no existe ese usuario lo guardamos en la bbdd

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();

    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const logarUsuario = async (req, res) => {
  const { email, password } = req.body;
  //* Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }
  //* Comprobar que el usuario esté confirmado
  if (!usuario.auth) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }
  //* Comprobar su password
  if (await usuario.comprobarPassword(password)) {
    const { _id, nombre, email } = usuario;
    res.json({
      _id,
      nombre,
      email,
      token: generarJWT(_id), //? Creo que el jwt es el que comprueba que estés logado
    });
    return;
  }
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
};

const confirmarUsuario = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("Token no válido");
    return res.status(403).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.auth = true;
    usuarioConfirmar.token = '';
    await usuarioConfirmar.save();
    res.json({msg : 'Usuario confirmado correctamente'});
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req,res) => {
  const {email} = req.body;
  const usuario = await Usuario.findOne({email});
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();
    res.json({msg : 'Hemos enviado un mensaje al email con las instrucciones'})
  } catch (error) {
    console.log(error)
  }
};

const comprobarToken = async (req,res) => {
  const {token} = req.params;

  const tokenValido = await Usuario.findOne({token});

  if(!tokenValido){
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }

  res.json({msg : 'Token válido y el usuario existe'});
};

const nuevoPassword = async (req,res) => {
  const {token} = req.params;
  const {password} = req.body;

  const usuario = await Usuario.findOne({token});
  if(!usuario){
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }
  usuario.password = password;
  usuario.token = '';
  await usuario.save();
  res.json({msg : 'Password cambiada con éxito'});
}

const perfil = async (req,res) => {
  const {usuario} = req;

  res.json(usuario)
}

export { registrarUsuario, logarUsuario, confirmarUsuario, olvidePassword, comprobarToken, nuevoPassword, perfil };
