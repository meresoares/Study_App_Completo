const { sequelize } = require ("../../connection");
const { TopicModel } = require ("../../model/topics.model");
const TopicsService = require("../../service/topics.service");

const listar = async function (req, res) {
    console.log("listar topics");

    try {
        const topics = await TopicsService.listar(req.query.filtro || "");

        if(topics) {
            res.json({
                success: true,
                topics: topics
            })
        } else {
            res.json({
                success: true,
                topics: []
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            error: error.message
        }) 
    }
}

const consultarPorCodigo = async function (req, res) {
    console.log("consultar 1 topic por codigo");
    try {
        const topicsModelResult = await TopicModel.findByPk(req.params.id);

        if (topicsModelResult) {
            res.json({
                success: true,
                topics: topicsModelResult
            })  
        } else {
            res.json({
                success: true,
                topics: null,
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

const actualizar = async function (req, res) {
    console.log("actualizar topic");
    let topicRetorno = null;
    //const data = req.body;
    //const id = req.body.id;

    try {
        topicRetorno = await TopicsService.actualizar(
            req.body.id,
            req.body.create_date,
            req.body.name,
            req.body.topic_id,
            req.body.order,
            req.body.priority,
            req.body.color,
            req.body.owner_user_id
        );
        
        res.json({
            success: true,
            topics: topicRetorno
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        })
    }
}

const eliminar = async function (req, res) {
    console.log("eliminar topic");

    try {
        await TopicsService.eliminar(req.params.filtro || "");
        res.json({
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
}