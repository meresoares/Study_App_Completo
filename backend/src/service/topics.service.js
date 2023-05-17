const { sequelize } = require("../connection");
const { TopicModel } = require('../model/topics.model');

const listar = async function(textoBuscar) {
    console.log('listar topics');

    try {
        const topics = await sequelize.query(
        `SELECT * FROM topics
        WHERE 1=1
        AND UPPER(name) LIKE UPPER('%${textoBuscar}%')
        ORDER BY id`
    );

    if (topics && topics[0]) {
        return topics[0];
    } else {
        return [];
    }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const consultarPorCodigo = async function(req, res) {
    console.log("consultar topic por codigo");

    try {
        const topicModelResult = await TopicModel.findByPk(req.params.id);

        if (topicModelResult) {
            res.json({
                success: true,
                topics: topicModelResult
            });
        } else {
            res.json({
                success: true,
                topics: null
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

const actualizar = async function(id, create_date, name, topic_id, order, priority, color, owner_user_id) {
    console.log("actualizar topic");
    let topicRetorno = null;
    const data = {
        id: id,
        create_date: create_date,
        name: name,
        topic_id: topic_id,
        order: order,
        priority: priority,
        color: color,
        owner_user_id: owner_user_id
    };

    try {
        let topicExiste = null;

        if (id) {
        topicExiste = await TopicModel.findByPk(id);
        }

        if (topicExiste) {
            await TopicModel.update(data, { where: { id: id } });
            topicRetorno = data;
        } else {
            topicRetorno = await TopicModel.create(data);
        }
    return topicRetorno;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const eliminar = async function(id) {
    console.log("eliminar topic");

    try {
        await TopicModel.destroy({ where: { id: id } });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    listar,
    ctualizar,
    eliminar,
    busquedaPorCodigo: consultarPorCodigo
};
