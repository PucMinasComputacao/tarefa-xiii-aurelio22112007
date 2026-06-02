const API_URL = 'http://localhost:3000/vagas';

async function initDetails() {
    const container = document.getElementById('detail-container');
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        container.innerHTML = `<div class="erro-box"><h2>Aviso</h2><p>Nenhum identificador de vaga foi especificado.</p></div>`;
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`);
        
        if (!response.ok) {
            container.innerHTML = `<div class="erro-box"><h2>404</h2><p>A vaga solicitada não existe ou já foi preenchida.</p></div>`;
            return;
        }

        const vaga = await response.json();
        renderItemDetails(vaga, container);

    } catch (error) {
        console.error(error);
        container.innerHTML = `<div class="erro-box"><h2>Erro</h2><p>Não foi possível conectar ao servidor.</p></div>`;
    }
}

function renderItemDetails(vaga, container) {
    const tagsHTML = vaga.tags.map(tag => `<span class="tag-chip">#${tag}</span>`).join('');

    container.innerHTML = `
        <div class="detalhe-wrapper">
            <img src="${vaga.imagem}" alt="${vaga.titulo}" class="detalhe-img">
            <div class="detalhe-conteudo">
                <span class="badge">${vaga.categoria}</span>
                <h1>${vaga.titulo}</h1>
                <p class="detalhe-preco">Orçamento do Projeto: <strong>R$ ${vaga.preco.toFixed(2)}</strong></p>
                <hr>
                <h3>Descrição Completa do Trabalho</h3>
                <p class="detalhe-texto">${vaga.descricaoCompleta}</p>
                <h3>Tecnologias Desejadas</h3>
                <div class="tags-flex">${tagsHTML}</div>
                <button class="btn-candidatar" onclick="alert('Inscrição simulada com sucesso!')">Candidatar-se a esta Vaga</button>
            </div>
        </div>
    `;
}

window.addEventListener('DOMContentLoaded', initDetails);