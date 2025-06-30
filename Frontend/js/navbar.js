document.addEventListener("DOMContentLoaded", () => {
    const burgerButton = document.getElementById('mobile-menu-button');
    const menuList = document.getElementById('mobile-menu');

    if (!burgerButton || !menuList) return;

    // Toggle menu on burger click
    burgerButton.addEventListener('click', () => {
        const isOpen = burgerButton.getAttribute('aria-expanded') === 'true';
        burgerButton.setAttribute('aria-expanded', (!isOpen).toString());
        menuList.classList.toggle('hidden');
    });

    // Close menu on outside click
    document.addEventListener('click', (event) => {
        if (!menuList.contains(event.target) && !burgerButton.contains(event.target)) {
            closeMenu();
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    // Close menu on link click inside it
    menuList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Helper to close the menu
    function closeMenu() {
        menuList.classList.add('hidden');
        burgerButton.setAttribute('aria-expanded', 'false');
    }
});

// active link to ditect where are you in the websites
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.split("/").pop(); 
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href").split("/").pop();

        if (linkPath === currentPath || linkPath === window.location.hash) {
            link.classList.remove("text-gray-300"); 
            link.classList.add("text-blue-400", "bg-gray-700/30");
        }
    });
});

