// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    // var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        // b_usuario.innerHTML = nome;
        calcularHora()
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

function calcularHora() {
    console.log("calcularHora chamada")

    const horas = new Date();
    const horaAtual = horas.getHours();
  
    let mensagem = "";
    
    if (horaAtual < 12) {
        mensagem = "Bom dia, ";
    } else if (horaAtual < 18) {
        mensagem = "Boa tarde, ";
    } else {
        mensagem = "Boa noite, ";
    }
    
    const elementoMsg = document.getElementById("mensagem-hora")
    if (elementoMsg) elementoMsg.innerText = mensagem;
    
    var nomeUsuario = sessionStorage.getItem("NOME_USUARIO");
    var elementoNome = document.getElementById("h1-span");
    
    if (nomeUsuario && elementoNome) {
        var primeiroNome = nomeUsuario.split(" ")[0];
        elementoNome.innerText = primeiroNome + "!";
    } else if (elementoNome) {
        elementoNome.innerText = "visitante!";
    }
    

    const diaSemana = horas.getDay();
    const diaMes = horas.getDate();
    const mesAtual = horas.getMonth();
    const anoAtual = horas.getFullYear();

    const dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    

    const welcomeSub = document.getElementById("welcome-subtitle")
    if (welcomeSub) welcomeSub.innerHTML = `${dias[diaSemana]}, ${diaMes} ${meses[mesAtual]} ${anoAtual} `


    const welcomeSubSemana = document.getElementById("h4-span")

    const spanDia = document.getElementById("span-dia")
    const spanData = document.getElementById("span-data")
    const spanSemana = document.getElementById("span-semana")
    
    if (spanDia) spanDia.innerHTML = `${dias[diaSemana-1]}`
    if (spanData) spanData.innerHTML = `${diaMes} ${meses[mesAtual]} ${anoAtual}`


    const usuarioIdLogado = sessionStorage.getItem("ID_USUARIO");


    fetch(`/usuarios/buscar-semanas/${usuarioIdLogado}`)
    .then((resposta) => { 
        console.log("resposta status:", resposta.status) 
        return resposta.json() })
    .then((data) => {
  
        let semana = data[0].semanas
        
        if (welcomeSubSemana) welcomeSubSemana.innerHTML = `· Semana ${semana}`
        if (spanSemana) spanSemana.innerHTML = `Semana ${semana}`
        }    
    ).catch((error) => {
        console.error("Error in fetch buscar-semanas: ", error)
    })
 
}