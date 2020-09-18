/**
 * SesionesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
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

