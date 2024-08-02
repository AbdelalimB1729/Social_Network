const mongoose = require('mongoose');
const connexion = mongoose.connect('mongodb://localhost:27017/projet_ecommerce').then(()=>{
    console.log('Connexion à la base de données MongoDB réussie !');
}).catch((error)=>{
    console.log('Erreur de connexion à la base de données MongoDB :', error);
});
module.exports = connexion;