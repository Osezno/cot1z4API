/**
 * UsuariosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Usuarios = require("../models/Usuarios")

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
            log.info(respuesta.mensaje);
            return res.json(respuesta);
        }

        let username = req.body.nombre;
        let password = req.body.password;
        let email = req.body.email;
        let telefono = req.body.telefono;
        let rol = req.body.id_rol;
        let estatus = req.body.id_estatus;

        let re_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let re_pass = /^[a-zA-Z0-9_\-\$\*\¡\!]+$/;

        //puede ser un helpers estos
        const checkNull = (x) => {
            if (typeof x === 'undefined' || x === null || x === '') {
                return true;
            }
            else {
                return false
            }
        }

        const checkLength = (x, minus, max) => {
            if (typeof x.length < minus || x.length > max) {
                return true;
            }
            else {
                return false
            }
        }

        if (checkNull(username) || checkLength(username, 2, 50)) {
            respuesta.mensaje = "El usuario es incorrecto";
            sails.log(respuesta.mensaje);
            return res.json(respuesta);
        }

        if (checkNull(password) || re_pass.test(password) == false || checkLength(password, 8, 30)) {
            respuesta.mensaje = "La contraseña es incorrecta";
            sails.log(respuesta.mensaje);
            return res.json(respuesta);
        }

        if (checkNull(email) || !re_email.test(email) || checkLength(email, 5, 100)) {
            respuesta.mensaje = "El email es incorrecto";
            sails.log(respuesta.mensaje);
            return res.json(respuesta);
        }

        // check user and email
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
            let usuario = await Usuarios.create(
                Object.assign({
                    id_rol: rol,
                    id_estatus: estatus,
                    nombre: username,
                    email: email,
                    password: password,
                    fotografia: foto,
                    telefono: telefono,
                })).meta({ schemaName: 'cot' });
            //return exits.success(respuesta);
            respuesta.correcto = true;
            repuesta.mensaje = "Usuario creado";
            respuesta.input = usuario;
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
    login: function (req, res) {

        var r = {
            correcto: false,
            mensaje: "Faltan datos"
        };

        if (!req.body.hasOwnProperty("username") ||
            !req.body.hasOwnProperty("password")) {
            log.info(respuesta.mensaje);
            return res.json(r);
        }

        var username = req.body.username;
        var password = req.body.password;

        var re_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var re_pass = /^[a-zA-Z0-9_\-\$\*\¡\!]+$/;

        if (typeof username === 'undefined' || username === null || username === '' ||
            re_email.test(username) == false || username.length < 5 || username.length > 50) {
            r.mensaje = "El usuario es incorrecto";
            log.info(r.mensaje);
            return res.json(r);
        }
        else if (typeof password === 'undefined' || password === null || password === '' ||
            re_pass.test(password) == false || username.length < 8 || username.length > 100) {
            r.mensaje = "La contraseña es incorrecta";
            log.info(r.mensaje);
            return res.json(r);
        }

        // Usuarios.query("SELECT * FROM hgc.login_adm($1,$2);", [username,password], function(err, results){

        // 	if (err) {
        // 		sails.log.error(err);
        // 		r.mensaje = "Error: La sesión no fue iniciada";
        // 		log.info(r.mensaje);
        // 		return res.json(r);
        // 	}

        // 	r.correcto = results.rows[0].correcto;
        // 	r.mensaje = results.rows[0].mensaje;

        // 	log.info(r.mensaje);

        // 	if (r.correcto) {

        // 		var ses_cd = results.rows[0].ses_cd;
        // 		var usr_cd = results.rows[0].usr_cd;

        // 		res.cookie("ses_cd", ses_cd, {maxAge: 86400000, httpOnly: true});
        // 		res.cookie("usr_cd", usr_cd, {maxAge: 86400000, httpOnly: true});
        // 	}

        // 	return res.json(r);
        // });
    },

    logout: function (req, res) {

        var r = {
            correcto: false,
            mensaje: "Faltan datos"
        };

        var ses_cd = req.cookies.ses_cd;
        var usr_cd = req.cookies.usr_cd;

        res.clearCookie("ses_cd");
        res.clearCookie("usr_cd");

        // Usuarios.query("SELECT * FROM hgc.logout_adm($1,$2);", [ses_cd,usr_cd], function(err, results){

        // 	if (err) {
        // 		sails.log.error(err);
        // 		r.mensaje = "Error: La sesión no fue cerrada";
        // 		log.info(r.mensaje);
        // 		return res.json(r);
        // 	}

        // 	r.correcto = results.rows[0].correcto;
        // 	r.mensaje = results.rows[0].mensaje;

        // 	log.info(r.mensaje);

        // 	return res.json(r);
        // });
    },

};

