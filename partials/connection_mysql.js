const mysql = require('mysql2');
const etablire_connexion = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'social_network'
    }
)

etablire_connexion.connect((err)=>{
    if(err) throw err;
    console.log('connexion établie');
})
module.exports = etablire_connexion;

