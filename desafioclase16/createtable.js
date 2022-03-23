import mysqloptions from "./options/mysqlconfig.js";
import sqliteoptions from "./options/sqliteconfig.js";
import knex from "knex";

const mariaDatabase= knex(mysqloptions);
const sqliteDatabase= knex(sqliteoptions)

//mariaDatabase.schema.createTable('ecommerce', table=>{ // Creo una tabla con las siguientes caracteristicas. Esto es una promesa
//    table.increments('id'); //tipo de dato autoincrementable
//    table.string('name', 20); //recibe un nombre y una longitud de texto
//    table.integer('price'); //un numero
//    table.string('thumbnail')
//})
//.then(()=>console.log('tabla creada'))
//.catch((err)=>console.log(err))

sqliteDatabase.schema.createTable('messages', table=>{
    table.string('message')
    table.string('email')
})
.then(()=>console.log('tabla creada'))
.catch((err)=>console.log(err))  