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

    updateProfilePic: (req, res) => {
        const { uuid, image } = req.body;
       
        let respuesta = { ...cat.resMessage }

        //if (!uuid || image) return res.json(respuesta)

        // if (!uuid != req.headers.uuid) {
        //     respuesta.message = cat.errors.denied
        //     return res.json(respuesta)
        // }

        let url = general.FileUpload(req.body)
        console.log(url)
        if (url) {
            Usuarios.updateOne({ id: uuid })
                .set({ fotografia: url })
                .meta({ schemaName: 'cot' });
            respuesta.success = true    
            respuesta.message = cat.success.userUpdated
            return res.json(respuesta)
        }else{
            respuesta.message = cat.errors.serverError
            return res.json(respuesta)
        }
    },
    notificationTest:(req,res)=>{
        const { uuid } = req.body;
        let notification = general.addNotification(uuid)
        console.log(notification)
        return res.json({test:"test"})
    }

};

