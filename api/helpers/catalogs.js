module.exports = {
    
    friendlyName: 'catalogos',
    description: 'Objetos Arrays y variables',
    fn: function () {

    },
    
    logo:"goodCode.png",
    slogan:"Lorem ipsum Dolor Amet",
    domain:"https://localhost:3000/",
    mainColor:"#3498db",
    resMessage: { 
        success: false, 
        message: "Faltan datos" 
    },
    errors:{
        default:"Faltan datos",
        mail:"El email es incorrecto",
        mailUnavalible:"El email ya existe en nuestra base de datos",
        password:"El Password es incorrecto",
        passwordReq:"El Password no es seguro",
        name:"Nombre incorrecto",
        //for login password?
        noUser:"El Usuario no existe en el sistema",
        session:"Sesión invalida",
        denied:"Permisos insuficientes",
        estatus:"Tu cuenta esta desabilitada",
        recovery:"Tu token expiro o es incorrecto",
        serverError:"Estamos experimentando problemas, nuestros tecnicos estan trabajando para resolverlos."
    },
    success:{
        userUpdated:"¡Usuario actualizado exitosamente!",
        login:"Sesión exitosa...",
        verified:"Sesión verificada...",
        logout:"Sesión cerrada.",
        recovery:"Contraseña actualizada.",
        emailSend:"¡Correo enviado! revisa tu bandeja de entrada."
    },
    rol:{
         admin:[1],
         manager:[1,2],
         associate:[1,2,3],
    },

    estatus:{
        activo:2,
        pendiente:3,
        suspendido:4,
        elminiado:5,
    },
};