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
  
  let counter = 0;

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
  }, 5000);
}

let qtdCampos = 0;

function verificarCampos() {
  qtdCampos = 0;
  let camposPreenchidos = true;

if (nome.value == "") {
  document.getElementById("erro-nome").style.display = 'block';
  camposPreenchidos = false;
} else {
  document.getElementById("erro-nome").style.display = 'none';
  qtdCampos += 1;
}

if (categoria.value == "") {
  document.getElementById("erro-categoria").style.display = 'block';
  camposPreenchidos = false;
} else {
  document.getElementById("erro-categoria").style.display = 'none';
  qtdCampos += 1;
}

if (preco.value == "" || preco.value <= 0) {
  document.getElementById("erro-preco").style.display = 'block';
  camposPreenchidos = false;
} else {
  document.getElementById("erro-preco").style.display = 'none';
  qtdCampos += 1;
}

if (quantidade.value == "" || quantidade.value <= 0) {
  document.getElementById("erro-quantidade").style.display = 'block';
  camposPreenchidos = false;
} else {
  document.getElementById("erro-quantidade").style.display = 'none';
  qtdCampos += 1;
}
  console.log(qtdCampos);
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

produtoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  // verificarCampos();
  if (verificarCampos() == false && qtdCampos == 0) {
    exibirNotificacao("Nenhum produto adicionado! Preencha todos os campos","erro");
    return;
  } else if (verificarCampos() == false && qtdCampos < 4) {
    exibirNotificacao("Faltam alguns campos a serem preenchidos","alerta")
    return;
  }

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

  exibirNotificacao("Produto inserido com sucesso!","sucesso");
});

adicionarNaTabela();