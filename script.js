let currentInput = "";
let history = [];
let isDarkMode = false;

function appendNumber(number) {
  if (number === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
  currentInput += number;
  document.getElementById("display").value = currentInput;
}

function appendOperator(operator) {
  currentInput += " " + operator + " ";
  document.getElementById("display").value = currentInput;
}

function clearDisplay() {
  currentInput = "";
  document.getElementById("display").value = currentInput;
}

function calculateResult() {
  try {
    currentInput = currentInput.replace('%', '/100');
    currentInput = currentInput.replace('^', '**'); // Handle exponentiation
    currentInput = eval(currentInput).toString();
    document.getElementById("display").value = currentInput;
    history.push(currentInput);
    updateHistory();
  } catch (error) {
    document.getElementById("display").value = "Error";
    currentInput = "";
  }
}

function deleteLastCharacter() {
  currentInput = currentInput.slice(0, -1);
  document.getElementById("display").value = currentInput;
}

function updateHistory() {
  let historyContainer = document.getElementById("history");
  historyContainer.innerHTML = history.map(item => `<p>${item}</p>`).join('');
}

function clearHistory() {
  history = [];
  updateHistory();
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    document.body.style.background = '#333';
    document.body.style.color = '#fff';
    document.querySelector('.calculator').style.background = '#444';
    document.querySelectorAll('button').forEach(button => {
      button.style.background = '#555';
      button.style.color = '#fff';
    });
    document.querySelector('input').style.background = '#333';
  } else {
    document.body.style.background = 'linear-gradient(135deg, #f0f4f7, #dfe9f3)';
    document.body.style.color = '#333';
    document.querySelector('.calculator').style.background = '#fff';
    document.querySelectorAll('button').forEach(button => {
      button.style.background = 'linear-gradient(145deg, #6c8dff, #4662d1)';
      button.style.color = '#fff';
    });
    document.querySelector('input').style.background = '#f8f8f8';
  }
}

document.addEventListener('keydown', function(event) {
  if (event.key >= 0 && event.key <= 9) {
    appendNumber(event.key);
  }
  if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
    appendOperator(event.key);
  }
  if (event.key === 'Enter') {
    calculateResult();
  }
  if (event.key === 'Backspace') {
    deleteLastCharacter();
  }
});
