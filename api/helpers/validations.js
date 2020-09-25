

module.exports = {
   
    friendlyName: 'Validacion de formularios',
    description: 'Revisar valores vacios.',
    fn: function () {

    },
    checkNull: function (x) {
        sails.log("test", x)
        if (typeof x === 'undefined' || x === null || x === '') {
            return true;
            // return exits.success(true);
        }
        else {
            //return exits.success(false);
            return false
        }
    },
    checkLength: function (x, minus, max) {

        if (typeof x.length < minus || x.length > max) {
            sails.log(x)
            return true;
            //return exits.success(result);
        }
        else {
            return false
            //return exits.success(result);
        }
    },
    checkPassword: function (password) {
        let re_pass = /^[a-zA-Z0-9_\-\$\*\¡\!]+$/;
        if (!re_pass.test(password) ||
            this.checkLength(password, 8, 30) ||
            this.checkNull(password)) {
            return true;
        }
        else { return false }
    },
    checkNumber: function (x, minus, max) {
        if (typeof x.length < minus || x.length > max) {
            sails.log(x)
            return true; 
        }
        else {
            return false
        }
    },
    checkEmail: function (email) {
        let re_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re_email.test(email) ||
            this.checkLength(email, 5, 100) ||
            this.checkNull(email)
        ) {
            return true;
        }
        else { return false }
    }
};