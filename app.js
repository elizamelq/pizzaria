
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
