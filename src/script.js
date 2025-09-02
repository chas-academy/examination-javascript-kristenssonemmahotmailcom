





// Transaktionslistor
const incomes = [];
const expenses = [];

// Funktion för att hämta HTML-element dynamiskt
function getDescriptionInput() {
  return document.getElementById('desc');
}
function getAmountInput() {
  return document.getElementById('amount');
}
function getIncomeList() {
  return document.getElementById('incomeList');
}
function getExpenseList() {
  return document.getElementById('expenseList');
}
function getBalanceDisplay() {
  return document.getElementById('balance');
}

// Event-lyssnare för knappar
const incomeBtn = document.getElementById('incomeBtn');
if (incomeBtn) {
  incomeBtn.addEventListener('click', () => addTransaction('income'));
}
const expenseBtn = document.getElementById('expenseBtn');
if (expenseBtn) {
  expenseBtn.addEventListener('click', () => addTransaction('expense'));
}
// Event-lyssnare


function addTransaction(type, description, amount) {
  // Om beskrivning och amount inte skickas in, hämta från input-fälten
  if (typeof description === 'undefined') {
    description = getDescriptionInput().value.trim();
  }
  if (typeof amount === 'undefined') {
    amount = parseFloat(getAmountInput().value);
  }

  if (description === '' || isNaN(amount) || amount <= 0) {
    alert('Fyll i en giltig beskrivning och ett positivt belopp.');
    return;
  }

  const transaction = { description, amount };

  if (type === 'income') {
    incomes.push(transaction);
    updateList(getIncomeList(), incomes, 'income');
  } else {
    expenses.push(transaction);
    updateList(getExpenseList(), expenses, 'expense');
  }

  updateBalance();
  clearInputs();
}

function updateList(listElement, transactions, type) {
  const typeLabel = type === 'income' ? 'Inkomst' : 'Utgift';
  listElement.textContent = transactions
    .map(item => `${item.description} - ${item.amount} kr (${typeLabel})`)
    .join('');
}

function updateBalance() {
  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const total = totalIncome - totalExpense;
  // Visa alltid som sträng, och utgift som negativt värde
  getBalanceDisplay().textContent = total.toString();
}

function clearInputs() {
  getDescriptionInput().value = '';
  getAmountInput().value = '';
}

// Export för testmiljö (Node)
if (typeof module !== 'undefined') {
  module.exports = { addTransaction, incomes, expenses };
}
window.addTransaction = addTransaction;
