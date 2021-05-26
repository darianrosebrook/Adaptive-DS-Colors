import {LitElement, html, css} from 'lit';
import './modules/keyColors';
import './modules/baseColor';
import './modules/colorSpace';
import './modules/contrastRatios';
import './modules/colorRamp';
import './modules/referenceCode';
import * as contrastColors from '@adobe/leonardo-contrast-colors';

window.createScale = contrastColors.createScale;
window.luminance = contrastColors.luminance;
window.contrast = contrastColors.contrast;
window.generateContrastColors = contrastColors.generateContrastColors;
window.contrastColors = contrastColors;
window.generateBaseScale = contrastColors.generateBaseScale;
window.generateAdaptiveTheme = contrastColors.generateAdaptiveTheme;
window.minPositive = contrastColors.minPositive;
window.ratioName = contrastColors.ratioName;

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
            keyColors: {type: Array},
            baseColor: {type: String},
            colorSpace: {type: String},
            ratios: {type: Array},
            colorScheme: {type: Object}
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