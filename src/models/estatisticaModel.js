var database = require("../database/config");

// kpis
// horasSemanais
// horasPorCategoria
// metasVsConcluidos

function consumoMensal(usuarioId, anoDados) {
    var instrucao = `
        select month(i.concluido_em) mes,
            c.nome_categoria, 
            count(*) total   
        from item i 
        join categoria c on c.id_categoria = i.categoria_id
        where i.usuario_id = ${usuarioId}
            and i.status = 'concluido'
            and year(i.concluido_em) = ${anoDados}
        group by mes, c.nome_categoria
        order by mes;
    `;
    return database.executar(instrucao);
}

function horasPorCategoria(usuarioId, anoDados) {
    var instrucao = `
        select 
            c.nome_categoria,
            round(sum(i.horas), 0) total_horas
        from item i
        join categoria c on i.categoria_id = c.id_categoria
        where i.usuario_id = ${usuarioId}
            and year(i.concluido_em) = ${anoDados}
        group by c.nome_categoria
        order by total_horas desc;
    `;

    return database.executar(instrucao);    
}

function metasVsConcluidos(usuarioId, anoDados) {
    var instrucao = `
        select 
        c.nome_categoria,
        m.quantidade quantidade_meta,
		(select 
			count(*)
		from item
        where status = 'concluido'
			and year(concluido_em) = ${anoDados}
            and usuario_id = ${usuarioId}) as quantidade_concluido

        from meta m
        join categoria c on m.categoria_id = c.id_categoria
        join item i on i.categoria_id = c.id_categoria
        where m.usuario_id = ${usuarioId}
            and i.status = 'concluido'
            and year(i.concluido_em) = ${anoDados}
            and m.ano = ${anoDados}
        group by c.nome_categoria, quantidade_meta;
    `;

    return database.executar(instrucao);
}

function kpiConcluidos(usuarioId, anoDados) {
    var instrucao = `
        select count(*) quantidade_concluido
		from item i
		where i.usuario_id = ${usuarioId}
			and i.status = 'concluido'
			and year(i.concluido_em) = ${anoDados};
    `;

    return database.executar(instrucao);
}

function kpiHorasTotais(usuarioId, anoDados) {
    var instrucao = `
        select 
            concat(round(sum(horas), 0), 'h' )total_horas
        from item 
        where usuario_id = ${usuarioId}
            and year(concluido_em) = ${anoDados};
    `;

    return database.executar(instrucao);
}

function kpiHorasSemanais(usuarioId, anoDados) {
    var instrucao = `
        select 
            concat(
                round(
                    IFNULL(sum(i.horas), 0) / 
                    IFNULL(NULLIF(round(datediff(curdate(), u.criado_em) / 7, 0), 0), 1)
                , 0), 'h'
            ) as horas_semanais
        from item i
        join usuario u on u.id = i.usuario_id
        where i.usuario_id = ${usuarioId}
            and year(i.concluido_em) = ${anoDados}
        group by u.criado_em;
    `;

    return database.executar(instrucao);
}

function kpiTaxaConclusao(usuarioId, anoDados) {
    var instrucao = `
    select 
        concat(round(
            (select count(*) 
            from item 
            where usuario_id = ${usuarioId} 
            and status = 'concluido'
            and year(concluido_em) = ${anoDados}
            ) 
            / 
            (select count(*) 
            from item 
            where usuario_id = ${usuarioId}
            and year(iniciado_em) = ${anoDados}
            
            ) * 100
        , 0), '%') as taxa_concluido;
    `;

    return database.executar(instrucao);
}



function frequenciaDeConsumo(usuarioId, anoDados) {
    var instrucao = `
    select date(concluido_em) as dia,
	count(*) as total
    from item
	where usuario_id = ${usuarioId}
		and year(concluido_em) = ${anoDados}
        and status = 'concluido'
    group by dia
    order by dia;
    `;

    return database.executar(instrucao); 
}

function buscarAnoDados(usuarioId) {
    var instrucao = `
    select year(criado_em) ano_criacao
    from usuario
    where id = ${usuarioId};
    `;

    return database.executar(instrucao); 
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