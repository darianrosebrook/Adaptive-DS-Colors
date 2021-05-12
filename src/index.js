import {LitElement, html, css} from 'lit';
import './modules/keyColors';
import './modules/baseColor';
import './modules/colorSpace';
import './modules/contrastRatios';
import './modules/colorRamp';
import './modules/referenceCode';
class AdaptiveColors extends LitElement {
    static get styles() {
        return css `
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
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
        return html`<main>
            <key-colors></key-colors>
            <section class="grid">
                <base-color></base-color>
                <color-space></color-space>
                <contrast-ratios></contrast-ratios>
                <color-ramp></color-ramp>
            </section>
            <reference-code></reference-code>
        </main>`
    }
} 

customElements.define('adaptive-colors', AdaptiveColors)