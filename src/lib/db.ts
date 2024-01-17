import mongoose from 'mongoose'
import envs from '../envs'

console.log(":::: envs.dbUrl ::::", envs.dbUrlLocal);

class Database {    
    constructor() {
        this.connect()
    }
    connect() {
        // mongoose.connect('mongodb://adminUser:password@localhost:27017/work-finder?authSource=admin')
        mongoose.connect(envs.dbUrlLocal)
        .then(() => { 
            console.log('Database connection successful') 
        })
        .catch(err => {
            console.error('Database connection error', err)
        })
    }
}

export default new Database()