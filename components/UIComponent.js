export class UIComponent {
constructor(title, id) {
if (new.target === UIComponent) {
throw new Error('UIComponent is an abstract class');
}

this.title = title;
this.id = id;
this.element = null;
}

render() {
const div = document.createElement('div');
div.id = this.id;

this.element = div;

return div;
}

destroy() {
if (this.element) {
this.element.remove();
this.element = null;
}
}
}
