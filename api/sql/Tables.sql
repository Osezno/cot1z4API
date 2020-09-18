CREATE SCHEMA cot;

/*para prueba*/
-- CREATE TABLE cot.inputs(
--   "createdAt"     TIMESTAMP NOT NULL,
--   "updatedAt"     TIMESTAMP NOT NULL,
--    id             SERIAL PRIMARY KEY,
--    status         TEXT NOT NULL ,
--    mensaje    TEXT NOT NULL
-- );

CREATE TABLE cot.sesiones (
  idsesion                  SERIAL PRIMARY KEY,
  id_estatus                INTEGER REFERENCES cot.estatus(idcat_estatus) NOT NULL,
  idusuario                 INTEGER REFERENCES cot.usuarios(idusuario),
  clave                     TEXT NOT NULL UNIQUE,
  fecha_real                TIMESTAMP NOT NULL,
  fecha_actualizacion       TIMESTAMP NOT NULL,
  idusuario_actualizacion   INTEGER REFERENCES cot.usuarios(idusuario)
);
-- //revisar formas optimas de manejar las sesiones

CREATE TABLE cot.roles(
  "createdAt"     TIMESTAMP NOT NULL,
  "updatedAt"     TIMESTAMP NOT NULL,
   id             SERIAL PRIMARY KEY,
   codigo         TEXT NOT NULL UNIQUE,
   descripcion    TEXT NOT NULL
);

CREATE TABLE cot.usuarios (
    "createdAt"               bigint NOT NULL,
    "updatedAt"               bigint NOT NULL,
    id                        SERIAL PRIMARY KEY,
    id_rol                    INTEGER REFERENCES cot.roles(id) NOT NULL,
    nombre                    TEXT NOT NULL,
    email                     TEXT NOT NULL,
    password                  TEXT NOT NULL,
    fotografia                             ,
    telefono                               ,
    intereses                              ,
);



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
