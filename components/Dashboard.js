import { ToDoWidget } from './ToDoWidget.js';
import { QuoteWidget } from './QuoteWidget.js';

export class Dashboard {
#widgets = [];
#nextId = 1;
#widgetTypes = new Map();

constructor(containerId = 'dashboard') {
this.container = document.getElementById(containerId);

if (!this.container) {
throw new Error(
`Контейнер ${containerId} не найден`
);
}

this.registerWidget('todo', ToDoWidget);
this.registerWidget('quote', QuoteWidget);
}

registerWidget(type, WidgetClass) {
if (typeof WidgetClass !== 'function') {
throw new TypeError('Ожидается класс виджета');
}

this.#widgetTypes.set(type, WidgetClass);
}

addWidget(widgetType) {
const WidgetClass = this.#widgetTypes.get(widgetType);

if (!WidgetClass) {
throw new Error(
`Неизвестный тип виджета: ${widgetType}`
);
}

const widget = new WidgetClass();

widget.id = `widget-${this.#nextId++}`;

const element = widget.render();

const removeButton = document.createElement('button');
removeButton.textContent = 'Удалить виджет';

removeButton.addEventListener('click', () => {
this.removeWidget(widget.id);
});

element.appendChild(removeButton);

this.#widgets.push(widget);
this.container.appendChild(element);

return widget;
}

removeWidget(widgetId) {
const index = this.#widgets.findIndex(
widget => widget.id === widgetId
);

if (index === -1) {
return false;
}

const widget = this.#widgets[index];

widget.destroy();
this.#widgets.splice(index, 1);

return true;
}
}