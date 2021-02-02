
const cat = require("./catalogs");
const firebase = sails.config.firebase
const storage = firebase.storage().bucket();
const realDB = firebase.database();


//const bcrypt = require('bcryptjs');
const fs = require('fs');
//const fetch = require('node-fetch');

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
        return `${cat.domain}recovery/${pwd}/${uuid}`
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
    FileUpload: (base64, imageId, user_id) => new Promise((res, rej) => {
        // check if base64 can be used
        if (!imageId) imageId = Math.random().toString(36)

        let buff = Buffer(base64.replace('data:image/png;base64,', ''), 'base64');
        fs.writeFileSync(`.tmp/public/${imageId}.png`, buff, (err) => {
            if (err) { console.log(err) }
        });
        
        storage.upload(`.tmp/public/${imageId}.png`,
            {
                destination: `${imageId}.png`,
                public: true,
            }).then(data => {
                // console.log('metadata=',data[0]['metadata'], data[0]['metadata']['mediaLink']);
                // console.log('metadata=', meta[0].mediaLink, data);
                res(data[0]['metadata']['mediaLink']);
            }).catch(err => {
                res(false);
                console.log('error uploading to storage', err);
            });
        // fs.readFile(`.tmp/public/${imageId}.png`, (err, buffer) =>{
        //     console.log(buffer); 
        //     let arraybuffer = Uint8Array.from(buffer).buffer;
        //     console.log(arraybuffer)
        //     if (err) {
        //         rej(false);
        // }

 
        // ¿llevar un registro de archivos por usuario?


    }),
    addNotification: (user_id, notification) => {

        let notificaciones = realDB.ref(`/${user_id}/`)

        //revisar si ya existen notificaciones
        //que solo haya maximo 3 vistas

        notificaciones.once("value", function (snapshot) {

            let data = snapshot.val()

            if (data && data.notificaciones) {
                new_val = [...data.notificaciones, { mensaje: "test", url: '', creado: Date.now(), visto: false }]

                notificaciones.set({ notificaciones: new_val });
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