const jwt = require('jsonwebtoken')
const connection_mongoose = require('../partials/connection_mongoose');
const connection_mysql=require('../partials/connection_mysql')
const User = require('../models/user');
const Task = require('../models/tasks');


const adminmidd = async (req, res, next) => {
  const token_access = req.cookies.token_access;
  const { id } = req.params;
  NTask = await Task.findById(id)
  console.log(NTask);
  
  Task_user_id = String(NTask.user_id)
  
  if (!token_access) {
    return res.status(401).send('Token d\'accès manquant');
  }

  jwt.verify(token_access, "secretKey", (err, decoded) => {
    if (err) {
      return res.status(403).send('Token invalide');
    }

    const user_id = decoded.id;

    User.findById(user_id).select('role').then((resultat) => {
      if (resultat) {
        if (resultat.role === 'admin' || String(resultat._id)=== Task_user_id) {
          next();
        } else {
          res.send("Vous n'avez pas les droits");
        }
      } else {
        res.send("Utilisateur non trouvé");
      }
    }).catch(() => {
      console.error('Erreur lors de la recherche dans MongoDB:');
      const query = "SELECT role FROM users WHERE id = ?";
      connection_mysql.query(query, [user_id], (err, resultat) => {
        if (resultat.length > 0) {
          if (resultat[0].role === "admin" || String(resultat[0]._id)=== Task_user_id) {
            next();
          } else {
            res.send("Vous n'avez pas les droits");
          }
        } else {
          res.send("Utilisateur non trouvé");
        }
      });
    });
  });
};

module.exports = adminmidd;