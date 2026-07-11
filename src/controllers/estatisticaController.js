var estatisticaModel = require("../models/estatisticaModel");

// kpis
// horasSemanais
// horasPorCategoria
// metasVsConcluidos



function consumoMensal(req, res) {
    var usuarioId = req.params.id; 
    var anoDados = req.params.anoDados;

    estatisticaModel.consumoMensal(usuarioId, anoDados)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function horasPorCategoria(req, res) {
    var usuarioId = req.params.id;
    var anoDados = req.params.anoDados;

    estatisticaModel.horasPorCategoria(usuarioId, anoDados)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        })
}

function metasVsConcluidos(req, res) {
    var usuarioId = req.params.id;
    var anoDados = req.params.anoDados;

    estatisticaModel.metasVsConcluidos(usuarioId, anoDados)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        })
}

function kpiConcluidos(req, res) {
    var usuarioId = req.params.id;
    var anoDados = req.params.anoDados;

    estatisticaModel.kpiConcluidos(usuarioId, anoDados)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        })
}

function kpiHorasTotais(req, res) {
    var usuarioId = req.params.id;
    var anoDados = req.params.anoDados;

    estatisticaModel.kpiHorasTotais(usuarioId, anoDados)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        })
}


function kpiHorasSemanais(req, res) {
    var usuarioId = req.params.id;
    var anoDados = req.params.anoDados;

    estatisticaModel.kpiHorasSemanais(usuarioId, anoDados)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        })
}

function kpiTaxaConclusao(req, res) {
    var usuarioId = req.params.id;
    var anoDados = req.params.anoDados;

    estatisticaModel.kpiTaxaConclusao(usuarioId, anoDados)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        })
}

function frequenciaDeConsumo(req, res) {
    var usuarioId = req.params.id;
    var anoDados = req.params.anoDados;

    estatisticaModel.frequenciaDeConsumo(usuarioId, anoDados)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        })
}

function buscarAnoDados(req, res) {
    var usuarioId = req.params.id;

    estatisticaModel.buscarAnoDados(usuarioId)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        })
}

module.exports = {
    consumoMensal, 
    horasPorCategoria,
    metasVsConcluidos,
    kpiConcluidos,
    kpiHorasTotais,
    kpiHorasSemanais,
    kpiTaxaConclusao,
    frequenciaDeConsumo,
    buscarAnoDados
};