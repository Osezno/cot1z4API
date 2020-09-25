module.exports = {
    
    friendlyName: 'catalogos',
    description: 'Objetos Arrays y variables',
    fn: function () {

    },
    resMessage: { 
        success: false, 
        message: "Faltan datos" 
    },
    errors:{
        mail:"El email es incorrecto",
        mailUnavalible:"El email ya existe en nuestra base de datos",
        password:"El Password es incorrecto",
        name:"Nombre incorrecto",
        //for login password?
        noUser:"El Usuario no existe en el sistema",
        session:"Sesión invalida",
        denied:"Permisos insuficientes",
        estatus:"tu cuenta esta desabilitada"
    },
    success:{
        login:"sesión exitosa",
        verified:"sesión verificada",
        logout:"sesión cerrada"
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