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
import * as d3start from 'd3';
// Import d3 plugins and add them to the d3 namespace
import * as d3cam02 from 'd3-cam02';
import * as d3hsluv from 'd3-hsluv';
import * as d3hsv from 'd3-hsv';
const d3 = Object.assign({}, d3start, d3cam02,d3hsluv,d3hsv);

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
            results: {
                colors: {type: Array},
                contrasts: {type: Array}
            }
        }
    }
    stateChanged(state) {
        console.log(state);
        this.keyColors = state.keyColors;
        this.baseColor = state.baseColor;
        this.colorSpace = state.colorSpace;
        this.ratios = state.contrastStops;
        this.results.colors =  contrastColors.generateContrastColors({colorKeys: this.keyColors, base: this.baseColor, ratios: this.ratios, colorspace: this.colorSpace});
        for( let i = 0; i < this.results.colors.length; i++) {
            this.results.contrasts[i] = parseInt(contrastColors.contrast([d3.rgb(this.results.colors[i]).r, d3.rgb(this.results.colors[i]).g, d3.rgb(this.results.colors[i]).b], [d3.rgb(this.baseColor).r, d3.rgb(this.baseColor).g, d3.rgb(this.baseColor).b])).toFixed(2)
        }

    }
    constructor() {
        super();
        this.results = {
            colors: ['#ffffff'],
            contrasts: [1]

        }
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
        console.log(this.results)
        store.dispatch(
            colorRampActions.updateColorRamp({
                results: this.results.colors,
                contrast: this.results.contrasts
            })
        )
    }
} 

customElements.define('adaptive-colors', AdaptiveColors)