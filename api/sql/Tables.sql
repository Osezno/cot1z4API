CREATE SCHEMA cot;

/*para prueba*/
-- CREATE TABLE cot.inputs(
--   "createdAt"     TIMESTAMP NOT NULL,
--   "updatedAt"     TIMESTAMP NOT NULL,
--    id             SERIAL PRIMARY KEY,
--    status         TEXT NOT NULL ,
--    mensaje    TEXT NOT NULL
-- );


--ABC DE USUARIOS
DROP TABLE IF EXISTS cot.roles;
CREATE TABLE cot.roles(
  "createdAt"     TIMESTAMP NOT NULL,
  "updatedAt"     TIMESTAMP NOT NULL,
   id             SERIAL PRIMARY KEY,
   codigo         TEXT NOT NULL UNIQUE,
   descripcion    TEXT NOT NULL
);

DROP TABLE IF EXISTS cot.estatus;
CREATE TABLE cot.estatus(
  "createdAt"     TIMESTAMP NOT NULL,
  "updatedAt"     TIMESTAMP NOT NULL,
   id             SERIAL PRIMARY KEY,
   codigo         TEXT NOT NULL UNIQUE,
   descripcion    TEXT NOT NULL
);

DROP TABLE IF EXISTS cot.usuarios;
CREATE TABLE cot.usuarios (
    "createdAt"               TIMESTAMP NOT NULL,
    "updatedAt"               TIMESTAMP NOT NULL,
    id                        SERIAL PRIMARY KEY,
    id_rol                    INTEGER REFERENCES cot.roles(id) NOT NULL,
    id_estatus                INTEGER REFERENCES cot.estatus(id) NOT NULL,
    nombre                    TEXT NOT NULL,
    email                     TEXT NOT NULL,
    password                  TEXT NOT NULL,
    tmp_password              TEXT
    fotografia                TEXT NOT NULL,
    telefono                  TEXT NOT NULL,
    onboard                   BOOLEAN NOT NULL,
    ses_id                    TEXT,
);

-- estos se hacen desde que se crea el usuario
DROP TABLE IF EXISTS cot.subscripcion;
CREATE TABLE cot.subscripcion(
   id_usr          INTEGER REFERENCES cot.usuarios(id) NOT NULL,
   ultimo_pago     TIMESTAMP NOT NULL,
   fecha_de_exp    TIMESTAMP NOT NULL,
   cuenta_tmp      BOOLEAN NOT NULL,
)
--revisar si es necesario notificiaciones con mongo o realtime
DROP TABLE IF EXISTS cot.notificaciones;
CREATE TABLE cot.notificaciones (
   id_usr          INTEGER REFERENCES cot.usuarios(id) NOT NULL,
   ultimo_pago     TIMESTAMP NOT NULL,
   fecha_de_exp    TIMESTAMP NOT NULL,
   cuenta_tmp      BOOLEAN NOT NULL,
)

--sera necesario saber el tiempo que pasan en la plataforma?
--ABC DE USUARIOS


-- basicos

CREATE TABLE cot.servicios (
    "createdAt"               bigint NOT NULL,
    "updatedAt"               bigint NOT NULL,
    id                        SERIAL PRIMARY KEY,
    idusuario                 INTEGER REFERENCES cot.usuarios(idusuario),
    idstars                   INTEGER REFERENCES cot.stars(idstars),
    idbien                    INTEGER REFERENCES cot.bien(idbien),
);


CREATE TABLE cot.productos (
    "createdAt"               bigint NOT NULL,
    "updatedAt"               bigint NOT NULL,
    id                        SERIAL PRIMARY KEY,
    idusuario                 INTEGER REFERENCES cot.usuarios(idusuario),
    servicio                  BOOLEAN NOT NULL,
    producto                  BOOLEAN NOT NULL,
    descripcion               TEXT NOT NULL,
    fotografia                             ,
    estaus                                 ,
    idvalor                   INTEGER REFERENCES cot.unidades_de_valor(idvalor)
);

CREATE TABLE cot.empresas (
    "createdAt"               bigint NOT NULL,
    "updatedAt"               bigint NOT NULL,
    id                        SERIAL PRIMARY KEY,
    idusuario                 INTEGER REFERENCES cot.usuarios(idusuario),
    idstars                   INTEGER REFERENCES cot.stars(idstars),
    idbien                    INTEGER REFERENCES cot.bien(idbien),
);

CREATE TABLE cot.clienres (
    "createdAt"               bigint NOT NULL,
    "updatedAt"               bigint NOT NULL,
    id                        SERIAL PRIMARY KEY,
    idusuario                 INTEGER REFERENCES cot.usuarios(idusuario),
    idstars                   INTEGER REFERENCES cot.stars(idstars),
    idbien                    INTEGER REFERENCES cot.bien(idbien),
);

--practicos
CREATE TABLE cot.templates (
    "createdAt"               bigint NOT NULL,
    "updatedAt"               bigint NOT NULL,
    id                        SERIAL PRIMARY KEY,
    nombre                    TEXT NOT NULL,
    descripcion               TEXT NOT NULL,
    fotografia                             ,
);

CREATE TABLE cot.cotizaciones (
    "createdAt"               bigint NOT NULL,
    "updatedAt"               bigint NOT NULL,
    id                        SERIAL PRIMARY KEY,
    nombre                    TEXT NOT NULL,
    codigo                    TEXT NOT NULL UNIQUE,
    descripcion               TEXT NOT NULL,
);
--expedidas


-- que mas?
--catalogos para las cotizaciones


-- CREATE TABLE cot.reportes (
--     "createdAt"               bigint NOT NULL,
--     "updatedAt"               bigint NOT NULL,
--     id                        SERIAL PRIMARY KEY,
--     numero_de_estrellas       INTEGER
-- );

-- ///como se manejara el rating
