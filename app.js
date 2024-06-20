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
});



document.addEventListener('DOMContentLoaded', function() {
    const valorButtons = document.querySelectorAll('.valor');
    const addToCartButtons = document.querySelectorAll('.adicionar__carrinho');
    const cartItemsList = document.getElementById('carrinho-itens');
    const cartTotal = document.getElementById('carrinho-total');
    const pagarButton = document.getElementById('pagar-btn');

    let selectedItem = null;
    const shippingCost = 10.00;
    let shippingItem = null;

    valorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const valueDisplay = this.nextElementSibling;

            if (this.classList.contains('clicked')) {
                this.classList.remove('clicked');
                valueDisplay.textContent = '';
                valueDisplay.classList.remove('visible');
                valueDisplay.classList.add('hidden');
            } else {
                valorButtons.forEach(btn => {
                    btn.classList.remove('clicked');
                    const sibling = btn.nextElementSibling;
                    sibling.textContent = '';
                    sibling.classList.remove('visible');
                    sibling.classList.add('hidden');
                });

                this.classList.add('clicked');
                valueDisplay.textContent = `R$ ${this.getAttribute('data-price')}`;
                valueDisplay.classList.remove('hidden');
                valueDisplay.classList.add('visible');
                selectedItem = {
                    price: parseFloat(this.getAttribute('data-price')),
                    size: this.getAttribute('data-size'),
                    name: this.closest('.info__pizza').querySelector('.nome__pizza').textContent
                };
            }
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

            // Reset selected item and button states
            selectedItem = null;
            valorButtons.forEach(btn => {
                btn.classList.remove('clicked');
                const sibling = btn.nextElementSibling;
                sibling.textContent = '';
                sibling.classList.remove('visible');
                sibling.classList.add('hidden');
            });

            updateCartTotal();
        });
    });

    function updateCartTotal() {
        let total = 0;
        let itemCount = 0;

        // Remove o item de frete se ele existir antes de recalcular
        if (shippingItem && cartItemsList.contains(shippingItem)) {
            cartItemsList.removeChild(shippingItem);
            shippingItem = null;
        }

        cartItemsList.querySelectorAll('li').forEach(item => {
            total += parseFloat(item.getAttribute('data-price'));
            itemCount++;
        });

        if (itemCount > 0 && itemCount < 3) {
            if (!shippingItem) {
                shippingItem = document.createElement('li');
                shippingItem.textContent = `Frete - R$ ${shippingCost.toFixed(2)}`;
                shippingItem.setAttribute('data-price', shippingCost);
                cartItemsList.appendChild(shippingItem);
            }
            total += shippingCost;
        }

        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
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
