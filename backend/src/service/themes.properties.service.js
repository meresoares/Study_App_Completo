const { sequelize } = require("../connection");
const { ThemePropertiesModel } = require('../model/themes.properties.model');
// Atender las rutas

const listar = async function (textoBuscar) {
    console.log("listar themes properties");
    try {
        const themesProperties = await sequelize.query (
            `SELECT * FROM themes_properties
            WHERE 1=1
            AND UPPER(property_name) LIKE UPPER ('%${textoBuscar}%')
            ORDER BY id`);
        if (themesProperties  && themesProperties [0]) {
            return themesProperties [0];
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const consultarPorCodigo = async function (req, res) {
    console.log("consultar tema por codigo");

    try {
        const themesPropertiesModelResult = await ThemePropertiesModel.findByPk(req.params.id);

        if (themesPropertiesModelResult) {
            res.json({
                success: true,
                themes: themesPropertiesModelResult,
            })
        } else {
            res.json({
                success: true,
                themes: null,
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
        
    }
};

const actualizar = async function (id, theme_id, property_name, property_value) {
    console.log("actualizar themes properties");
    let themePropertieRetorno = null;
    const data = {id, theme_id, property_name, property_value};
    try {
        let themePropertieExiste = null;

        if (id) {
            themePropertieExiste = await ThemePropertiesModel.findByPk(id);
        } 
        
        if (themePropertieExiste) {
            await ThemePropertiesModel.update(data, {where: {id: id} } );
            themePropertieRetorno = data;
        }
        else {
            themePropertieRetorno = await ThemePropertiesModel.create(data);
        }

        return themePropertieRetorno;

    } catch (error) {
        console.log(error);
        throw error;
        
    }
};

const eliminar = async function (codigo) {
    console.log("eliminar theme propertie");

    try {
        ThemePropertiesModel.destroy ({ where : { id: codigo } }, { truncate: false });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    listar, actualizar, eliminar, busquedaPorCodigo: consultarPorCodigo
}