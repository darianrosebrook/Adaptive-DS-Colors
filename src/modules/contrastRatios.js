import {LitElement, html, css} from 'lit';
class ContrastRatios extends LitElement {
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
                <h2>Contrast Ratios</h2>
            </section>`
    }
}
customElements.define('contrast-ratios', ContrastRatios);