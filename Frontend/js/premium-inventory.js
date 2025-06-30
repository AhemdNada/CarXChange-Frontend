//  filter functionality for the premium inventory page
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    
    //  click  filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update styles buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-700/50', 'text-gray-300');
            });
            
            this.classList.remove('bg-gray-700/50', 'text-gray-300');
            this.classList.add('bg-blue-600', 'text-white');
            
            
            vehicleCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});




//  counter animation
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counterpremium');
    const duration = 2000; 

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target-counter');
        let start = 0;
        const increment = target / (duration / 16); 

        const updateCounter = () => {
            start += increment;
            if (start < target) {
                counter.textContent = formatNumber(Math.floor(start));
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = formatNumber(target);
            }
        };

        updateCounter();
    });

    
    function formatNumber(number) {
        if (number >= 1000) {
            return (number / 1000).toFixed(0) + 'K+';
        }
        return number + '+';
    }
});
