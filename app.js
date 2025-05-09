const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");
const imagem = document.getElementById("imagem");
const produtoForm = document.getElementById("produto-form");

const notificacao = document.getElementById("notificacao-content");

notificacao.style.display = 'none';

const produtos = [];

function validarValoresInseridos(campo) {
  let camposPreenchidos = true

  if (campo.value == "") {
    
  }
}

function exibirNotificacao(mensagem, status) {
  const messageEl = document.getElementById("notificacao-msg");
  
  // o textConte é responsável por alterar o texto guardado na variável
  messageEl.textContent = mensagem;
  
  if (status === "sucesso") {
    notificacao.style.backgroundColor = '#b7d5ac';
    messageEl.style.color = '#103900';
  } else if (status === "alerta") {
    notificacao.style.backgroundColor = '#ffffa0';
    messageEl.style.color = '#646600';
  } else if (status === "erro") {
    notificacao.style.backgroundColor = '#fb6866';  
    messageEl.style.color = '#103900';
  }
  
  notificacao.style.display = 'block';
  
  setTimeout(() => {
    notificacao.style.display = 'none';
  }, 2000);
}

produtoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let camposPreenchidos = true
  
  if (nome.value == "") {
    document.getElementById("erro-nome").style.display = 'block';
    camposPreenchidos = false;
  } else {
    document.getElementById("erro-nome").style.display = 'none';
  }
  
  if (categoria.value == "") {
    document.getElementById("erro-categoria").style.display = 'block';
    camposPreenchidos = false;
  } else {
    document.getElementById("erro-categoria").style.display = 'none';
  }
  
  if (preco.value == "") {
    document.getElementById("erro-preco").style.display = 'block';
    camposPreenchidos = false;
  } else {
    document.getElementById("erro-preco").style.display = 'none';
  }
  
  if (quantidade.value == "") {
    document.getElementById("erro-quantidade").style.display = 'block';
    camposPreenchidos = false;
  } else {
    document.getElementById("erro-quantidade").style.display = 'none';
  }
  
  if (camposPreenchidos == false){
    exibirNotificacao("Falha ao inserir o produto","erro");
    return;
  }
  
  const produtoInserido = {
    nome : nome.value,
    categoria : categoria.value,
    preco : preco.value,
    quantidade : quantidade.value,
    imagem : imagem.value
  }
  produtos.push(produtoInserido);
  
  localStorage.setItem("produtoInfo", JSON.stringify(produtos));

  exibirNotificacao("Produto inserido com sucesso!","sucesso");
  
  produtoForm.reset();
});
