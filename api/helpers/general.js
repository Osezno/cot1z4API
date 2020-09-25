const jwt = require('jsonwebtoken');
const cat = require("./catalogs");

module.exports = {

    friendlyName: 'Funciones generales',
    description: 'Empezando por cosas relacionadas a sesion',
    fn: function () {

    },
    //SESIÓNES
    genId: () => {
        let x = Math.random().toString(36)
        return x
    },
    // checkSession: async (token, uuid, rol) => {
    //     let respuesta = { ...cat.resMessage }
        
    //     let user = await Usuarios.findOne({
    //         id: uuid
    //     }).meta({ schemaName: 'cot' });


    //     const session = await jwt.verify(token, sails.config.session.secret)

    //     if (!user) {
    //         respuesta.message = cat.errors.noUser;
    //         return respuesta
    //     }

    //     if (user.ses_id != session.id) {
    //         respuesta.message = cat.errors.session;
    //         return respuesta
    //     }
    //     if (rol.includes(user.id_rol)) {
    //         respuesta.success = true
    //         respuesta.data = user
    //         respuesta.message = cat.success.verified
    //         return respuesta
    //     } else {
    //         respuesta.message = cat.errors.denied;
    //         return respuesta
    //     }
    // },
    checkUser: async (email) => {
        let user = await Usuarios.findOne({
            email: email
        }).meta({ schemaName: 'cot' });

        return user
    },
    checkUserById: async (id) =>  {
        let user = await Usuarios.findOne({
            id: id
        }).meta({ schemaName: 'cot' });

        return user
    },


};