import {LitElement, html, css} from 'lit';
class keyColors extends LitElement {
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
                <h2>Key colors</h2>
            </section>`
    }
} 

customElements.define('key-colors', keyColors)