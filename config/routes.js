/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/404'
  },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
  //policy example 'get /panel/*'               : {policy: 'nocache'},



  //ABC DE USUARIOS
  'post /api/v1/nuevo-usuario'         : 'UsuariosController.nuevoUsuario',
  'post /api/v1/eliminar-usuario'      : 'UsuariosController.eliminarUsuario',
  'post /api/v1/editar-usuario'        : 'UsuariosController.editarUsuario',
  'get /api/v1/ver-usuario'            : 'UsuariosController.verUsuario',
  'get /api/v1/ver-usuarios'           : 'UsuariosController.verUsuarios',
   //MANEJAR SESIONES
  'post /api/v1/login'                 : 'SesionesController.login',
  'post /api/v1/logout'                : 'SesionesController.logout',
  'post /api/v1/forgot-password'       : 'SesionesController.forgotPassword',
  'post /api/v1/change-password'       : 'SesionesController.changePassword',
  //FUNCIONES DE USUARIO
  'post /api/v1/ver-perfil'           : 'UsuarioController.verPerfil',
  'post /api/v1/editar-perfil'        : 'UsuarioController.editarPerfil',
  'post /api/v1/actualizar-mi-foto'   : 'UsuarioController.updateProfilePic',
  'post /api/v1/add-notification'     : 'UsuarioController.notificationTest',
  //test first conection
  'POST  /api/v1/create-input': { action: 'create-input' },
  'GET   /api/v1/read-inputs': { action: 'read-inputs' }
   // si esta en una carpeta agregar { action: 'carpeta/read-inputs' }

  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
