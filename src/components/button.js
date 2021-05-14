import {LitElement, html, css} from 'lit';

class Button extends LitElement {
    static get styles() {
        return css `
            button {
                padding: 12px;
                border: 1px solid var(--neutral-dark);
                border-radius: 4px;
                background: inherit;
            }
        `
    }
    render() {
        return html`<button> <slot></slot> </button>`
    }
}

customElements.define('button-m', Button);