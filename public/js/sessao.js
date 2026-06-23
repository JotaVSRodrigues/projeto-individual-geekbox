const usuarioId = sessionStorage.getItem("ID_USUARIO");

// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

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
    console.log(usuarioId, " usuario id")
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
    
    document.getElementById("mensagem-hora").innerText = mensagem;
    
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

    const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]    
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    
    
    let welcomeSubtitle = `${dias[diaSemana-1]}, ${diaMes} ${meses[mesAtual]} ${anoAtual} `

    const welcomeSub = document.getElementById("welcome-subtitle")
    welcomeSub.innerHTML = welcomeSubtitle

    const welcomeSubSemana = document.getElementById("h4-span")
    
    fetch(`/usuarios/buscar-semanas/${usuarioId}`)
    .then((resposta) => { return resposta.json() })
    .then((data) => {
        
        console.log(data, "dados do novo select")
        let semana = data[0].semanas
        
        welcomeSubSemana.innerHTML = `· Semana ${semana}`
        }    
    )
 
}