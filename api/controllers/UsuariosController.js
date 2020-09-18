/**
 * UsuariosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


const Valid = require("../helpers/validations");

module.exports = {

    nuevoUsuario: async function (req, res) {
        //buscar si es un admin quien lo agrega
        //O si se esta registrando solo

        let respuesta = {
            correcto: false,
            mensaje: "Faltan datos"
        };

        if (!req.body.hasOwnProperty("id_rol") ||
            !req.body.hasOwnProperty("id_estatus") ||
            !req.body.hasOwnProperty("nombre") ||
            !req.body.hasOwnProperty("email") ||
            !req.body.hasOwnProperty("password") ||
            !req.body.hasOwnProperty("telefono")
        ) {
            sails.log(respuesta.mensaje);
            return res.json(respuesta);
        }

        let username = req.body.nombre;
        let password = req.body.password;
        let email = req.body.email;
        let telefono = req.body.telefono;
        let rol = req.body.id_rol;
        let estatus = req.body.id_estatus;

        if (Valid.checkNull(username) ||
            Valid.checkLength(username, 2, 50)) {
            respuesta.mensaje = "El usuario es incorrecto";
            sails.log(respuesta.mensaje);
            return res.json(respuesta);
        }

        if (Valid.checkPassword(password)) {
            respuesta.mensaje = "La contraseña es incorrecta";
            sails.log(respuesta.mensaje);
            return res.json(respuesta);
        }

        if (Valid.checkEmail(email)) {
            respuesta.mensaje = "El email es incorrecto";
            sails.log(respuesta.mensaje);
            return res.json(respuesta);
        }

        let u = await Usuarios.findOne({
            email: email
        });

        if (!u) {
            let foto;
            if (!req.body.hasOwnProperty("fotografia")) {
                foto = 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'
            }
            else {
                foto = req.body.hasOwnProperty("fotografia")
            }
            // hacer un hash de la password
            // let usuario = await Usuarios.create(
            //     Object.assign({
            //         id_rol: rol,
            //         id_estatus: estatus,
            //         nombre: username,
            //         email: email,
            //         password: password,
            //         fotografia: foto,
            //         telefono: telefono,
            //     })).meta({ schemaName: 'cot' });
            //return exits.success(respuesta);
            respuesta.correcto = true;
            repuesta.mensaje = "Usuario creado";
            respuesta["data"] = "usuario";
            res.json(respuesta)

        } else {
            respuesta.mensaje = "El email ya existe en nuestra base de datos";
            sails.log(respuesta.mensaje);
            return res.json(respuesta);
        }
    },
    eliminarUsuario: function (req, res) {

    },
    editarUsuario: function (req, res) {

    },
    verUsuario: function (req, res) {

    },
    verUsuarios: function (req, res) {

    },
};

