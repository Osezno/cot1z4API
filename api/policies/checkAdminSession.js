// policies/checkSession.js
const jwt = require('jsonwebtoken');
const cat = require("../helpers/catalogs");

module.exports = async function (req, res, proceed){
    
    const { token, uuid,  } = req.headers
    
    let rol = cat.rol.admin

    let respuesta = { ...cat.resMessage }

    if(!token || !uuid)  return res.json(respuesta)
    //verify token
    // cambiar a process.env.SECRET
    const session = await jwt.verify(token, req.secret)
    // verify user
    let user = await Usuarios.findOne({
        id: uuid
    }).meta({ schemaName: 'cot' });

    console.log(user)
    //validate
    if( user && user.id_estatus === 2 && user.ses_id === session.id && rol.includes(user.id_rol)) return proceed();
    // find error
    if (!user) respuesta.message = cat.errors.noUser;
      
    if (user.ses_id != session.id) respuesta.message = cat.errors.session;
    
    if (user.id_estatus != 2) respuesta.message = cat.errors.estatus;

    if (!rol.includes(user.id_rol)) respuesta.message = cat.errors.denied;

    return res.json(respuesta)
}