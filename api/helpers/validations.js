

module.exports = {
   
    friendlyName: 'Validacion de formularios',
    description: 'Revisar valores vacios.',
    fn: function () {

    },
    checkNull: function (x) {
        if (typeof x === 'undefined' || x === null || x === '') {
            return true;
        }
        else {
            return false
        }
    },
    checkLength:function (x, minus, max) {

        if ( x.length < minus || x.length > max) {
            return true;
            //return exits.success(result);
        }
        else {
            return false
            //return exits.success(result);
        }
    },
    checkPassword: function (password) {
        let re_pass = new RegExp(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&amp;*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
        
        if (!re_pass.test(password) ||
            this.checkLength(password, 8, 30) ||
            this.checkNull(password)) {
            return true;
        }
        else { return false }
    },
    checkNumber: function (x, minus, max){
        if ( x.length < minus || x.length > max) return true; 
        else return false
    },
    checkEmail:function (email) {
        
        let re_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!re_email.test(email) ||
            this.checkLength(email, 5, 100) ||
            this.checkNull(email)
        ) {
            return true;
        }
        else { return false }
    },
    checkImage:function(image){
       //check null
       //check size
       //resize
       //return
    }
};