import {LitElement, html, css} from 'lit';
class ReferenceCode extends LitElement {
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
                <h2>Reference code</h2>
            </section>`
    }
} 
customElements.define('reference-code', ReferenceCode)