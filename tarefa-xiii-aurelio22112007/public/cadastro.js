const API_URL = 'http://localhost:3000/vagas';

document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede a página de recarregar do nada

    // Captura os dados digitados no formulário
    const novaVaga = {
        titulo: document.getElementById('titulo').value,
        categoria: document.getElementById('categoria').value,
        preco: parseFloat(document.getElementById('preco').value),
        descricaoCurta: document.getElementById('descricaoCurta').value,
        descricaoCompleta: document.getElementById('descricaoCompleta').value,
        imagem: `https://picsum.photos/400/250?random=${Math.floor(Math.random() * 100)}`, // Gera imagem aleatória
        tags: ["Novo", "Freela"],
        destaque: false
    };

    try {
        // Envia os dados para o JSON Server salvar no arquivo db.json
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaVaga)
        });

        if (response.ok) {
            alert('Vaga anunciada com sucesso!');
            window.location.href = 'home.html'; // Redireciona de volta para a Home
        } else {
            alert('Erro ao cadastrar a vaga no servidor.');
        }

    } catch (error) {
        console.error(error);
        alert('Não foi possível conectar ao servidor.');
    }
});