import { UIComponent } from './UIComponent.js';

export class ToDoWidget extends UIComponent {
#tasks = [];
#nextId = 1;

constructor() {
super('Список задач', 'todo-widget');
}

render() {
const container = super.render();
container.classList.add('todo-widget');

const title = document.createElement('h2');
title.textContent = this.title;

const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Введите задачу';
input.setAttribute('aria-label', 'Новая задача');

const button = document.createElement('button');
button.textContent = 'Добавить';

const list = document.createElement('ul');

button.addEventListener('click', () => {
this.#addTask(input.value, list);
input.value = '';
input.focus();
});

input.addEventListener('keydown', (event) => {
if (event.key === 'Enter') {
button.click();
}
});

container.append(title, input, button, list);

return container;
}

#addTask(text, list) {
const value = text.trim();

if (!value) return;

const task = {
id: this.#nextId++,
text: value
};

this.#tasks.push(task);

const item = document.createElement('li');
item.textContent = task.text;

const deleteButton = document.createElement('button');
deleteButton.textContent = 'Удалить';

deleteButton.addEventListener('click', () => {
this.#removeTask(task.id, item);
});

item.appendChild(deleteButton);
list.appendChild(item);
}

#removeTask(id, item) {
this.#tasks = this.#tasks.filter(
task => task.id !== id
);

item.remove();
}

destroy() {
this.#tasks = [];
super.destroy();
}
}