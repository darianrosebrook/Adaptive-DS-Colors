import {LitElement, html, css} from 'lit';
import { store } from './redux/store.js';
import { connect } from "pwa-helpers";
import { colorRampActions } from './redux/actions';
import './modules/keyColors';
import './modules/baseColor';
import './modules/colorSpace';
import './modules/contrastRatios';
import './modules/colorRamp';
import './modules/referenceCode';
import * as contrastColors from '@adobe/leonardo-contrast-colors';
import * as d3 from 'd3';

window.createScale = contrastColors.createScale;
window.luminance = contrastColors.luminance;
window.contrast = contrastColors.contrast;
window.generateContrastColors = contrastColors.generateContrastColors;
window.contrastColors = contrastColors;
window.generateBaseScale = contrastColors.generateBaseScale;
window.generateAdaptiveTheme = contrastColors.generateAdaptiveTheme;
window.minPositive = contrastColors.minPositive;
window.ratioName = contrastColors.ratioName;

class AdaptiveColors extends connect(store)(LitElement) {
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
            colorScheme: {type: Object},
            results: {type: Array}
        }
    }
    stateChanged(state) {
        console.log(state);
        this.keyColors = state.keyColors;
        this.baseColor = state.baseColor;
        this.colorSpace = state.colorSpace;
        this.ratios = state.contrastStops;
        this.results = contrastColors.generateContrastColors({colorKeys: this.keyColors, base: this.baseColor, ratios: this.ratios, colorspace: this.colorSpace});

    }
    constructor() {
        super();
        this.results = ["#ffffff"]
    }
    render() {
        return html`<main>
            <key-colors @shouldDispatch=${this.updateRamp}></key-colors>
            <section class="grid">
                <base-color @shouldDispatch=${this.updateRamp} .baseColor=${this.baseColor}></base-color>
                <color-space @shouldDispatch=${this.updateRamp} .colorSpace=${this.colorSpace}></color-space>
                <contrast-ratios @shouldDispatch=${this.updateRamp} .ratios=${this.ratios}></contrast-ratios>
                <color-ramp @shouldDispatch=${this.updateRamp} .colorScheme=${this.colorScheme}></color-ramp>
            </section>
            <reference-code></reference-code>
        </main>`
    }
    updateRamp = () => {
        store.dispatch(
            colorRampActions.updateColorRamp(
                this.results
            )
        )
    }
} 

customElements.define('adaptive-colors', AdaptiveColors)