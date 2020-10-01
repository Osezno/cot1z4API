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
    checkUserById: async (id) => {
        let user = await Usuarios.findOne({
            id: id
        }).meta({ schemaName: 'cot' });

        return user
    },
    recoveryUrl: (pwd, uuid) => {
        //volver el link una variable
        return `https://localhost:3000/recovery?tmp=${pwd}&id=${uuid}`
    },
    sendMail:(template, obj, email, subj) => new Promise(resolve => {
        sails.hooks.email.send(
            template,
            obj,
            {
                to: email,
                subject: subj
            },
            (err) => {
                console.log(err)
                if(err) resolve(false)
                else resolve(true)
            }
        )
    }) ,
};