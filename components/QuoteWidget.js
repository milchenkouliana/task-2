import { UIComponent } from './UIComponent.js';

export class QuoteWidget extends UIComponent {
#quotes = [
{
text: 'Безопасность начинается с осознанности.',
author: 'Cybersecurity'
},
{
text: 'Сложность системы не гарантирует её безопасность.',
author: 'Принцип безопасности'
},
{
text: 'Любая система требует регулярных обновлений.',
author: 'Cybersecurity'
},
{
text: 'Защита данных начинается с понимания рисков.',
author: 'Информационная безопасность'
},
{
text: 'Надёжная система должна учитывать человеческие ошибки.',
author: 'Принцип проектирования'
}
];

#currentIndex = -1;

constructor() {
super('Цитаты о безопасности', 'quote-widget');
}

#getRandomQuote() {
if (this.#quotes.length === 0) {
return null;
}

let index;

do {
index = Math.floor(
Math.random() * this.#quotes.length
);
} while (
index === this.#currentIndex &&
this.#quotes.length > 1
);

this.#currentIndex = index;

return this.#quotes[index];
}

render() {
const container = super.render();
container.classList.add('quote-widget');

const title = document.createElement('h2');
title.textContent = this.title;

const quoteText = document.createElement('blockquote');
const quoteAuthor = document.createElement('p');

quoteAuthor.classList.add('quote-author');

const button = document.createElement('button');
button.textContent = 'Новая цитата';

const updateQuote = () => {
const quote = this.#getRandomQuote();

if (!quote) {
quoteText.textContent = 'Цитаты отсутствуют';
quoteAuthor.textContent = '';
return;
}

quoteText.textContent = quote.text;
quoteAuthor.textContent = quote.author;
};

button.addEventListener('click', updateQuote);

container.append(
title,
quoteText,
quoteAuthor,
button
);

updateQuote();

return container;
}

destroy() {
this.#currentIndex = -1;
super.destroy();
}
}