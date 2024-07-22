document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const query = document.getElementById('query').value;
    fetch(`/search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Limpar o conteúdo existente

            if (data.message) {
                const errorMessageDiv = document.createElement('div');
                errorMessageDiv.className = 'error-message';
                errorMessageDiv.innerHTML = `
                    <p>Nenhum cantor ou música encontrados!</p>
                    <p>Tente novamente com parte do nome do cantor ou música!</p>
                    <p>Atente para o nome correto do cantor ou música!</p>
                `;
                resultsDiv.appendChild(errorMessageDiv);
            } else {
                resultsDiv.innerHTML = '<ul>' +
                    data.map(item => `<li><strong>${item.codigo}</strong>: ${item.interprete} - ${item.titulo}</li>`).join('') +
                    '</ul>';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
});
