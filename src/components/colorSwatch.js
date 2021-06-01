import {LitElement, html, css} from 'lit';

class ColorSwatch extends LitElement {
    static get styles() {
        return css `input[type='color'] {
            -webkit-appearance: none;
            height: 48px;
            width: 48px;
            border: 0;
            padding: 0;
            margin: 0 0 .5rem 0;
            background-color: transparent;
            border: none;
            border-collapse: collapse;
            outline: none;
            border-radius: 4px;
            cursor: pointer;
        }
        input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0px;
  border: none;
}
input[type="color"]::-webkit-color-swatch {
    border: 1px solid var(--df-dark-neutral-dark);
    border-radius: 4px;
}]`;
    }
    static get properties() {
        return {
            colorValue: {
                color: {type: String},
                key: {type: Number}
            },
            _handleChange: {type: Object}
        }
    }
    constructor() {
        super();
        this.colorValue = {color: '#ffffff', key: 0}
    }



    render() {
        return html`
                <input type="color" @change=${this._handleChange} .value="${this.colorValue.color}" />
                `
    }
    _handleChange = (e) => {
        this.colorValue.color = e.target.value;
        const event = new CustomEvent('handleInputChange', {
            bubbles: true,
            composed: true,
            detail: {value: this.colorValue.color, key: this.colorValue.key}
          });
        this.dispatchEvent(event);
    }
} 
customElements.define('color-swatch', ColorSwatch);