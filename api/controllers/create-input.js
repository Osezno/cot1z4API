module.exports = {


    friendlyName: 'Controller de POST REQUEST de Prueba',

    description: 'Crea un input',

    inputs: {
        mensaje: {
            type: 'string',
            required: true,
            maxLength: 100,
        },
    },


    exits: {

        success: {
            description: 'Se creo input'
        },

    },


    fn: async function (inputs, exits) {
        var mensaje = inputs.mensaje;
        if (typeof mensaje !== "undefined") {
          
            var input = await Inputs.create(Object.assign({ status: 'activo', mensaje: mensaje })).meta({ schemaName: 'tq' });
            return exits.success({ correcto: true, data: input, mensaje: "Input creado exitosamente" });
        }
        else {
            return exits.success({ correcto: false, data: null, mensaje: "Input no pudo realizarse" });
        }
    }


};
