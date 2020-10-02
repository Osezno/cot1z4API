/**
 * SesionesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const general = require("../helpers/general");
const cat = require("../helpers/catalogs");
const invalid = require("../helpers/validations");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
            // cambiar a process.env.SECRET
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
                uuid: u.uuid
            };

            return res.json(respuesta);


        },
        logout: async (req, res) => {

            const { uuid } = req.body
            let respuesta = { ...cat.resMessage }

            if (!uuid) return res.json(respuesta)

            await Usuarios.update({ uuid: uuid }).set({ ses_id: null }).meta({ schemaName: 'cot' });
            respuesta.success = true;
            respuesta.message = cat.success.logout;
            return res.json(respuesta);

        },
        forgotPassword: async (req, res) => {
            const { email } = req.body
            let respuesta = { ...cat.resMessage }
            if (!email) return res.json(respuesta)

            if(invalid.checkEmail(email)){
                respuesta.message = cat.errors.mail
                return  res.json(respuesta)
            } 
            // crear un nuevo session temp
            let user = await general.checkUser(email)
            
            if(!user){
                respuesta.message = cat.errors.noUser
                return res.json(respuesta)
            }

            let tmp_id = await general.genId()
            // cambiar a process.env.SECRET
            let token = await crearToken(tmp_id, req.secret, "1d")
            //hacer un token jwt?
            await Usuarios.update({ email: email }).set({ tmp_password: tmp_id }).meta({ schemaName: 'cot' });
           
            
            url = general.recoveryUrl(token, user.uuid)

            let mailObj={
                maincolor:cat.mainColor,
                url: url,
                name: user.nombre,
                domain:cat.domain,
                slogan:cat.slogan,
                logo:cat.logo
            }
            
            general.sendMail("forgotPwd", mailObj, email, "Recupérar contraseña 2").then((send)=>{
                if(send){
                    respuesta.success = true
                    respuesta.message = cat.success.emailSend
                    return  res.json(respuesta)
                }else{
                    respuesta.message = cat.errors.serverError
                    return  res.json(respuesta)
                }
            })
            //enviar correo con liga
        },
        changePassword: async(req, res)=>{
            const { token, uuid, password } = req.body
            let respuesta = { ...cat.resMessage }
            if (!token ||  !uuid  ||  !password ) return res.json(respuesta)
            
            if(invalid.checkPassword(password)){
                respuesta.message = cat.errors.passwordReq
                return  res.json(respuesta)
            }
            
            let u = await general.checkUserById(uuid)
            
            if(!u){
                respuesta.message = cat.errors.noUser
                return res.json(respuesta)
            }

            let session = await jwt.verify(token, req.secret)
            
            if(u.tmp_password != session.id){
                respuesta.message = cat.errors.recovery
                return res.json(respuesta)
            }

            bcrypt.hash(password, 10, async (err, hash) => {
                // Store hash in your password DB.
                let usuario = await Usuarios.update({ uuid: uuid }).set({ password: hash}).meta({ schemaName: 'cot' });
                respuesta.success = true;
                respuesta.message = cat.success.recovery;              
                return res.json(respuesta)

            });

        }
        //hacer para admin un registro de pago de usuarios
    };

