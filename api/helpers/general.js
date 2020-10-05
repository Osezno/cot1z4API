
const cat = require("./catalogs");
const firebase = sails.config.firebase
const storage = firebase.storage();
const realDB = firebase.database();
const bcrypt = require('bcryptjs');

module.exports = {

    friendlyName: 'Funciones generales',
    description: 'Empezando por cosas relacionadas a sesion',
    fn: function () {

    },
    genId: function () {
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
            uuid: id
        }).meta({ schemaName: 'cot' });

        return user
    },
    recoveryUrl: (pwd, uuid) => {
        //volver el link una variable
        return `${cat.domain}recovery?tmp=${pwd}&id=${uuid}`
    },
    sendMail: (template, obj, email, subj) => new Promise(resolve => {
        sails.hooks.email.send(
            template,
            obj,
            {
                to: email,
                subject: subj
            },
            (err) => {
                console.log(err)
                if (err) resolve(false)
                else resolve(true)
            }
        )
    }),
    FileUpload: (blob, imageId, user_id) => new Promise(res => {
        // ¿llevar un registro de archivos por usuario?
        if (!imageId) imageId = Math.random().toString(36)
        upload = storage.ref(`assets/img/${imageId}`).put(blob)
        upload.on('state_changed', snapshot => {
            console.log("entra")
        }, error => {
            console.log('error', error);
        }, () => {
            upload.snapshot.ref.getDownloadURL().then(url => {
                res(url);
            });
        });
    }),
    addNotification: (user_id, notification) => {

        let notificaciones = realDB.ref(`/${user_id}/`)

        //revisar si ya existen notificaciones
        //que solo haya maximo 3 vistas
        
        notificaciones.once("value", function (snapshot) {
            
            let data = snapshot.val()
            
            if (data && data.notificaciones) {
                new_val = [...data.notificaciones, { mensaje: "test", url: '', creado: Date.now(), visto: false }]

                
                console.log("test",new_val)
                notificaciones.set({notificaciones:new_val});
            } else {
                notificaciones.update({
                    notificaciones: [
                        { mensaje: "test", url: '', creado: Date.now(), visto: false },
                        { mensaje: "test", url: '', creado: Date.now(), visto: false },
                        { mensaje: "test", url: '', creado: Date.now(), visto: false }]
                });
            }
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });




        // get notificacions
        // updated_them
        // check the transaction so no notification its erased          
    }

};