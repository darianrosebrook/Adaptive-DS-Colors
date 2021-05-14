import {LitElement, html, css} from 'lit';
import '../components/button'
import '../components/contrastStop'
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
                <button-m><svg-icon icon="sort"></svg-icon></button-m>
                <button-m><svg-icon icon="distribute"></svg-icon></button-m>
                <button-m><svg-icon icon="add"></svg-icon></button-m>
                <contrast-stop></contrast-stop>
                <button-m>Clear all <svg-icon icon="clear"></svg-icon></button-m>
            </section>`
    }
}
customElements.define('contrast-ratios', ContrastRatios);