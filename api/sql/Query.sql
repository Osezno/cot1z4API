--init values
INSERT INTO cot.estatus ("createdAt", "updatedAt", codigo, descripcion) VALUES ( now(), now(),'Activo','Indica que un usuario esta activo para mantener actividad dentro de la aplicación');
INSERT INTO cot.estatus ("createdAt", "updatedAt", codigo, descripcion) VALUES (now(), now(),'Pendiente', 'Indica que un usuario aun no se confirma para mantener actividad dentro de la aplicación');
INSERT INTO cot.estatus ("createdAt", "updatedAt", codigo, descripcion) VALUES (now(), now(),'Suspendido', 'Indica que un usuario no está activo para mantener actividad dentro de la aplicación');
INSERT INTO cot.estatus ("createdAt", "updatedAt", codigo, descripcion) VALUES (now(), now(),'Eliminado', 'El usuario no puede volver a activarse bajo este estado');

INSERT INTO cot.roles ("createdAt", "updatedAt", codigo, descripcion) VALUES (now(), now(),'Administrador', 'Usuario con el mas alto nivel de privilegios');
INSERT INTO cot.roles ("createdAt", "updatedAt", codigo, descripcion) VALUES (now(), now(),'Usuario', 'Usuario con privilegios de interacción en la aplicación');
INSERT INTO cot.roles ("createdAt", "updatedAt", codigo, descripcion) VALUES (now(), now(),'Empleado','Usuario con privilegios menores en una unidad');


INSERT INTO cot.usuarios (idcat_estatus, idcat_rol, clave, email, alias, password, fecha_real, fecha_actualizacion) VALUES (1, 2, md5(extract(epoch from clock_timestamp())::TEXT), 'soporte@soevii.com', 'soporte', md5('root'), now(), now());


update cot.usuarios SET onboard = False  WHERE id = 1;

ALTER TABLE cot.usuarios ADD onboard  BOOLEAN NOT NULL;
ALTER TABLE cot.usuarios ADD tmp_password   TEXT;

