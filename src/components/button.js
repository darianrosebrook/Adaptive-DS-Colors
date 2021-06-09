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
                min-height: 3rem;
            }
            .disabled {
                border: 1px solid var(--cr-grey-10);
                color: var(--cr-grey-40);
                pointer-events: none;
            }
        `]
    }
    static get properties() {
        return {
            buttonText: {type: String},
            context: {type: String},
            key: {type: Number},
            disabledButton: {type: Boolean}
        }
    }
    constructor() {
        super();
        this.buttonText = '';
        this.context = ';'
        this.key = 0;
        this.disabledButton = false;
    }
    render() {
        return html`
            ${this.buttonText ? html`<style>button{grid-template-columns: 1fr auto;}</style>` : null}
            ${this.disabledButton ? 
                html`<button class="disabled" disabled>${this.buttonText}
                        <slot></slot> 
                    </button>` 
                : html`<button @click=${this._handleClick}>${this.buttonText}
                        <slot></slot> 
                    </button>`
            }
                
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