// Ottieni il carrello dal localStorage (se esiste)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Aggiungi un prodotto al carrello
function addToCart(event) {
    const productElement = event.target.closest('.product');
    let selectedSize = null;

    // Controlla se il prodotto ha una selezione di taglia
    const sizeSelect = productElement.querySelector('.size-select');
    if (sizeSelect) {
        selectedSize = sizeSelect.value; // Ottieni la taglia selezionata
    }

    const product = {
        id: productElement.dataset.id,
        name: productElement.dataset.name,
        price: parseFloat(productElement.dataset.price),
        size: selectedSize, // Se non c'è taglia, sarà null
        quantity: 1
    };

    // Log per il debug
    console.log(product);

    // Verifica se il prodotto è già nel carrello
    const existingProduct = cart.find(item => item.id === product.id && item.size === product.size);
    if (existingProduct) {
        // Se il prodotto è già nel carrello, aumenta la quantità
        existingProduct.quantity++;
    } else {
        // Aggiungi il prodotto al carrello
        cart.push(product);
    }

    // Salva il carrello nel localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Aggiorna il riepilogo del carrello
    updateCartSummary();
}

// Rimuovi un prodotto dal carrello
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
    renderCartItems();
}

// Modifica la quantità di un prodotto
function changeQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeItem(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartSummary();
            renderCartItems();
        }
    }
}

// Aggiorna il riepilogo del carrello
function updateCartSummary() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;
}

// Visualizza gli articoli nel carrello
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Pulisci la lista

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; font-weight: bold;">Il tuo carrello è vuoto.</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} - Taglia: ${item.size || 'N/A'} - €${item.price.toFixed(2)} x ${item.quantity}</p>
            <button onclick="changeQuantity('${item.id}', -1)">-</button>
            <button onclick="changeQuantity('${item.id}', 1)">+</button>
            <button onclick="removeItem('${item.id}')">Rimuovi</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

// Carica il carrello all'avvio della pagina
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
    updateCartSummary();
});

// Aggiungi un prodotto al carrello (aggiunto all'evento del pulsante)
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

function toggleMenu() {
    const menu = document.querySelector('#main-nav ul');
    menu.classList.toggle('active');
}