const jwt = require('jsonwebtoken')
const connection = require('../partials/connection_mongoose');
const User = require('../models/user');

const adminmidd = (req, res, next) => {
    const user_id = req.body.user_id
    User.findById(user_id).select('role').then((resultat)=>{
      if(resultat){
      if (resultat.role === 'admin') {
         next();
      }
      else {
         res.send("vous n'avez pas les droits")
      }}else{
         res.send("user pas trouve")
      }
    }).catch(()=>{
      console.error('Erreur lors de la recherche dans MongoDB:');
      const query = "SELECT role FROM users WHERE id = ?";
      connection.query(query,[user_id],(err,resultat)=>{
         if(resultat.length > 0){
        if(resultat[0].role === "admin") {
              next()
          }
          else {
         res.send("vous n'avez pas les droits")
       }
       }else{
         res.send("user pas trouve")
         }
      })
    });
     
    
     
    
};
module.exports = adminmidd;