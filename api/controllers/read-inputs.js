module.exports = {


    friendlyName: 'Controller de GET REQUEST de Prueba',

    description: 'Obtiene Inputs',
  
    inputs: {
        
    },


    exits: {

        success: {
            description: 'Se obtuvieron Inputs.'
        },

    },


    fn: async function (inputs, exits) {
       
       
            var inputs = await Inputs.find().meta({ schemaName: 'test' });

            return exits.success({ correcto: true, data: inputs, mensaje: "lista de Inputs obtenidas" });
          
        


    }


};
