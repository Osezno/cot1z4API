/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//UTILS
const invalid = require("../helpers/validations");
const cat = require("../helpers/catalogs");
const general = require("../helpers/general");




module.exports = {
    verPerfil: async (req, res) => {
        let respuesta = { ...cat.resMessage }
        const { uuid } = req.body;

        if (!uuid) {
            return res.json(respuesta)
        }

        let userExists = await general.checkUserById(uuid)

        if (!userExists) {
            respuesta.message = cat.errors.noUser;
            return res.json(respuesta)
        } else {

            let u = {
                email: userExists.email,
                fotografia: userExists.fotografia,
                id_estatus: userExists.id_estatus,
                id_rol: userExists.id_rol,
                telefono: userExists.telefono,
                nombre: userExists.nombre,
                onboard: userExists.onboard,
            }

            respuesta.success = true;
            respuesta.message = "Usuario obtenido exitosamente!";
            respuesta["data"] = u;
            return res.json(respuesta)
        }
    },
    editarPerfil: async (req, res) => {
        const { uuid, email, nombre, telefono } = req.body;

        let respuesta = { ...cat.resMessage }

        if (!uuid || !email || !nombre || !telefono) return res.json(respuesta)

        let userExists = await general.checkUserById(uuid)

        if (!userExists) {
            respuesta.message = cat.errors.noUser;
            return res.json(respuesta)
        }

        let u = await Usuarios.updateOne({ uuid: uuid })
            .set({ email: email, nombre: nombre, telefono: telefono })
            .meta({ schemaName: 'cot' });

        respuesta.success = true
        respuesta.message = cat.success.userUpdated
        return res.json(respuesta)

    },
    onboard: async (req, res) => {
        const { uuid } = req.body;

        let respuesta = { ...cat.resMessage }

        if (!uuid) return res.json(respuesta)

        let userExists = await general.checkUserById(uuid)

        if (!userExists) {
            respuesta.message = cat.errors.noUser;
            return res.json(respuesta)
        }

        let u = await Usuarios.updateOne({ uuid: uuid })
            .set({ onboard: true })
            .meta({ schemaName: 'cot' });
        
        let user = {
            email: userExists.email,
            fotografia: userExists.fotografia,
            id_estatus: userExists.id_estatus,
            id_rol: userExists.id_rol,
            telefono: userExists.telefono,
            nombre: userExists.nombre,
            onboard: true,
        }

        respuesta.success = true
        respuesta.message = cat.success.userUpdated
        respuesta["data"] = user;
        return res.json(respuesta)

    },
    updateProfilePic: (req, res) => {
        const { uuid, email, fotografia, nombre, telefono } = req.body;

        // check size?
        let respuesta = { ...cat.resMessage }

        if (!uuid || !fotografia || !email || !nombre || !telefono) return res.json(respuesta)

        general.FileUpload(fotografia, "profile" + uuid).then(async (url) => {
            if (url) {
                let u = await Usuarios.updateOne({ uuid: uuid })
                    .set({ fotografia: url, email: email, nombre: nombre, telefono: telefono })
                    .meta({ schemaName: 'cot' });
                respuesta.success = true
                respuesta.message = cat.success.userUpdated
                return res.json(respuesta)
            } else {
                respuesta.message = cat.errors.serverError
                return res.json(respuesta)
            }
        }).catch(err => console.log(err))
    },
    notificationTest: (req, res) => {
        const { uuid } = req.body;
        let notification = general.addNotification(uuid)
        console.log(notification)
        return res.json({ test: "test" })
    }

};

