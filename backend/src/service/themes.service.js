const { sequelize } = require("../connection");
const { ThemeModel } = require('../model/themes.model');
// Atender las rutas

const listar = async function (textoBuscar) {
    console.log("listar temas");
    try {
        const themes = await sequelize.query (
            `SELECT * FROM themes
            WHERE 1=1
            AND UPPER(name) LIKE UPPER ('%${textoBuscar}%')
            ORDER BY id`);
        if (themes && themes[0]) {
            return themes[0];
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const consultarPorCodigo = async function (codigo) {
    console.log("consultar tema por codigo");

    try {
        const themesModelResult = await ThemeModel.findByPk(codigo);

        if (themesModelResult) {
            return themesModelResult;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
        
    }
};

const actualizar = async function (id, create_date, name, description, keywords, owner_user_id) {
    console.log("actualizar temas");
    let temaRetorno = null;
    const data = {id, create_date, name, description, keywords, owner_user_id};
    try {
        let temaExiste = null;

        if (id) {
            temaExiste = await ThemeModel.findByPk(id);
        } 
        
        if (temaExiste) {
            temaRetorno = await ThemeModel.update(data, {where: {id: id} } );
            temaRetorno = data;
        }
        else {
            temaRetorno = await ThemeModel.create(data);
        }

        return temaRetorno;

    } catch (error) {
        console.log(error);
        throw error;
        
    }
};

const eliminar = async function (codigo) {
    console.log("eliminar tema");

    try {
        ThemeModel.destroy ({ where : { id: codigo } }, { truncate: false });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    listar, actualizar, eliminar, busquedaPorCodigo: consultarPorCodigo
}