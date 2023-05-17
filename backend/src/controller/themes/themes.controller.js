const { sequelize } = require("../../connection");
const {ThemesModel} = require('../../model/themes.model');
const ThemeService = require('../../service/themes.service');

const listar = async function(req, res) {
    console.log("listar temas");
    try {
        const themes = await ThemeService.listar(req.query.filtro || "");
        if (themes) {
            res.json ({           
                success: true,
                temas: themes
            });
        } else {
            res.json({
                success: true,
                temas: []
            });
        }
    } catch (error) {
        res.json ({
            success: false,
            error: error.message
        });
    }
};

const consultarPorCodigo = async function (req, res) {
    console.log("consultar un tema por codigo");
    try {
        const themesModelResult = await ThemeService.busquedaPorCodigo(req.params.filtro || "");
        if (themesModelResult) {
            res.json({
                success:true,
                temas: themesModelResult
            })
        } else {
            res.json({
                success: false,
                temas: []
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        })
    }
}

const actualizar = async function(req, res) {
    console.log("actualizar temas");
    let temaRetorno = null;
    //const data = req.body;
    //const id = req.body.id;

    try {
        temaRetorno = await ThemeService.actualizar(
            req.body.id,
            req.body.create_date,
            req.body.name,
            req.body.description,
            req.body.keywords,
            req.body.owner_user_id,
        );         
        res.json({
            success: true,
            user: temaRetorno
        })
    } catch (error) {
        console.log(error);
        res.json ({
            success:false,
            error: error.message
        })
    } 
};

const eliminar = async function(req, res) {
    console.log("eliminar temas");
    //res.send("eliminar de usuarios");
    try {
        await ThemeService.eliminar(req.params.filtro || "");
        res.json({
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }  
};

module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo ,actualizar, eliminar
};