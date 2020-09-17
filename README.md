# sails-postgres-a-pi poposilla

a [Sails v1](https://sailsjs.com) application


### Links

+ [Get started](https://sailsjs.com/get-started)
+ [Sails framework documentation](https://sailsjs.com/documentation)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Wed Sep 09 2020 13:48:27 GMT-0500 (Central Daylight Time) using Sails v1.0.2.

<!-- Internally, Sails used [`sails-generate@1.15.28`](https://github.com/balderdashy/sails-generate/tree/v1.15.28/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->
# Cambia los  env variables a las bases de datos y  usarios en  las dos imagenes  de docker-compose

 environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
 docker-compose build
 docker-compose up

 # hacer npm install 
 
   en la carpeta con el projecto de sails

#docker-compose exec <imagen-de-base-de-datos> bash


 psql -U postgres
 crea la tabla input para revisar la conexion con la base de datos

# checa que este instalado el orm
 npm ls sails-hook-orm

