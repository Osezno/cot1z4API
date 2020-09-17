CREATE SCHEMA tq;

/*para prueba*/
CREATE TABLE tq.inputs(
  "createdAt"     TIMESTAMP NOT NULL,
  "updatedAt"     TIMESTAMP NOT NULL,
   id             SERIAL PRIMARY KEY,
   status         TEXT NOT NULL ,
   mensaje    TEXT NOT NULL
);

CREATE TABLE tq.sesiones (
  idsesion                  SERIAL PRIMARY KEY,
  id_estatus                INTEGER REFERENCES tq.estatus(idcat_estatus) NOT NULL,
  idusuario                 INTEGER REFERENCES tq.usuarios(idusuario),
  clave                     TEXT NOT NULL UNIQUE,
  fecha_real                TIMESTAMP NOT NULL,
  fecha_actualizacion       TIMESTAMP NOT NULL,
  idusuario_actualizacion   INTEGER REFERENCES tq.usuarios(idusuario)
);
-- //revisar formas optimas de manejar las sesiones

CREATE TABLE tq.roles(
  "createdAt"     TIMESTAMP NOT NULL,
  "updatedAt"     TIMESTAMP NOT NULL,
   id             SERIAL PRIMARY KEY,
   codigo         TEXT NOT NULL UNIQUE,
   descripcion    TEXT NOT NULL
);

CREATE TABLE tq.usuarios (
    "createdAt"               bigint NOT NULL,
    "updatedAt"               bigint NOT NULL,
    id                        SERIAL PRIMARY KEY,
    id_rol                    INTEGER REFERENCES tq.roles(id) NOT NULL,
    nombre                    TEXT NOT NULL,
    email                     TEXT NOT NULL,
    password                  TEXT NOT NULL,
    fotografia                             ,
    telefono                               ,
    intereses                              ,
);

CREATE TABLE tq.intereses (
    "createdAt"               bigint NOT NULL,
    "updatedAt"               bigint NOT NULL,
    id                        SERIAL PRIMARY KEY,
    nombre                    TEXT NOT NULL,
    descripcion               TEXT NOT NULL,
    fotografia                             ,
);

CREATE TABLE tq.bien (
    "createdAt"               bigint NOT NULL,
    "updatedAt"               bigint NOT NULL,
    id                        SERIAL PRIMARY KEY,
    idusuario                 INTEGER REFERENCES tq.usuarios(idusuario),
    servicio                  BOOLEAN NOT NULL,
    producto                  BOOLEAN NOT NULL,
    descripcion               TEXT NOT NULL,
    fotografia                             ,
    estaus                                 ,
    idvalor                   INTEGER REFERENCES tq.unidades_de_valor(idvalor)
);

CREATE TABLE tq.unidades_de_valor(
    "createdAt"               bigint NOT NULL,
    "updatedAt"               bigint NOT NULL,
    id                        SERIAL PRIMARY KEY,
    nombre                    TEXT NOT NULL,
    codigo                    TEXT NOT NULL UNIQUE,
    descripcion               TEXT NOT NULL,
);

CREATE TABLE tq.ratings (
    "createdAt"               bigint NOT NULL,
    "updatedAt"               bigint NOT NULL,
    id                        SERIAL PRIMARY KEY,
    idusuario                 INTEGER REFERENCES tq.usuarios(idusuario),
    idstars                   INTEGER REFERENCES tq.stars(idstars),
    idbien                    INTEGER REFERENCES tq.bien(idbien),
);

CREATE TABLE tq.stars (
    "createdAt"               bigint NOT NULL,
    "updatedAt"               bigint NOT NULL,
    id                        SERIAL PRIMARY KEY,
    numero_de_estrellas       INTEGER
);

-- ///como se manejara el rating

CREATE TABLE tq.transacciones (
    "createdAt"               bigint NOT NULL,
    "updatedAt"               bigint NOT NULL,
    id                        SERIAL PRIMARY KEY,
    idusuario1                INTEGER REFERENCES tq.usuarios(idusuario1),
    idusuario2                INTEGER REFERENCES tq.usuarios(idusuario2),
    idbien1                   INTEGER REFERENCES tq.bien(idbien1),
    idbien2                   INTEGER REFERENCES tq.bien(idbien2),
);
