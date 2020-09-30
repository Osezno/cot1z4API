/**
 * SesionesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const general = require("../helpers/general");
const cat = require("../helpers/catalogs");
const jwt = require('jsonwebtoken');

crearToken = (id, secreta, expiracion) => {
    return jwt.sign({ id }, secreta, { expiresIn: expiracion })
},

    module.exports = {
        
        login: async (req, res) => {
            const { email } = req.body
            let respuesta = { ...cat.resMessage }
            // crear un nuevo session id para el usuario y actualizarlo 
            let ses_id = await general.genId()
            // crear token 
            let token = await crearToken(ses_id, req.secret, "365d")
            // actualizar el id de sesion en el usuario
            let u = await Usuarios.updateOne({ email: email })
                .set({ ses_id: ses_id }).meta({ schemaName: 'cot' });
            // send sesion to the front
            respuesta.success = true;
            respuesta.message = cat.success.login;
            respuesta["data"] = {
                token: token,
                onboard: u.onboard,
                id_rol: u.id_rol,
                id_estatus: u.id_estatus,
                uuid: u.id
            };

            return res.json(respuesta);


        },
        logout: async (req, res) => {

            const { uuid } = req.body
            let respuesta = { ...cat.resMessage }

            if (!uuid) return res.json(respuesta)

            let u = await Usuarios.update({ id: uuid }).set({ ses_id: null }).meta({ schemaName: 'cot' });
            respuesta.success = true;
            respuesta.message = cat.success.logout;
            return res.json(respuesta);

        },
        forgotPassword: async (req, res) => {

        }
        //revisar si las policies pueden llevar argumentos

        //forgot password
        //hacer para admin un registro de pago de usuarios
    };

