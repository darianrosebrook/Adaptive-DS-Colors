import {LitElement, html, css} from 'lit';
import styles from "../styles";

class Button extends LitElement {
    static get styles() {
        return [styles, css`
            :host {
                display: inline;
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
        }
    }
    constructor() {
        super();
        this.buttonText = '';
    }
    render() {
        return html`
            ${this.buttonText ? html`<style>button{grid-template-columns: 1fr auto;}</style>` : ``}
            <button >
                ${this.buttonText}
                <slot></slot> 
            </button>
            `
    }
}

customElements.define('button-m', Button);