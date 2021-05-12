import {LitElement, html, css} from 'lit';

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
            </section>`
    }
} 
customElements.define('color-ramp', ColorRamp)