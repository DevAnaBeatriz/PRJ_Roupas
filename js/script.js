let listaRoupas = [];

function adicionarRoupa() {
  const roupaInput = document.getElementById('roupa');
  const corInput = document.getElementById('cor');
  const mensagem = document.getElementById('mensagem');

  const roupa = roupaInput.value.trim().toLowerCase();
  const cor = corInput.value.trim().toLowerCase();

  if (!roupa || !cor) {
    mensagem.innerHTML = `<span class="alert-text">Preencha os dois campos!</span>`;
    return;
  }

  const item = `${roupa} - ${cor}`;
  const indexExistente = listaRoupas.findIndex(i => i === item);

  if (indexExistente !== -1) {
    listaRoupas.splice(indexExistente, 1);
    mensagem.innerHTML = `<span class="alert-text">Item repetido "${item}" removido e substituído.</span>`;
  } else {
    mensagem.innerHTML = "";
  }

  listaRoupas.push(item);
  atualizarLista();
  limparCampos();
}


function atualizarLista() {
  const listaSemRepetidos = [...new Set(listaRoupas)];
  listaSemRepetidos.sort();

  const ul = document.getElementById('listaOrdenada');
  ul.innerHTML = "";

  listaSemRepetidos.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="num">${index + 1}.</span> 
      <span class="item-text">${item}</span>
      <button class="edit-btn" onclick="editarItem('${item}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#ff69b4" viewBox="0 0 16 16">
          <path d="M15.502 1.94a1.5 1.5 0 0 0-2.12 0L10 5.293 2 13.293V15h1.707l8-8 3.293-3.293a1.5 1.5 0 0 0 0-2.121z"/>
        </svg>
      </button>
      <button class="delete-btn" onclick="excluirItem('${item}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#ff69b4" viewBox="0 0 16 16">
          <path d="M5.5 5.5a.5.5 0 0 1 .5-.5h.5v6h-.5a.5.5 0 0 1-.5-.5V5.5zm5 0a.5.5 0 0 1 .5-.5h.5v6h-.5a.5.5 0 0 1-.5-.5V5.5z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2h3.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1H14.5a1 1 0 0 1 1 1zM5 4v9h6V4H5z"/>
        </svg>
      </button>
    `;
    ul.appendChild(li);
  });
}


function limparCampos() {
  document.getElementById('roupa').value = "";
  document.getElementById('cor').value = "";
}

function excluirItem(item) {
  listaRoupas = listaRoupas.filter(i => i !== item);
  atualizarLista();
}

function editarItem(itemAntigo) {
  const partes = itemAntigo.split(" - ");
  const novaRoupa = prompt("Editar nome da roupa:", partes[0]);
  const novaCor = prompt("Editar cor:", partes[1]);

  if (novaRoupa && novaCor) {
    const novoItem = `${novaRoupa.toLowerCase()} - ${novaCor.toLowerCase()}`;

    // se já existir o item novo e for diferente do antigo
    if (listaRoupas.includes(novoItem) && novoItem !== itemAntigo) {
      alert("Esse item já existe!");
      return;
    }

    listaRoupas = listaRoupas.map(i => (i === itemAntigo ? novoItem : i));
    atualizarLista();
  }
}
