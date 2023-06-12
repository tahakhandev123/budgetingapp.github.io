// Global variables
let monthlyBudget = 0;
let expenses = [];

// DOM elements
const budgetInput = document.getElementById('budgetInput');
const addBudgetBtn = document.getElementById('addBudgetBtn');
const descriptionInput = document.getElementById('descriptionInput');
const amountInput = document.getElementById('amountInput');
const dateInput = document.getElementById('dateInput');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const expenseTableBody = document.getElementById('expenseTableBody');
const remainingBudget = document.getElementById('remainingBudget');

// Event listeners
addBudgetBtn.addEventListener('click', addBudget);
addExpenseBtn.addEventListener('click', addExpense);

// Functions
function addBudget() {
  const budgetValue = parseFloat(budgetInput.value);
  if (!isNaN(budgetValue) && budgetValue > 0) {
    monthlyBudget = budgetValue;
    budgetInput.value = '';
    updateRemainingBudget();
  }
}

function addExpense() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;
  if (description !== '' && !isNaN(amount) && amount > 0 && date !== '') {
    const expense = {
      description: description,
      amount: amount,
      date: date
    };
    expenses.push(expense);
    descriptionInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
    updateExpenseTable();
    updateRemainingBudget();
  }
}

function updateExpenseTable() {
  expenseTableBody.innerHTML = '';
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const row = document.createElement('tr');
    const descriptionCell = document.createElement('td');
    const amountCell = document.createElement('td');
    const dateCell = document.createElement('td');
    descriptionCell.textContent = expense.description;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    row.appendChild(descriptionCell);
    row.appendChild(amountCell);
    row.appendChild(dateCell);
    expenseTableBody.appendChild(row);
  }
}

function updateRemainingBudget() {
  let totalExpenses = 0;
  for (let i = 0; i < expenses.length; i++) {
    totalExpenses += expenses[i].amount;
  }
  const remaining = monthlyBudget - totalExpenses;
  remainingBudget.textContent = 'Remaining Budget: ' + remaining;
}

