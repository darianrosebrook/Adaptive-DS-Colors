import {LitElement, html, css} from 'lit';
import '../components/tooltipTrigger'
import '../components/colorSwatch.js'
class BaseColor extends LitElement {
    static get styles() {
        return css ``;
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
                <h2>Base color</h2>
                <color-swatch></color-swatch>
            </section>`
    }
} 
customElements.define('base-color', BaseColor)