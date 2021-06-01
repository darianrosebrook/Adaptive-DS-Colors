import {LitElement, html, css} from 'lit';
import styles from "../styles";

class Button extends LitElement {
    static get styles() {
        return [styles, css`
            :host {
                display: inline-block;
            }
            button {
                display: inline-grid;
                align-items: center;
            }
        `]
    }
    static get properties() {
        return {
            buttonText: {type: String},
            context: {type: String},
            key: {type: Number}
        }
    }
    constructor() {
        super();
        this.buttonText = '';
        this.context = ';'
        this.key = 0;
    }
    render() {
        return html`
            ${this.buttonText ? html`<style>button{grid-template-columns: 1fr auto;}</style>` : ``}
            <button @click=${this._handleClick}>
                ${this.buttonText}
                <slot></slot> 
            </button>
            `
    }
    _handleClick = () => {
        const event = new CustomEvent('buttonClick', {
            bubbles: true,
            composed: true,
            detail: {context: this.context,key: this.key}
          });

        this.dispatchEvent(event);
    }
}

customElements.define('button-m', Button);