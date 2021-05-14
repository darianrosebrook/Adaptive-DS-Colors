import {LitElement, html, css} from 'lit';
import '../components/tooltipTrigger'
class ReferenceCode extends LitElement {
    static get styles() {
        return css `
        tooltip-trigger {
            display: inline;
        }`;
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
                <h2>Reference code<tooltip-trigger></tooltip-trigger></h2>
                <input type="text" placeholder='colorKeys: ["#6fa7ff"], base: "#ffffff", ratios: [3,4.5],' />
                <button-m>Copy</button-m>
            </section>`
    }
} 
customElements.define('reference-code', ReferenceCode)