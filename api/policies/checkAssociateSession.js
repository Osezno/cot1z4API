// policies/checkSession.js
const jwt = require('jsonwebtoken');
const cat = require("../helpers/catalogs");

module.exports = async function (req, res, proceed){
    
    const { authorization} = req.headers
    const { uuid } = req.body
    
    let token = authorization.split(" ")[1]

    let rol = cat.rol.associate

    let respuesta = { ...cat.resMessage }
    
    if(!token || !uuid)  return res.json(respuesta)
    //verify token
    // cambiar a process.env.SECRET
    let session;
    try{
        session = await jwt.verify(token, req.secret)
    }
    catch{
        respuesta.message = cat.errors.recovery
        return  res.json(respuesta)
    }
   
    // verify user
    let user = await Usuarios.findOne({
        uuid: uuid
    }).meta({ schemaName: 'cot' });
    //validate
    if( user &&  user.id_estatus === 2 && user.ses_id === session.id && rol.includes(user.id_rol)) return proceed();
    // find error
    if (!user) respuesta.message = cat.errors.noUser;
      
    if (user.ses_id != session.id) respuesta.message = cat.errors.session;
    
    if (user.id_estatus != 2) respuesta.message = cat.errors.estatus;

    if (!rol.includes(user.id_rol)) respuesta.message = cat.errors.denied;

    return res.json(respuesta)
}