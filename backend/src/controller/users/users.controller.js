const {sequelize} = require("../../connection");
const {UserModel} = require("../../model/users.model");
const UserService = require('../../service/users.service');
const jwt = require('jsonwebtoken');

const listar = async function(req, res) {
    console.log("listar usuarios controller");
    try {
        const users = await UserService.listar(req.query.filtro || "");
        
        if (users){
            res.json({
                success : true, 
                usuarios : users
            });
        } else {
            res.json({
                success : true, 
                usuarios : []
            });
        }        
    } catch (error) {
        console.log(error);
        res.json({
            success : false, 
            error : error.message
        });
    }

};

const consultarPorCodigo = async function(req, res) {
    console.log("consultar 1 usuario por codigo");
    try {
        //Buscar en la Base de datos por codigo
        const userModelResult = await UserModel.findByPk(req.params.id);

        if (userModelResult) {
            res.json({
                success : true, 
                usuario : userModelResult
            });
        } else {
            res.json({
                success : true, 
                usuario : null
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success : false, 
            error : error.message
        });
    }

};

const actualizar = async function(req, res) {
    console.log("actualizar usuarios controller");
    //Variables
    let usuarioRetorno = null;    //Guardara el usuario que se va incluir o editar.
    
    try {
        usuarioRetorno = await UserService.actualizar( 
            req.body.id, 
            req.body.name, 
            req.body.last_name, 
            req.body.avatar, 
            req.body.email, 
            req.body.password, 
            req.body.deleted
        );
        res.json({
            success : true, 
            user : usuarioRetorno
        });
    } catch (error) {
        console.log(error);
        res.json({
            success : false, 
            error : error.message
        });
    }
};

const eliminar = async function(req, res) {
    console.log("eliminar usuarios");
    //res.send("eliminar de usuarios");

    //Borrado fisico
    //UserModel.destroy(req.params.id);
    try {
        await sequelize.query("UPDATE users SET deleted=true WHERE id = " + req.params.id);
            
        res.json({
            success : true
        });
    } catch (error) {
        console.log(error);
        res.json({
            success : false, 
            error : error.message
        });
    }
};

const login = async function (req, res) {
    console.log("login usuarios");
    try {
        // Buscar en la bd el usuario con email y password
        const usersDB = await sequelize.query
        ("SELECT * FROM users WHERE email = '" + req.body.email + "' AND password = '" + req.body.password + "'");
        console.log("users", usersDB);
        let user = null;

        if(usersDB.length > 0 && usersDB[0].length > 0) {
            user = usersDB[0][0];
            // Si el usuario ya esta autenticado, devuelve error
            if (user.token) {
                res.json({
                    success: false,
                    error: "Usuario ya esta autenticado"
                });
                return;
            }
            // Genera un token de autorizacion
            let token = jwt.sign({
                codigo: user.codigo,
                name: user.name,
                last_name: user.last_name,
                avatar: user.avatar,
                email: user.email
            }, 'passwd');
            // Actualiza el registro en la bd con el token generado
            const usersDBUpdate = await sequelize.query("UPDATE users SET token = '" + token + "' WHERE id = " + user.id);
            res.json({
                success: true,
                token
            });
        } else {
            res.json({
                success: false,
                error: "El usuario no fue encontrado"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
        
    }
}

const logout = async function (req, res) {
    try {
        const usersDB = await sequelize.query("UPDATE users SET token = null WHERE id = " + res.locals.userId + "");
        res.json({
            success: true
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar, login, logout
};