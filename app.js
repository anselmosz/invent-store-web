const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");
const imagem = document.getElementById("imagem");
const produtoForm = document.getElementById("produto-form");

const tbody = document.getElementById("produtos-lista");

const notificacao = document.getElementById("notificacao-content");
notificacao.style.display = 'none';

const produtos = [];

<<<<<<< HEAD
// Função para exibição de notificação
function exibirNotificacao(mensagem, status) {
  const messageEl = document.getElementById("notificacao-msg");
  
  // o textContent é responsável por alterar o texto guardado na variável
=======
function exibirNotificacao(mensagem, status) {
  const messageEl = document.getElementById("notificacao-msg");
  
  let counter = 0;

  // o textConte é responsável por alterar o texto guardado na variável
>>>>>>> b07d062a7d7096a7ae3137d24f91672fb18af4b1
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
  }, 5000);
}

let qtdCampos = 0;

function verificarCampos() {
  qtdCampos = 0;
  let camposPreenchidos = true;

if (nome.value == "") {
  document.getElementById("nome-erro").style.display = 'block';
  camposPreenchidos = false;
} else {
  document.getElementById("nome-erro").style.display = 'none';
  qtdCampos += 1;
}

if (categoria.value == "") {
  document.getElementById("categoria-erro").style.display = 'block';
  camposPreenchidos = false;
} else {
  document.getElementById("categoria-erro").style.display = 'none';
  qtdCampos += 1;
}

if (nome.value == "") {
  document.getElementById("preco-erro").style.display = 'block';
  camposPreenchidos = false;
} else {
  document.getElementById("preco-erro").style.display = 'none';
  qtdCampos += 1;
}

if (nome.value == "") {
  document.getElementById("quantidade-erro").style.display = 'block';
  camposPreenchidos = false;
} else {
  document.getElementById("quantidade-erro").style.display = 'none';
  qtdCampos += 1;
}

  return camposPreenchidos;
}

function adicionarNaTabela() {
  const semProdutosDiv = document.getElementById("sem-produtos");

  let produtos = JSON.parse(localStorage.getItem("produtoInfo")) || [];

  let tbValores = '';

  if (produtos.length > 0) {
    semProdutosDiv.style.display = 'none';
  }

  produtos.forEach(produto => {
    console.log(produto);
    
    tbValores += `
      <tr>
        <td></td>
        <td>${produto.nome}</td>
        <td>${produto.categoria}</td>
        <td>${produto.preco}</td>
        <td>${produto.quantidade}</td>
      </tr>
    `;
  });

  tbody.innerHTML = tbValores;
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
<<<<<<< HEAD

  let camposPreenchidos = true;
  
  validarCampos(nome, "erro-nome", camposPreenchidos);
  // validarCampos(categoria, "erro-categoria");
  // validarCampos(preco, "erro-preco");
  // validarCampos(quantidade, "erro-quantidade");
  
  if (camposPreenchidos == false) {
    exibirNotificacao("Falha ao inserir o produto","erro");
=======
  
  // verificarCampos();
  if (verificarCampos() == false && qtdCampos == 0) {
    exibirNotificacao("Nenhum produto adicionado! Preencha todos os campos","erro");
    return;
  } else if (verificarCampos() == false && qtdCampos < 4) {
    exibirNotificacao("Faltam alguns campos a serem preenchidos","alerta")
>>>>>>> b07d062a7d7096a7ae3137d24f91672fb18af4b1
    return;
  }

  const produtoInserido = {
  nome : nome.value,
  categoria : categoria.value,
  preco : preco.value,
  quantidade : quantidade.value,
  imagem : imagem.value
  }
<<<<<<< HEAD

  produtos.push(produtoInserido);

  localStorage.setItem("produtoInfo", JSON.stringify(produtos));

  exibirNotificacao("Produto cadastrado com sucesso!","sucesso")

=======
  
  let produtosSalvos = JSON.parse(localStorage.getItem("produtoInfo")) || [];
  
  produtosSalvos.push(produtoInserido);
  
  localStorage.setItem("produtoInfo", JSON.stringify(produtosSalvos));
  
>>>>>>> b07d062a7d7096a7ae3137d24f91672fb18af4b1
  produtoForm.reset();

  exibirNotificacao("Produto inserido com sucesso!","sucesso");
});

adicionarNaTabela();