document.addEventListener("DOMContentLoaded", function () {
    // **GESTIONE MENU MOBILE**
    const menu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("overlay");
    const menuButton = document.querySelector(".menu-btn");
    let touchStartX = 0;

    function toggleMenu(forceOpen = null) {
        if (forceOpen === true) {
            menu.classList.add("open");
            overlay.classList.add("show");
        } else if (forceOpen === false) {
            menu.classList.remove("open");
            overlay.classList.remove("show");
        } else {
            menu.classList.toggle("open");
            overlay.classList.toggle("show");
        }
    }

    // Click sul bottone menu
    menuButton.addEventListener("click", () => toggleMenu());

    // Click sull'overlay per chiudere il menu
    overlay.addEventListener("click", () => toggleMenu(false));

    // Swipe per aprire e chiudere il menu
    document.addEventListener("touchstart", (e) => (touchStartX = e.touches[0].clientX));
    document.addEventListener("touchend", (e) => {
        let swipeDistance = e.changedTouches[0].clientX - touchStartX;

        // Swipe da sinistra a destra per aprire
        if (swipeDistance > 50 && touchStartX < 50) toggleMenu(true);

        // Swipe da destra a sinistra per chiudere
        if (swipeDistance < -50 && menu.classList.contains("open")) toggleMenu(false);
    });

    // **GESTIONE CAROSELLO**
    const images = document.querySelectorAll(".carousel-images img");
    const totalImages = images.length;
    let index = 0;
    const carousel = document.querySelector(".carousel-images");

    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    // Pulsanti di navigazione
    document.querySelector(".prev").addEventListener("click", function () {
        index = (index - 1 + totalImages) % totalImages;
        updateCarousel();
    });

    document.querySelector(".next").addEventListener("click", function () {
        index = (index + 1) % totalImages;
        updateCarousel();
    });

    // Swipe su mobile
    let startX = 0;
    document.querySelector(".carousel").addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    document.querySelector(".carousel").addEventListener("touchend", (e) => {
        let diff = startX - e.changedTouches[0].clientX;

        if (diff > 50) index = (index + 1) % totalImages; // Scorri avanti
        if (diff < -50) index = (index - 1 + totalImages) % totalImages; // Torna indietro

        updateCarousel();
    });

    // **Autoplay (opzionale)**
    setInterval(() => {
        index = (index + 1) % totalImages;
        updateCarousel();
    }, 5000);
});document.addEventListener("DOMContentLoaded", () => {
    const toggleThemeBtn = document.getElementById("theme-toggle");
    const body = document.body;

    // Controlla se c'è un tema salvato nel localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    toggleThemeBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Salva il tema nel localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});

