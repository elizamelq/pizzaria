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

document.addEventListener('DOMContentLoaded', function() {
    const valorButtons = document.querySelectorAll('.valor');
    const addToCartButtons = document.querySelectorAll('.adicionar__carrinho');
    const cartItemsList = document.getElementById('carrinho-itens');
    const cartTotal = document.getElementById('carrinho-total');
    const pagarButton = document.getElementById('pagar-btn');

    let selectedItem = null;

    valorButtons.forEach(button => {
        button.addEventListener('click', function() {
            valorButtons.forEach(btn => {
                btn.classList.remove('clicked');
                btn.style.backgroundColor = 'var(--cor-tamanhos)';
            });

            this.classList.add('clicked');
            this.style.backgroundColor = '#FF5733';
            selectedItem = {
                price: parseFloat(this.getAttribute('data-price')),
                size: this.getAttribute('data-size'),
                name: this.closest('.info__pizza').querySelector('.nome__pizza').textContent
            };
        });
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!selectedItem) {
                alert('Por favor, selecione um tamanho.');
                return;
            }

            const cartItem = document.createElement('li');
            cartItem.textContent = `${selectedItem.name} (${selectedItem.size}) - R$ ${selectedItem.price.toFixed(2)}`;
            cartItem.setAttribute('data-price', selectedItem.price);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', function() {
                cartItemsList.removeChild(cartItem);
                updateCartTotal();
            });

            cartItem.appendChild(removeButton);
            cartItemsList.appendChild(cartItem);

            updateCartTotal();
        });
    });

    function updateCartTotal() {
        let total = 0;
        cartItemsList.querySelectorAll('li').forEach(item => {
            total += parseFloat(item.getAttribute('data-price'));
        });
        cartTotal.textContent = total.toFixed(2);
    }

    pagarButton.addEventListener('click', function() {
        if (cartItemsList.children.length === 0) {
            alert('O carrinho está vazio.');
            return;
        }
        
        alert('Redirecionando para a página de pagamento...');
        // Aqui você pode adicionar a lógica para redirecionar ou processar o pagamento
    });
});
