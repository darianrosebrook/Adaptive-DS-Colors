import {LitElement, html, css} from 'lit';
class ColorSpace extends LitElement {
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
                <h2>Color space</h2>
                <select >
                    <option>LAB</option>
                </select>
            </section>`
    }
} 
customElements.define('color-space', ColorSpace)