// policies/checkSession.js

const cat = require("../helpers/catalogs");
const bcrypt = require('bcryptjs');
const invalid = require("../helpers/validations");
const general = require("../helpers/general");

module.exports = async function (req, res, proceed) {

    const { email, password } = req.body

    let respuesta = { ...cat.resMessage }
    //verify data
    if (!email || !password) {
        return res.json(respuesta);
    }
    else if (invalid.checkEmail(email)) {
        respuesta.message = cat.errors.email;
        return res.json(respuesta);
    }
    else if (invalid.checkPassword(password)) {
        respuesta.message = cat.errors.password;
        return res.json(respuesta);
    }

    let userExists = await general.checkUser(email)

    if (!userExists) {
        respuesta.message = cat.errors.noUser;
        return res.json(respuesta);
    }
    //if(email === "test@test.com")  return proceed();
    let match = await bcrypt.compare(password, userExists.password)

    if (match) {
        return proceed();
    }else{
        respuesta.message = cat.errors.password;
        return res.json(respuesta);
    }
    // verify user
}