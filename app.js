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

function verificarCampos() {
  let camposPreenchidos = true;
  
  if (nome.value == "") {
    document.getElementById("erro-nome").style.display = 'block';
    camposPreenchidos = false;
    
    setTimeout(() => {
      document.getElementById("erro-nome").style.display = 'none';
    }, 8000);
  }
  
  if (categoria.value == "") {
    document.getElementById("erro-categoria").style.display = 'block';
    camposPreenchidos = false;
    
    setTimeout(() => {
      document.getElementById("erro-categoria").style.display = 'none';
    }, 8000);
  } 
  
  if (preco.value == "") {
    document.getElementById("erro-preco").style.display = 'block';
    camposPreenchidos = false;
    
    setTimeout(() => {
      document.getElementById("erro-preco").style.display = 'none';
    }, 8000);
  } 
  
  if (quantidade.value == "") {
    document.getElementById("erro-quantidade").style.display = 'block';
    camposPreenchidos = false;
    
    setTimeout(() => {
      document.getElementById("erro-quantidade").style.display = 'none';
    }, 8000);
  } 
  
  if (camposPreenchidos == false){
    exibirNotificacao("Falha ao inserir o produto!","erro");
    return;
  }
  
  exibirNotificacao("Produto inserido com sucesso!","sucesso");
}

function adicionarNaTabela() {
  let produtos = JSON.parse(localStorage.getItem("produtoInfo")) || [];

  let tbValores = '';

  produtos.forEach(produto => {
    console.log(produto);
    tbValores += `
      <tr>
        <td>${produto.nome}</td>
        <td>${produto.categoria}</td>
        <td>${produto.preco}</td>
        <td>${produto.quantidade}</td>
        <td></td>
      </tr>
    `;
  });

  tbody.innerHTML = tbValores;
}

produtoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  verificarCampos();
  
  const produtoInserido = {
    nome : nome.value,
    categoria : categoria.value,
    preco : preco.value,
    quantidade : quantidade.value,
    imagem : imagem.value
  }
  
  let produtosSalvos = JSON.parse(localStorage.getItem("produtoInfo")) || [];
  
  produtosSalvos.push(produtoInserido);
  
  localStorage.setItem("produtoInfo", JSON.stringify(produtosSalvos));
  
  produtoForm.reset();
});
