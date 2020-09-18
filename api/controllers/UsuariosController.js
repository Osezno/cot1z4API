/**
 * UsuariosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//UTILS
const invalid = require("../helpers/validations");

const resMessage = { success: false, message: "Faltan datos" };

const validate = (data) => {
    const { nombre, password, email, telefono, id_rol, id_estatus } = data;
    if (!id_rol || !id_estatus || !nombre || !email || !password || !telefono) {
        return { error: true, message: resMessage.message }
    }

    if (invalid.checkNull(nombre) ||
        invalid.checkLength(nombre, 2, 50)) {
        return { error: true, message: "El usuario es incorrecto" }
    }

    if (invalid.checkPassword(password)) {
        return { error: true, message: "La contraseña es incorrecta" }
    }

    if (invalid.checkEmail(email)) {
        return { error: true, message: "El email es incorrecto" }
    }

    return { error: false }
}

module.exports = {
    nuevoUsuario: async  (req, res) => {
        let respuesta = { ...resMessage }
        let v = await validate(req.body)
        sails.log(v)
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
            let usuario = await Usuarios.create(
                Object.assign({
                    id_rol: id_rol,
                    id_estatus: id_estatus,
                    nombre: nombre,
                    email: email,
                    password: password,
                    fotografia: fotografia || foto,
                    telefono: telefono,
                })).meta({ schemaName: 'cot' });

            respuesta.success = true;
            respuesta.message = "Usuario creado";
            respuesta["data"] = usuario;
            return res.json(respuesta)
        } else {
            respuesta.message = "El email ya existe en nuestra base de datos";
            return res.json(respuesta);
        }
    },
    eliminarUsuario: async (req, res) =>{
        let respuesta = { ...resMessage }

        const { uuid } = req.body;
        if (!uuid) {
            return { error: true, message: respuestas }
        }

        let userExists = await Usuarios.findOne({
            id: uuid
        }).meta({ schemaName: 'cot' });

        if (!userExists) {
            respuesta.message = "El usuario no existe";
            return res.json(respuesta);
        } else {
            let usuarioEliminado = await Usuarios.destroyOne({
                id: uuid
            }).meta({ schemaName: 'cot' });

            respuesta.success = true;
            respuesta.message = "Usuario eliminado exitosamente!";
            respuesta["data"] = usuarioEliminado;
            return res.json(respuesta)
        }
    },
    editarUsuario: async (req, res) => {
        let respuesta = { ...resMessage }
        let v = await validate(req.body)

        if (v.error) {
            respuesta.message = v.message;
            return res.json(respuesta)
        }

        const { uuid } = req.body;
        if (!uuid) {
            return res.json(respuesta)
        }

        let userExists = await Usuarios.findOne({
            id: uuid
        }).meta({ schemaName: 'cot' });

        if (!userExists) {
            respuesta.message = "El usuario no existe";
            sails.log(respuesta.message);
            return res.json(respuesta);
        } else {
            const { nombre, fotografia, password, email, telefono, id_rol, id_estatus } = req.body;

            ////hacer un hash de la password
            let usuario = await Usuario.updateOne({ id: uuid })
                .set({
                    id_rol: id_rol,
                    id_estatus: id_estatus,
                    nombre: nombre,
                    email: email,
                    password: password,
                    fotografia: foto,
                    telefono: telefono,
                })

            respuesta.success = true;
            respuesta.message = "Usuario editado exitosamente!";
            respuesta["data"] = usuario;
            return res.json(respuesta)
        }
    },
    verUsuario: async(req, res)=> {
        let respuesta = { ...resMessage }

        const { uuid } = req.body;
        if (!uuid) {
            return res.json(respuesta)
        }

        let userExists = await Usuarios.findOne({
            id: uuid
        }).meta({ schemaName: 'cot' });

        if (!userExists) {
            respuesta.message = "Usuario no encontrado!";
            return res.json(respuesta)
        } else {
            respuesta.success = true;
            respuesta.message = "Usuario obtenido exitosamente!";
            respuesta["data"] = userExists;
            return res.json(respuesta)
        }

    },
    verUsuarios:async (req, res) => {
        //que validacion necesitas para este?
        let respuesta = { ...resMessage }

        let usuarios = Usuarios.find({}).meta({ schemaName: 'cot' });
        
        if(!usuarios){
            respuesta.message = "no existen Usuarios por el momento";
            return res.json(respuesta)
        }

        respuesta.success = true;
        respuesta.message = "Usuarios obtenidos exitosamente!";
        respuesta["data"] = usuarios;
        return res.json(respuesta)
    },
};

