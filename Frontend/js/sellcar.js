// imageUploader.js
document.addEventListener("DOMContentLoaded", () => {
    const MAX_IMAGES = 12;
    const MIN_IMAGES = 3;
  
    const images = [];
    const imageInput = document.getElementById('imageInput');
    const preview = document.getElementById('preview');
    const imageCount = document.getElementById('imageCount');
    const resetBtn = document.getElementById('resetImages');
    const form = document.querySelector('form');
    const errorBox = document.getElementById('imageError');
    const errorText = document.getElementById('imageErrorText');
  
    if (!imageInput || !preview || !imageCount || !resetBtn) return;
  
    imageInput.addEventListener('change', handleImageUpload);
    resetBtn.addEventListener('click', resetImages);
  
    if (form) {
      form.addEventListener('submit', (e) => {
        if (images.length < MIN_IMAGES) {
          e.preventDefault();
          showError(`Please select at least ${MIN_IMAGES} images.`);
        }
      });
    }
  
    function handleImageUpload(e) {
      const files = Array.from(e.target.files);
  
      if (images.length + files.length > MAX_IMAGES) {
        showError(`Maximum ${MAX_IMAGES} images allowed.`);
        return;
      }
  
      files.forEach(file => {
        if (!file.type.startsWith('image/')) return;
  
        const reader = new FileReader();
        reader.onload = () => {
          images.push({ file, url: reader.result });
          updateImageDisplay();
        };
        reader.readAsDataURL(file);
      });
  
      imageInput.value = ''; 
    }
  
    function updateImageDisplay() {
      preview.innerHTML = '';
  
      images.forEach((img, index) => {
        const container = document.createElement('div');
        container.className = 'relative group aspect-square animate-fade-in';
  
        const imgElement = document.createElement('img');
        imgElement.src = img.url;
        imgElement.className = 'w-full h-full object-cover rounded-xl shadow-sm transform group-hover:scale-105 transition-transform';
  
        const removeBtn = document.createElement('button');
        removeBtn.className = 'absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md hover:bg-red-600';
        removeBtn.innerHTML = '<i class="fas fa-times text-xs"></i>';
        removeBtn.addEventListener('click', () => removeImage(index));
  
        container.appendChild(imgElement);
        container.appendChild(removeBtn);
        preview.appendChild(container);
      });
  
      updateCounter();
      hideError();
    }
  
    function updateCounter() {
      imageCount.innerHTML = `<i class="fas fa-images mr-2"></i>${images.length}/${MAX_IMAGES} photos selected`;
    }
  
    function removeImage(index) {
      images.splice(index, 1);
      updateImageDisplay();
    }
  
    function resetImages() {
      images.length = 0;
      updateImageDisplay();
    }
  
    function showError(message) {
      if (!errorBox || !errorText) return;
  
      errorText.textContent = message;
      errorBox.classList.remove('hidden');
    }
    function hideError() {
      if (errorBox) errorBox.classList.add('hidden');
    }
  });
  
// validate english letters
document.addEventListener('DOMContentLoaded', () => {
    const englishOnlyFields = document.querySelectorAll('[data-validate="english"]');
  
    englishOnlyFields.forEach(field => {
      const errorMessage = document.getElementById(`error-message-${field.id}`);
  
      // 1. Prevent typing non-English characters
      field.addEventListener('keydown', (e) => {
        const key = e.key;
  
        const isAllowed = /^[a-zA-Z\s]$/.test(key) ||
          ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'].includes(key);
  
        if (!isAllowed) {
          e.preventDefault();
          if (errorMessage) {
            errorMessage.classList.remove('hidden');
            field.classList.add('border-red-500', 'focus:ring-red-400', 'focus:border-red-400');
          }
        } else {
          if (errorMessage) {
            errorMessage.classList.add('hidden');
            field.classList.remove('border-red-500', 'focus:ring-red-400', 'focus:border-red-400');
          }
        }
      });
  
      // 2. Clean pasted content and show/hide error
      field.addEventListener('input', () => {
        const validValue = field.value.replace(/[^a-zA-Z\s]/g, '');
        if (field.value !== validValue) {
          field.value = validValue;
          if (errorMessage) {
            errorMessage.classList.remove('hidden');
            field.classList.add('border-red-500', 'focus:ring-red-400', 'focus:border-red-400');
          }
        } else {
          if (errorMessage) {
            errorMessage.classList.add('hidden');
            field.classList.remove('border-red-500', 'focus:ring-red-400', 'focus:border-red-400');
          }
        }
      });
    });
  });
  

