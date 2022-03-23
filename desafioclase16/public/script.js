import mysqloptions from "../options/mysqlconfig.js"
import sqliteoptions from "../options/sqliteconfig.js"
import knex from "knex"

export default class Database{
    constructor(){
        this.sqliteDatabase=knex(sqliteoptions),
        this.mysqlDatabase=knex(mysqloptions)
    }
    // Messages
    async getMessages(row){
        let data=await this.sqliteDatabase.from(row).select('*')
        .catch(err=> console.log(err))
        return data
    }
    saveMessages(form, where){
        this.sqliteDatabase(where).insert(form)
        .catch(err=> console.log(err))
    }

    //E-commerce
    async getProducts(row){
        let data=await this.mysqlDatabase.from(row).select('*')
        .then(data=> JSON.parse(JSON.stringify(data)))
        .catch(err=> console.log(err))
        return data
    }
    saveProducts(form, where){
        this.mysqlDatabase(where).insert(form)
        .catch(err=> console.log(err))
    }
}

