const { sequelize } = require("../connection");
const jwt = require('jsonwebtoken');

const auth = async function (req, res, next) {
    if (!req.headers.authorization) {
        // Verifica si se proporcioa el encabezado de autorizacion
        res.json({
            success: false,
            error: 'No authorization header'
        }) 
        return;
    } else {
        let token = req.headers.authorization;

        // Consulta la bd para verificar el token
        const usersDB = await sequelize.query("SELECT * FROM users WHERE token = '" + token + "'");
        let user = null;
        if (usersDB.length > 0 && usersDB[0].length > 0) {
            user = usersDB[0][0];
            console.log("Token del usuario: ", user);
            // almacena el id de usuario en res.locals para acceder a otras partes de la app
            res.locals.userId = user.id;
            // Pasa al siguiente middleware
            next();
        } else {
            res.json({
                success: false,
                error: 'Token invalido'
            })
        }
    }
}