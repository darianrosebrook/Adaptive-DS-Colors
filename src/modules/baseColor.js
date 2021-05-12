import {LitElement, html, css} from 'lit';
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
            </section>`
    }
} 
customElements.define('base-color', BaseColor)