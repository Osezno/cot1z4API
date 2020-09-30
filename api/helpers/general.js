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