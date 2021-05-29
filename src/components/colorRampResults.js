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
                        return html`<input type="text" placeholder="${(key + 1) * 100}" />`})}
                    
                </div>
                
                <div class="ramp-results">
                    
                ${this.ratios.map((item, key) => {
                    return html`
                        <div class="ramp-item" style="background:${this.results[key]};">
                            <p>${item}</p><p>${this.results[key]}</p>
                        </div>
                    `})}
                </div>
            </div>
            
        `
    }
    static get properties() {
        return {
            ratios: {type: Array },
            results: {type: Array}
        }
    }
    constructor() {
        super();
        this.ratios = [1];
    }
}
customElements.define('color-results', ColorRampResults)