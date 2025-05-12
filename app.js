const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");
const imagem = document.getElementById("imagem");
const produtoForm = document.getElementById("produto-form");

const notificacao = document.getElementById("notificacao-content");
notificacao.style.display = 'none';

const produtos = [];

// Função para exibição de notificação
function exibirNotificacao(mensagem, status) {
  const messageEl = document.getElementById("notificacao-msg");
  
  // o textContent é responsável por alterar o texto guardado na variável
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

// Função para validar se os campos contém conteúdo ou não
function validarCampos(campo, errorId) {
  if (campo.value == "") {
    document.getElementById(errorId).style.display = 'block';
  }
}

// Evento de submissão de dados do formulário
produtoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let camposPreenchidos = true;
  
  validarCampos(nome, "erro-nome", camposPreenchidos);
  // validarCampos(categoria, "erro-categoria");
  // validarCampos(preco, "erro-preco");
  // validarCampos(quantidade, "erro-quantidade");
  
  if (camposPreenchidos == false) {
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

  exibirNotificacao("Produto cadastrado com sucesso!","sucesso")

  produtoForm.reset();
});
