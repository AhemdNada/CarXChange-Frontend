//  counter animation
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counterinstantvaluation');
    const duration = 2000; 

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target-counter-instantvaluation');
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


// fetch data from the csv
let carsDataCache = [];

async function loadCarsData() {
    if (carsDataCache.length) return carsDataCache;

    const response = await fetch('API/cars.csv');
    const data = await response.text();

    const rows = data.split('\n').slice(1);
    carsDataCache = rows
        .map(row => {
            const [brand, model] = row.split(',');
            return brand && model ? { brand: brand.trim(), model: model.trim() } : null;
        })
        .filter(Boolean);

    return carsDataCache;
}

function createOption(value, label = null) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label || value;
    return option;
}

async function populateBrands() {
    const cars = await loadCarsData();
    const brandSelect = document.getElementById('Make');
    const uniqueBrands = [...new Set(cars.map(car => car.brand))];

    brandSelect.appendChild(createOption('', 'Select Brand'));
    uniqueBrands.forEach(brand => brandSelect.appendChild(createOption(brand)));
}

async function populateModels(selectedBrand) {
    const modelSelect = document.getElementById('Model');
    modelSelect.innerHTML = '';
    modelSelect.appendChild(createOption('', 'Select Model'));

    const cars = await loadCarsData();
    const models = [...new Set(cars
        .filter(car => car.brand === selectedBrand)
        .map(car => car.model))];

    models.forEach(model => modelSelect.appendChild(createOption(model)));
}

document.addEventListener('DOMContentLoaded', () => {
    populateBrands();
    document.getElementById('Make').addEventListener('change', (e) => {
        if (e.target.value) {
            populateModels(e.target.value);
        }
    });
});
// End featching data model and brands 



// year select
document.addEventListener('DOMContentLoaded', () => {
    const yearSelect = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    const startYear = 2000; // start year
  
    
    yearSelect.innerHTML = '<option value="" class="bg-gray-800">Select Year</option>';
  
    for (let year = currentYear; year >= startYear; year--) {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      option.className = 'bg-gray-800';
      yearSelect.appendChild(option);
    }
  });





// sample calculation for vechiles
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form.space-y-6');
    const exchangeRate = 31.5; 
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
  
      const make = form.querySelector('#Make').value;
      const model = form.querySelector('#Model').value;
      const year = form.querySelector('#year').value;
      const mileageInput = form.querySelector('input[type="number"]');
      const mileage = mileageInput ? parseFloat(mileageInput.value) : 0;
      const conditionSelect = form.querySelectorAll('select')[2];
      const condition = conditionSelect ? conditionSelect.value : '';
      const featureCheckboxes = form.querySelectorAll('input[type="checkbox"]');
  
      if (!make || !model || !year || !condition) {
        alert('Please fill all required fields (Make, Model, Year, Condition).');
        return;
      }
  
      const basePrices = {
        Toyota: 200000,
        BMW: 400000,
        Hyundai: 150000
      };
  
      let basePrice = basePrices[make] || 100000;
  
      const currentYear = new Date().getFullYear();
      const age = currentYear - parseInt(year);
      basePrice -= basePrice * 0.05 * age;
  
      if (condition.toLowerCase() === 'used') {
        basePrice *= 0.8;
      }
  
      if (!isNaN(mileage) && mileage > 0) {
        basePrice -= basePrice * 0.03 * Math.floor(mileage / 10000);
      }
  
      featureCheckboxes.forEach(cb => {
        if (cb.checked) basePrice += 5000;
      });
  
      if (basePrice < 0) basePrice = 0;
  
      
      const priceInUSD = basePrice / exchangeRate;
  
      let resultDiv = document.getElementById('valuationResult');
      if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.id = 'valuationResult';
        resultDiv.style.marginTop = '20px';
        resultDiv.style.color = '#22c55e';
        resultDiv.style.fontWeight = 'bold';
        form.parentNode.appendChild(resultDiv);
      }
  
      resultDiv.textContent = `Estimated Vehicle Value: $${priceInUSD.toFixed(2)} USD`;
    });
  });
  