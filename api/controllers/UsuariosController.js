/**
 * UsuariosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//UTILS
const invalid = require("../helpers/validations");
const bcrypt = require('bcryptjs');
const cat = require("../helpers/catalogs");
const general = require("../helpers/general");
const uuid =  require('uuid');
const validate = (data) => {
    const { nombre, password, email, telefono, id_rol, id_estatus } = data;
    if (!id_rol || !id_estatus || !nombre || !email || !password || !telefono) {
        return { error: true, message: cat.errors.default }
    }

    if (invalid.checkNull(nombre) ||
        invalid.checkLength(nombre, 2, 50)) {
        return { error: true, message: cat.errors.name}
    }

    if (invalid.checkPassword(password)) {
        return { error: true, message: cat.errors.password }
    }

    if (invalid.checkEmail(email)) {
        return { error: true, message:  cat.errors.email }
    }

    return { error: false }
}


module.exports = {
    nuevoUsuario: async (req, res) => {
        let respuesta = { ...cat.resMessage }
        let v = await validate(req.body)
        
        if (v.error) {
            respuesta.message = v.message;
            return res.json(respuesta)
        }

        const { nombre, fotografia, password, email, telefono, id_rol, id_estatus } = req.body;

        let userExists = await Usuarios.findOne({
            email: email
        }).meta({ schemaName: 'cot' });

        if (!userExists) {
            let foto = 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png';

            //hacer un hash de la password
            // revisar el problema del bigINT
            bcrypt.hash(password, 10, async (err, hash) => {
                // Store hash in your password DB.
                let usuario = await Usuarios.create(
                    Object.assign({
                        uuid: uuid.v4(),
                        id_rol: id_rol,
                        id_estatus: id_estatus,
                        nombre: nombre,
                        email: email,
                        password: hash,
                        fotografia: fotografia || foto,
                        telefono: telefono,
                        onboard: false,
                    })).meta({ schemaName: 'cot' });

                respuesta.success = true;
                respuesta.message = "Usuario creado";
                respuesta["data"] = usuario;
                return res.json(respuesta)

            });

        } else {
            respuesta.message = cat.errors.mailUnavalible;
            return res.json(respuesta);
        }
    },
    eliminarUsuario: async (req, res) => {
        let respuesta = { ...cat.resMessage }

        const { uuid } = req.body;
        if (!uuid) {
            return { error: true, message: respuestas }
        }
        
        let userExists = await general.checkUserById(uuid)

        if (!userExists) {
            respuesta.message = cat.errors.noUser;
            return res.json(respuesta);
        } else {
            let usuarioEliminado = await Usuarios.destroyOne({
                uuid: uuid
            }).meta({ schemaName: 'cot' });

            respuesta.success = true;
            respuesta.message = "Usuario eliminado exitosamente!";
            respuesta["data"] = usuarioEliminado;
            return res.json(respuesta)
        }
    },
    editarUsuario: async (req, res) => {
        let respuesta = { ...cat.resMessage }
        let v = await validate(req.body)
       
        if (v.error) {
            respuesta.message = v.message;
            return res.json(respuesta)
        }

        const { uuid } = req.body;
        if (!uuid) return res.json(respuesta)
        

        let userExists = await general.checkUserById(uuid)

        if (!userExists) {
            respuesta.message = cat.errors.noUser;
        
            return res.json(respuesta);
        } else {
            const { nombre, fotografia, password, email, telefono, id_rol, id_estatus } = req.body;

            ////hacer un hash de la password
            bcrypt.hash(password, 10, async (err, hash) => {
                let usuario = await Usuarios.updateOne({ uuid: uuid })
                    .set({
                        id_rol: id_rol,
                        id_estatus: id_estatus,
                        nombre: nombre,
                        email: email,
                        password: hash,
                        fotografia: fotografia,
                        telefono: telefono,
                    }).meta({ schemaName: 'cot' });

                respuesta.success = true;
                respuesta.message = "Usuario editado exitosamente!";
                respuesta["data"] = usuario;
                return res.json(respuesta)
            });
        }
    },
    verUsuario: async (req, res) => {
        let respuesta = { ...cat.resMessage }

        const { uuid } = req.query;
        if (!uuid) {
            return res.json(respuesta)
        }
        
        let userExists = await general.checkUserById(uuid)
        

        if (!userExists) {
            respuesta.message = cat.errors.noUser;
            return res.json(respuesta)
        } else {
            respuesta.success = true;
            respuesta.message = "Usuario obtenido exitosamente!";
            respuesta["data"] = userExists;
            return res.json(respuesta)
        }

    },
    verUsuarios: async (req, res) => {
        //que validacion necesitas para este?
        let respuesta = { ...cat.resMessage }

        let usuarios = await Usuarios.find().meta({ schemaName: 'cot' });

        if (!usuarios) {
            respuesta.message = "no existen Usuarios por el momento";
            return res.json(respuesta)
        }

        respuesta.success = true;
        respuesta.message = "Usuarios obtenidos exitosamente!";
        respuesta["data"] = usuarios;
        return res.json(respuesta)
    },
    
};