// add feature section
  document.addEventListener('DOMContentLoaded', () => {
    const addFeatureBtn = document.getElementById('addFeatureBtn');
    const featureTitle = document.getElementById('featureTitle');
    const featureDesc = document.getElementById('featureDesc');
    const featuresList = document.getElementById('featuresList');
  
    const errorTitle = document.getElementById('error-message-featureTitle');
    const errorDesc = document.getElementById('error-message-featureDesc');
  
    addFeatureBtn.addEventListener('click', () => {
      const title = featureTitle.value.trim();
      const desc = featureDesc.value.trim();
      let hasError = false;
  
      // Validate title
      if (title === '') {
        errorTitle.classList.remove('hidden');
        featureTitle.classList.add('border-red-500', 'focus:ring-red-400', 'focus:border-red-400');
        hasError = true;
      } else {
        errorTitle.classList.add('hidden');
        featureTitle.classList.remove('border-red-500', 'focus:ring-red-400', 'focus:border-red-400');
      }
  
      // Validate description
      if (desc === '') {
        errorDesc.textContent = 'Description is required.';
        errorDesc.classList.remove('hidden');
        featureDesc.classList.add('border-red-500', 'focus:ring-red-400', 'focus:border-red-400');
        hasError = true;
      } else {
        errorDesc.classList.add('hidden');
        featureDesc.classList.remove('border-red-500', 'focus:ring-red-400', 'focus:border-red-400');
      }
  
      // Check max 4 features
      const currentFeatures = featuresList.querySelectorAll('li').length;
      if (currentFeatures >= 4) {
        errorDesc.textContent = 'Maximum 4 features allowed.';
        errorDesc.classList.remove('hidden');
        featureDesc.classList.add('border-red-500', 'focus:ring-red-400', 'focus:border-red-400');
        return;
      }
  
      if (hasError) return;
  
      // Create new feature item
      const li = document.createElement('li');
      li.className = 'bg-gray-700 p-4 rounded-xl shadow-sm border border-gray-600 flex justify-between items-start gap-4 group';
  
      const content = document.createElement('div');
      content.innerHTML = `<strong class="text-white">${title}</strong><p class="text-sm text-gray-300 mt-1">${desc}</p>`;
  
      const removeBtn = document.createElement('button');
      removeBtn.className = 'text-red-400 hover:text-red-300 text-sm font-medium transition-colors';
      removeBtn.innerHTML = '<i class="fas fa-trash-alt mr-1"></i>Remove';
      removeBtn.addEventListener('click', () => {
        li.remove();
        // Reset error message if previously blocked
        errorDesc.classList.add('hidden');
        featureDesc.classList.remove('border-red-500', 'focus:ring-red-400', 'focus:border-red-400');
      });
  
      li.appendChild(content);
      li.appendChild(removeBtn);
      featuresList.appendChild(li);
  
      // Clear fields
      featureTitle.value = '';
      featureDesc.value = '';
    });
  });
  
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
  
// Form validation fields with button Publish
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sellCarForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            console.log('Form is valid, proceeding with submission...');
            
        }
    });
    
    function validateForm() {
        let isValid = true;
        
        const requiredFields = form.querySelectorAll('input, select, textarea:not([data-optional="true"])');
        
        requiredFields.forEach(field => {
            const fieldId = field.id;
            const errorElement = document.getElementById(`error-message-${fieldId}`);
            
            if (field.hasAttribute('data-optional') && field.getAttribute('data-optional') === 'true') {
                return;
            }
            
            if (errorElement) errorElement.classList.add('hidden');
            field.classList.remove('border-red-500', 'focus:ring-red-400', 'focus:border-red-400');
            
            const fieldValue = field.value.trim();
            let fieldIsValid = true;
            let errorMessage = '';
            
            if (!fieldValue) {
                fieldIsValid = false;
                errorMessage = getErrorMessage(fieldId);
            }
            
            if (fieldIsValid && fieldValue) {
                switch (fieldId) {
                    case 'mileage':
                    case 'engine':
                    case 'seats':
                    case 'price':
                        if (isNaN(fieldValue) || parseFloat(fieldValue) <= 0) {
                            fieldIsValid = false;
                            errorMessage = `Please enter a valid ${getFieldName(fieldId)}.`;
                        }
                        break;
                    case 'location':
                    case 'safetyFeature':
                        if (!/^[a-zA-Z\s]+$/.test(fieldValue)) {
                            fieldIsValid = false;
                            errorMessage = 'Only English letters and spaces are allowed.';
                        }
                        break;
                }
            }

            if (!fieldIsValid) {
                isValid = false;
                if (errorElement) {
                    errorElement.textContent = errorMessage;
                    errorElement.classList.remove('hidden');
                }
                field.classList.add('border-red-500', 'focus:ring-red-400', 'focus:border-red-400');

                if (isValid === false) {
                    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    field.focus();
                }
            }
        });

        // Validate selected color
        const selectedColor = document.getElementById('selectedColor');
        const selectedColorValue = selectedColor?.value?.trim();
        const colorError = document.getElementById('error-message-selectedColor');

        if (!selectedColorValue) {
            isValid = false;

            if (colorError) {
                colorError.textContent = 'Please select a color.';
                colorError.classList.remove('hidden');
            }

            if (selectedColor) {
                selectedColor.scrollIntoView({ behavior: 'smooth', block: 'center' });
                selectedColor.focus();
                selectedColor.classList.add('border-red-500', 'focus:ring-red-400', 'focus:border-red-400');
            }
        } else {
            if (colorError) colorError.classList.add('hidden');
            selectedColor.classList.remove('border-red-500', 'focus:ring-red-400', 'focus:border-red-400');
        }

        // Validate images (min 3)
        const imagePreview = document.getElementById('preview');
        if (imagePreview && imagePreview.children.length < 3) {
            isValid = false;
            const imageError = document.getElementById('imageError');
            const imageErrorText = document.getElementById('imageErrorText');
            if (imageError && imageErrorText) {
                imageErrorText.textContent = 'Please select at least 3 images.';
                imageError.classList.remove('hidden');
            }
        }

        return isValid;
    }
    
    function getErrorMessage(fieldId) {
        const errorMessages = {
            'brand': 'Please select a brand.',
            'model': 'Please select a model.',
            'condition': 'Please select a condition.',
            'year': 'Please select a year.',
            'location': 'Please enter the location.',
            'safetyFeature': 'Please enter a safety feature.',
            'transmission': 'Please select a transmission type.',
            'fuel': 'Please select a fuel type.',
            'mileage': 'Please enter the mileage.',
            'engine': 'Please enter the engine capacity.',
            'seats': 'Please enter the number of seats.',
            'price': 'Please enter the price.'
        };
        return errorMessages[fieldId] || 'This field is required.';
    }
    
    function getFieldName(fieldId) {
        const fieldNames = {
            'mileage': 'mileage',
            'engine': 'engine capacity',
            'seats': 'number of seats',
            'price': 'price'
        };
        return fieldNames[fieldId] || fieldId;
    }
});

