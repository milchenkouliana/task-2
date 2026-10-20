import { Dashboard } from './components/Dashboard.js';

document.addEventListener('DOMContentLoaded', () => {
const dashboard = new Dashboard();

const addTodoButton = document.getElementById('add-todo');
const addQuoteButton = document.getElementById('add-quote');

if (addTodoButton) {
addTodoButton.addEventListener('click', () => {
dashboard.addWidget('todo');
});
}

if (addQuoteButton) {
addQuoteButton.addEventListener('click', () => {
dashboard.addWidget('quote');
});
}
});