const mysql2 = require('mysql2/promise');
require('dotenv').config
const conn = mysql2.createConnection(
    {
        host: process.env.hostname,
        user: process.env.username,
        password: process.env.password,
        database: process.env.database
    }
).then(()=>{
    console.log("connecté à la base de donnée");
}).catch((e)=>{
    console.log("erreur de connexion");
    console.error(e);
})