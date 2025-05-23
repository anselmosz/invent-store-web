const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");
const imagem = document.getElementById("imagem");
const produtoForm = document.getElementById("produto-form");

const estoqueBaixo = document.getElementById("estoque-baixo-card");
const totalProdutos = document.getElementById("total-produtos");
const totalEstoque = document.getElementById("total-itens");
const valorTotal = document.getElementById("valor-total");

const tbody = document.getElementById("produtos-lista");

const notificacao = document.getElementById("notificacao-content");

notificacao.style.display = 'none';

const produtos = [];

// Função para mudar os dados do dashboard
function adicionarDadosAoDashboard() {
  // Verifica se há produtos no estoque, caso não haja, é mostrado o card de estoque baixo

  let produtos = JSON.parse(localStorage.getItem("produtoInfo")) || [];

  let produtosCounter = 0;
  let qtdCounter = 0;
  let valorMultProduto = 0;
  let valorFinal = 0;

  if (produtos.length > 0) {
    estoqueBaixo.style.display = 'none';
  }

  // loop para adicionar valor aos cards do dashboard a medida que os produtos são cadastrados
  produtos.forEach(produto => {
    // A medida que os produtos são adicionados, o contador adiciona 1 por produto cadastrado
    produtosCounter += 1;     
    totalProdutos.textContent = produtosCounter; // Adiciona a quantidade de tipos de produtos cadastrados

    // transforma em Int o dado de quantidade do objeto
    qtdCounter += parseInt(produto.quantidade);
    totalEstoque.textContent = qtdCounter; // Adiciona a quantidade total de todos os produtos cadastrados

    // transforma em Float o dado de preço do objeto

    // multiplica o valor de preço pela quantidade, para retornar o valor total do estoque
    valorMultProduto = parseFloat(produto.preco) * parseInt(produto.quantidade);

    // adiciona o valor total do estoque (pega o preço dos itens, os multiplica pela sua quantidade e adiciona ao campo)
    valorFinal += parseFloat(valorMultProduto);
    
    valorTotal.textContent = `R$ ${valorFinal.toFixed(2)}`; // adiciona o resultado final de 'valorFinal' ao conteúdo do card e formata com duas casas decimais
  });
}

// Função para exibir notificações acima do dashboard
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
  }, 5000);
}

// verifica se o conteudo digitado contém simbolos
function validarTexto(campo) {
  const regex = /^[A-Za-zÀ-ÿ\s]+$/;

  return regex.test(campo.trim());
}

let qtdCampos = 0; // contador dos campos (é usado na função abaixo para contabilizar a quantidade de campos preenchidos)

// Funcão para validar se os campos de cadastro do formulário de produtos estão vazios
function verificarCampos() {
  qtdCampos = 0;
  let camposPreenchidos = true;

  if (nome.value == "" || !validarTexto(nome.value)) {
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

  return camposPreenchidos;
}

// Função para adicionar os dados de produtos cadastrados na tabela abaixo do formulário
function adicionarNaTabela() {
  const semProdutosDiv = document.getElementById("sem-produtos");

  let produtos = JSON.parse(localStorage.getItem("produtoInfo")) || [];

  let tbValores = '';

  if (produtos.length > 0) {
    semProdutosDiv.style.display = 'none';
  }

  produtos.forEach(produto => {
    
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

// Evento de click do botão de "adicionar produto"
produtoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  // verificarCampos();
  if (verificarCampos() == false && qtdCampos == 0) {
    exibirNotificacao("Nenhum produto adicionado! Preencha todos os campos","erro");
    return;
  } else if (verificarCampos() == false && qtdCampos < 4) {
    exibirNotificacao("Faltam campos a serem preenchidos!","alerta")
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

  location.reload(); // Recarrega a url de forma automática, sem necessidade de fazer isso manualmente
});

adicionarNaTabela();

adicionarDadosAoDashboard();
