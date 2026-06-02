const API_URL = 'http://localhost:3000/vagas';

async function fetchItems() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Não foi possível buscar as vagas.');
        return await response.json();
    } catch (error) {
        console.error(error);
        document.getElementById('cards-container').innerHTML = `<p class="erro">Erro ao carregar as vagas do servidor.</p>`;
        return [];
    }
}

function createCard(vaga) {
    const card = document.createElement('div');
    card.className = `card ${vaga.destaque ? 'destaque' : ''}`;
    
    card.innerHTML = `
        <img src="${vaga.imagem}" alt="${vaga.titulo}">
        <div class="card-body">
            <span class="badge">${vaga.categoria}</span>
            <h3>${vaga.titulo}</h3>
            <p>${vaga.descricaoCurta}</p>
            <div class="card-footer">
                <span class="valor">R$ ${vaga.preco.toFixed(2)}</span>
                <a href="details.html?id=${vaga.id}" class="btn-ver">Ver Detalhes</a>
            </div>
        </div>
    `;
    return card;
}

function renderCards(vagas) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    if (vagas.length === 0) {
        container.innerHTML = '<p>Nenhuma vaga disponível no momento.</p>';
        return;
    }

    vagas.forEach(vaga => {
        const cardHTML = createCard(vaga);
        container.appendChild(cardHTML);
    });
}

async function init() {
    const dados = await fetchItems();
    renderCards(dados);
}

window.addEventListener('DOMContentLoaded', init);

  