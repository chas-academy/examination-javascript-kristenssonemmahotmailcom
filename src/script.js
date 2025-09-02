

let incomes = [];
let expenses = [];


// HTML - Elements
let htmlBeskrivning = document.getElementById("desc");
let htmlBelopp = document.getElementById("amount");
let incomeList = document.getElementById("incomeList");
let expenseList = document.getElementById("expenseList");
let transactionList = document.getElementById("transactionList");
let totalDisplay = document.getElementById("balance");

// Event - Lyssnare
document.getElementById("incomeBtn").addEventListener('click', () => addTransaction('income'));
document.getElementById("expenseBtn").addEventListener('click', () => addTransaction('expense'));

// Funktion för att lägga till en transaktion
function addTransaction(type) {
  const description = htmlBeskrivning.value.trim();
  const amount = parseFloat(htmlBelopp.value);

  if (description === "" || isNaN(amount)) {
    alert("Vänligen ange en giltig beskrivning och belopp.");
    return;
  }

  const transaction = {
    description: description,
    amount: amount
  };

  if (type === 'income') {
    incomes.push(transaction);
    updateList(incomeList, incomes);
  } else {
    expenses.push(transaction);
    updateList(expenseList, expenses);
  }

  updateTotal();
  clearInputs();
}
// Funktion för att uppdatera listor
function updateList(listElement, transactions) {
  listElement.innerHTML = '';
  transactions.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.description}: ${item.amount} kr`;
    listElement.appendChild(li);
  });
}

// Funktion för att uppdatera det totala saldot
function updateTotal() {
  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const total = totalIncome - totalExpense;
  if (totalDisplay) {
    totalDisplay.textContent = total + ' kr';
  }
}

// Funktion för att rensa input-fält
function clearInputs() {
  htmlBeskrivning.value = '';
  htmlBelopp.value = '';
}
