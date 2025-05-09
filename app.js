const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");
const imagem = document.getElementById("imagem");
const produtoForm = document.getElementById("produto-form");

const notificacao = document.getElementById("notificacao");
notificacao.style.display = 'none';

const produtos = [];

function exibirNotificacao() {
  
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
    notificacao.style.display = 'none';
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
  
  produtoForm.reset();
});
