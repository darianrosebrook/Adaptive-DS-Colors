import {LitElement, html, css} from 'lit';
import '../components/colorRampResults'
import '../components/icon'
class ColorRamp extends LitElement {
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
                <h2>Color ramp</h2>
                <input type="text" placeholder="Color Ramp / Red" />
                <color-results></color-results>
                <button-m>Copy</button-m>
                <button-m>Test</button-m>
                <button-m>Set styles</button-m>
            </section>`
    }
} 
customElements.define('color-ramp', ColorRamp)