document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const query = document.getElementById('query').value;
    fetch(`/search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '<ul>' +
                data.map(item => `<li><strong>${item.codigo}</strong>: ${item.interprete} - ${item.titulo}</li>`).join('') +
                '</ul>';
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
});
