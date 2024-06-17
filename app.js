document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const imgDiv = document.getElementById('div__pizzas');
    const imgs = imgDiv.querySelectorAll('.imagem__pizza');

    searchInput.addEventListener('input', function(event) {
        const searchTerm = event.target.value.toLowerCase();

        imgs.forEach(function(img) {
            const altText = img.getAttribute('alt').toLowerCase();
            const imgLink = img.parentElement.getAttribute('href');

            if (altText.includes(searchTerm)) {
                img.style.display = 'inline-block';
                img.parentElement.style.display = 'inline-block';
            } else {
                img.style.display = 'none';
                img.parentElement.style.display = 'none';
            }
        });
    });

    // Seleciona todos os botões com a classe 'valor'
    const valorButtons = document.querySelectorAll('.valor');
    
    valorButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Se o botão já está selecionado
            if (this.classList.contains('clicked')) {
                // Desmarca o botão clicado e restaura a cor original
                this.classList.remove('clicked');
                this.style.backgroundColor = 'var(--cor-tamanhos)';
            } else {
                // Remove a classe 'clicked' e restaura a cor original de todos os botões
                valorButtons.forEach(btn => {
                    btn.classList.remove('clicked');
                    btn.style.backgroundColor = 'var(--cor-tamanhos)';
                });

                // Adiciona a classe 'clicked' e muda a cor do botão clicado
                this.classList.add('clicked');
                this.style.backgroundColor = '#FF5733'; // Nova cor
            }
        });
    });
});
