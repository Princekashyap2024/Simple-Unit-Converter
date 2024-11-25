// Data for units and conversion factors
const units = {
  length: {
    "Meter": 1,
    "Kilometer": 0.001,
    "Centimeter": 100,
    "Millimeter": 1000,
    "Mile": 0.000621371,
    "Yard": 1.09361,
    "Foot": 3.28084,
    "Inch": 39.3701
  },
  temperature: {
    "Celsius": "C",
    "Fahrenheit": "F",
    "Kelvin": "K"
  },
  weight: {
    "Kilogram": 1,
    "Gram": 1000,
    "Pound": 2.20462,
    "Ounce": 35.274
  }
};

// DOM Elements
const categorySelect = document.getElementById('category');
const fromUnitSelect = document.getElementById('from-unit');
const toUnitSelect = document.getElementById('to-unit');
const inputValue = document.getElementById('input-value');
const resultDiv = document.getElementById('result');

// Populate unit dropdowns based on category
function populateUnits(category) {
  fromUnitSelect.innerHTML = '';
  toUnitSelect.innerHTML = '';
  const unitKeys = Object.keys(units[category]);
  unitKeys.forEach(unit => {
    fromUnitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
    toUnitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
  });
}

// Convert value
function convertValue() {
  const category = categorySelect.value;
  const fromUnit = fromUnitSelect.value;
  const toUnit = toUnitSelect.value;
  const value = parseFloat(inputValue.value);

  if (isNaN(value)) {
    resultDiv.textContent = "Result: Please enter a valid number.";
    return;
  }

  let result;

  if (category === "length" || category === "weight") {
    const fromFactor = units[category][fromUnit];
    const toFactor = units[category][toUnit];
    result = value * (toFactor / fromFactor);
  } else if (category === "temperature") {
    if (fromUnit === toUnit) {
      result = value;
    } else if (fromUnit === "Celsius" && toUnit === "Fahrenheit") {
      result = (value * 9/5) + 32;
    } else if (fromUnit === "Celsius" && toUnit === "Kelvin") {
      result = value + 273.15;
    } else if (fromUnit === "Fahrenheit" && toUnit === "Celsius") {
      result = (value - 32) * 5/9;
    } else if (fromUnit === "Fahrenheit" && toUnit === "Kelvin") {
      result = (value - 32) * 5/9 + 273.15;
    } else if (fromUnit === "Kelvin" && toUnit === "Celsius") {
      result = value - 273.15;
    } else if (fromUnit === "Kelvin" && toUnit === "Fahrenheit") {
      result = (value - 273.15) * 9/5 + 32;
    }
  }

  resultDiv.textContent = `Result: ${result.toFixed(2)} ${toUnit}`;
}

// Event Listeners
categorySelect.addEventListener('change', () => {
  populateUnits(categorySelect.value);
  convertValue();
});

fromUnitSelect.addEventListener('change', convertValue);
toUnitSelect.addEventListener('change', convertValue);
inputValue.addEventListener('input', convertValue);

// Initialize
populateUnits(categorySelect.value);
