/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  '*': 'checkAssociateSession',
  SesionesController: {
    'login': 'login',
    'forgotPassword':true,
    'changePassword':true,
  },
  UsuariosController: {
    'nuevoUsuario': 'checkAdminSession',
    'editarUsuario': 'checkManagerSession',
    'editarUsuarioFotografia': 'checkManagerSession',
    'eliminarUsuario': 'checkManagerSession',
    'verUsuarios': 'checkManagerSession',
  },
  UsuarioController: {
    'updateProfilePic': 'checkAssociateSession',
  }
  
};
