// Ruta absoluta
// const userController = require('/src/controller/users/users.controller');

// Ruta relativa
const userController = require('../../controller/users/users.controller');
const authMiddleware = require('../../middleware/auth.controller');

module.exports = function(app) {

    app.get("/users/list", userController.listar);

    app.get("/user/:id", userController.busquedaPorCodigo);

    app.post("/users/update", userController.actualizar);

    app.delete("/user/delete/:id", userController.eliminar);

    app.post("/user/login", userController.login);
    app.post("/user/logout", 
    //authMiddleware.auth, 
    userController.logout);
}