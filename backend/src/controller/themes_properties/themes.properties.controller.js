const { sequelize } = require("../../connection");
const {ThemePropertiesModel} = require('../../model/themes.properties.model');
const ThemePropertiesService = require('../../service/themes.properties.service');

const listar = async function(req, res) {
    console.log("listar themes properties");
    try {
        const themesProperties = await ThemePropertiesService.listar(req.query.filtro || "");
        if (themesProperties) {
            res.json ({           
                success: true,
                temas: themesProperties
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
    console.log("consultar un theme propertie por codigo");
    try {
        const ThemePropertiesModel = await ThemePropertiesService.busquedaPorCodigo(req.params.filtro || "");
        if (ThemePropertiesModel) {
            res.json({
                success:true,
                temas: ThemePropertiesModel
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
    console.log("actualizar themes properties");
    let themePropertieRetorno = null;

    try {
        themePropertieRetorno = await ThemePropertiesService.actualizar(
            req.body.id,
            req.body.theme_id,
            req.body.visited,
            req.body.property_name,
            req.body.property_value,
        );         
        res.json({
            success: true,
            user: themePropertieRetorno
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
    console.log("eliminar themes properties");
    //res.send("eliminar de usuarios");
    try {
        await ThemePropertiesService.eliminar(req.params.filtro || "");
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