const balance = document.getElementById('total-balance');
const money_plus = document.getElementById('total-income');
const money_minus = document.getElementById('total-expense');
const list = document.getElementById('list');
const form = document.getElementById('transaction-form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const category = document.getElementById('category');

// Mock Database (Simulating Spring Boot/SQL Backend)
let transactions = [
    { id: 1, text: 'Tech Corp Salary', amount: 4500, category: 'Income' },
    { id: 2, text: 'Uber Rides', amount: -65, category: 'Transportation' },
    { id: 3, text: 'Whole Foods', amount: -210, category: 'Food & Dining' },
    { id: 4, text: 'Electricity Bill', amount: -120, category: 'Utilities' },
    { id: 5, text: 'Netflix Subscription', amount: -15, category: 'Entertainment' }
];

let expenseChartInstance = null;

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
            category: category.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateChart();

        text.value = '';
        amount.value = '';
    }
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        <div>
            ${transaction.text} <span class="category-tag">${transaction.category}</span>
        </div>
        <span>${sign}$${Math.abs(transaction.amount)}</span>
    `;

    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

// Update Chart.js visualization
function updateChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    
    // Group expenses by category
    const expenseCategories = {};
    transactions.forEach(t => {
        if (t.amount < 0) {
            expenseCategories[t.category] = (expenseCategories[t.category] || 0) + Math.abs(t.amount);
        }
    });

    const labels = Object.keys(expenseCategories);
    const data = Object.values(expenseCategories);

    if (expenseChartInstance) {
        expenseChartInstance.destroy(); // Destroy old chart before drawing new one
    }

    expenseChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels.length > 0 ? labels : ['No Expenses'],
            datasets: [{
                data: data.length > 0 ? data : [1],
                backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#e5e7eb'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });
}

// Initialize App
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
    updateChart();
}

init();
form.addEventListener('submit', addTransaction);
