document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    const duration = 2000; 

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
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