// start featching data model and brands 
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
    const brandSelect = document.getElementById('brand');
    const uniqueBrands = [...new Set(cars.map(car => car.brand))];

    brandSelect.appendChild(createOption('', 'Select Brand'));
    uniqueBrands.forEach(brand => brandSelect.appendChild(createOption(brand)));
}

async function populateModels(selectedBrand) {
    const modelSelect = document.getElementById('model');
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
    document.getElementById('brand').addEventListener('change', (e) => {
        if (e.target.value) {
            populateModels(e.target.value);
        }
    });
});
// End featching data model and brands 



// Start: Color selection script (predefined + custom)
document.addEventListener('DOMContentLoaded', () => {
    const colorGrid = document.getElementById('colorGrid');
    const selectedColorInput = document.getElementById('selectedColor');
    const colorPicker = document.getElementById('colorPicker');

    // Predefined color palette
    const predefinedColors = [
        '#FF0000',  // Red
        '#0000FF',  // Blue
        '#FFFF00',  // Yellow
        '#000000',  // Black
        '#FFFFFF',  // White
        '#A52A2A',  // Brown
        '#808080'   // Gray
    ];

    // Render color buttons
    predefinedColors.forEach(color => {
        const button = createColorButton(color);
        colorGrid.appendChild(button);
    });

    // Handle custom color picker selection
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            const customColor = e.target.value;
            // Remove active states from predefined colors
            clearActiveColorStyles();
            // Set selected color
            selectedColorInput.value = customColor;
        });
    }

    // Function to create a color button
    function createColorButton(color) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'h-10 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all duration-200 relative overflow-hidden shadow-sm';
        button.style.backgroundColor = color;
        button.title = color;

        // Checkmark overlay
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 hidden items-center justify-center bg-black bg-opacity-30';
        overlay.innerHTML = '<i class="fas fa-check text-white text-xl"></i>';

        button.appendChild(overlay);

        button.addEventListener('click', (e) => {
            e.preventDefault();
            selectColor(button, color);
        });

        return button;
    }

    // Handle color selection and styling
    function selectColor(button, color) {
        clearActiveColorStyles();

        // Apply active style
        button.classList.add('border-blue-500', 'scale-110');
        const overlay = button.querySelector('div');
        if (overlay) overlay.classList.remove('hidden');

        // Set selected color value
        selectedColorInput.value = color;

        // Optionally: update colorPicker to match
        if (colorPicker) colorPicker.value = color;
    }

    // Clear all selected styles
    function clearActiveColorStyles() {
        const buttons = colorGrid.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.classList.remove('border-blue-500', 'scale-110');
            const overlay = btn.querySelector('div');
            if (overlay) overlay.classList.add('hidden');
        });
    }
});

// End: Color selection script
