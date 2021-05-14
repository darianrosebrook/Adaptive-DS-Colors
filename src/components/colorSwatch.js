import {LitElement, html, css} from 'lit';
class ColorSwatch extends LitElement {
    static get styles() {
        return css `input[type='color'] {
            -webkit-appearance: none;
            height: 32px;
            width: 32px;
            border: 0;
            padding: 0;
            margin: 0;
            background-color: transparent;
            border: none;
            border-collapse: collapse;
            outline: none;
            border-radius: 4px;
        }
        input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0px;
  border: none;
}
input[type="color"]::-webkit-color-swatch {
    border: 1px solid var(--neutral-dark);
    border-radius: 4px;
}]`;
    }
    static get properties() {
        return {
        }
    }

    constructor() {
        super();
    }
    render() {
        return html`
                <input type="color" value="#ffffff" />
                `
    }
} 
customElements.define('color-swatch', ColorSwatch);