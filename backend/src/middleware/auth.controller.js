const { sequelize } = require("../connection");
const jwt = require('jsonwebtoken')

const auth = async function (req, res, next) {
    try {
      if (!req.headers.authorization) {
        res.json({
          success: false,
          error: 'No authorization header'
        });
        return;
      }
  
      const token = req.headers.authorization;
      const userDB = await sequelize.query("SELECT * FROM users WHERE token = '" + token + "'");
      let user = null;

      if (usersDB.length > 0 && usersDB[0].length > 0) {
        user = usersDB[0][0];
        console.log("Token del usuario:", user);
        res.locals.userId = user.id;
        next();
      } else {
        res.json({
          success: false,
          error: 'Token inválido'
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        error: error.message
      });
    }
  };
  
  module.exports = auth;
  