import {LitElement, html, css} from 'lit';
import '../components/colorSwatch.js'
class keyColors extends LitElement {
    static get styles() {
        return css `color-swatch + color-swatch {
            margin-left: 16px;
        }
        `;
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
            <section>
                <h2>Key colors</h2>
                <div>
                <button-m><svg-icon icon="add"></svg-icon></button-m>
                <button-m><svg-icon icon="bulk"></svg-icon></button-m>
                <button-m><svg-icon icon="code"></svg-icon></button-m>
                <button-m><svg-icon icon="clear"></svg-icon></button-m>
                </div>
                <color-swatch></color-swatch>
                <color-swatch></color-swatch>
                <color-swatch></color-swatch>
                <color-swatch></color-swatch>
            </section>`
    }
} 

customElements.define('key-colors', keyColors)