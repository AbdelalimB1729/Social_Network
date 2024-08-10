const mysql = require('mysql2');
const etablire_connexion = mysql.createConnection(
    {
        hostname: "localhost",
        user: "root",
        password: "",
        database:"social_network" 
    }
)

etablire_connexion.connect((err)=>{
    if(err){
        console.log(`erreur de connection avec la bd ${err}`);
        return;
    }
    console.log('connecté à la base de donnée MySql')
})

module.exports = etablire_connexion;

