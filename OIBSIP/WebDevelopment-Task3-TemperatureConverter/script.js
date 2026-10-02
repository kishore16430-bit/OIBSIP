const temperatureInput = document.getElementById('temperature');
const inputUnitSelect = document.getElementById('input-unit');
const convertButton = document.getElementById('convert-btn');
const errorMessage = document.getElementById('error-message');

const celsiusResult = document.getElementById('celsius-result');
const fahrenheitResult = document.getElementById('fahrenheit-result');
const kelvinResult = document.getElementById('kelvin-result');

function toCelsius(value, unit) {
  switch (unit) {
    case 'celsius':
      return value;
    case 'fahrenheit':
      return (value - 32) * (5 / 9);
    case 'kelvin':
      return value - 273.15;
    default:
      return value;
  }
}

function formatNumber(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return '--';
  return Math.abs(num) < 0.0001 ? '0' : num.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
}

function convertTemperature() {
  const rawValue = temperatureInput.value.trim();

  if (rawValue === '') {
    errorMessage.textContent = 'Please enter a temperature value.';
    return;
  }

  const numericValue = Number(rawValue);

  if (Number.isNaN(numericValue)) {
    errorMessage.textContent = 'Please enter a valid number.';
    return;
  }

  const selectedUnit = inputUnitSelect.value;
  const celsiusValue = toCelsius(numericValue, selectedUnit);

  if (celsiusValue < -273.15) {
    errorMessage.textContent = 'Temperature is below absolute zero (-273.15°C). Please try a valid value.';
    return;
  }

  errorMessage.textContent = '';

  const fahrenheitValue = (celsiusValue * 9) / 5 + 32;
  const kelvinValue = celsiusValue + 273.15;

  celsiusResult.textContent = `${formatNumber(celsiusValue)} °C`;
  fahrenheitResult.textContent = `${formatNumber(fahrenheitValue)} °F`;
  kelvinResult.textContent = `${formatNumber(kelvinValue)} K`;
}

convertButton.addEventListener('click', convertTemperature);
