import {LitElement, html, css} from 'lit';
import styles from '../styles'

class ColorRampResults extends LitElement {
    static get styles() {
        return [styles, css`
            .container {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 1rem;
            }
            p {
                display:inline;
                margin: 0;
            }
            input {
                width: 100%;
                margin-bottom: .5rem;
            }
            .ramp-results {
                border: 1px solid var(--df-dark-neutral-dark);
                border-radius: 4px;
                overflow: hidden;
            }
            .ramp-item {
                display: grid;
                grid-template-columns: 1fr 1fr;
                justify-content: space-between;
                color: #000;
                padding: 1.25rem .5rem;
            }
            .inputs-container {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;
            }
        `]
    }
    render() {
        return html`
            <div class="container">
                <div class="inputs-container">
                ${this.ratios.map((item, key) => {
                        return html`<input @change=${e => this._handleChange(e, key)} type="text" placeholder="${(key + 1) * 100}" } value="${(key + 1) * 100}" } />`})}
                    
                </div>
                
                <div class="ramp-results">
                    
                ${this.ratios.map((item, key) => {
                    return html`
                        <div class="ramp-item" .style=${`color: ${this.colorResults[key].contrastDisplay};background: ${this.colorResults[key].color}`} >
                            <p>${this.colorResults[key].contrastRatio}</p><p>${this.colorResults[key].color}</p>
                        </div>
                    `})}
                </div>
            </div>
            
        `
    }
    static get properties() {
        return {
            ratios: {type: Array },
            colorResults: [
                {
                    colorStop: {type: String},
                    contrastDisplay: {type: String},
                    contrastRatio: {type: Number},
                    color: {type: String},
                }
            ],
            stops: {type: Array}
        }
    }
    constructor() {
        super();
        this.ratios = [1];
        this.stops = ['100'];
        this.colorResults = [];
    }
    _handleChange(e, key) {
        this.stops[key] = e.target.value;
        const event = new CustomEvent('colorThemeChange', {
            bubbles: true,
            composed: true,
            detail: {value: e.target.value, key}
          });
        this.dispatchEvent(event);
    }
}
customElements.define('color-results', ColorRampResults)