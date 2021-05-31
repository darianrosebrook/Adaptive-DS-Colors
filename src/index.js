import {LitElement, html, css} from 'lit';
import { store } from './redux/store.js';
import { connect } from "pwa-helpers";
import { keyColorActions, baseColorActions,colorRampActions } from './redux/actions';
import './modules/keyColors';
import './modules/baseColor';
import './modules/colorSpace';
import './modules/contrastRatios';
import './modules/colorRamp';
import './modules/referenceCode';
import * as contrastColors from '@adobe/leonardo-contrast-colors';
import * as d3start from 'd3';
import * as d3cam02 from 'd3-cam02';
import * as d3hsluv from 'd3-hsluv';
import * as d3hsv from 'd3-hsv';
const d3 = Object.assign({}, d3start, d3cam02,d3hsluv,d3hsv);

class AdaptiveColors extends connect(store)(LitElement) {
    static get properties() {
        return {
            inputs: {
                keyColors: {type: Array},
                baseColor: {type: String},
                colorSpace: {type: String},
                ratios: {type: Array},
            }, 
            results: {
                colorScheme: {type: String},
                colors: {type: Array},
                contrasts: {type: Array}
            }
        }
    }
    constructor() {
        super();
        this.ramp = {
            colors: ['#ffffff'],
            contrasts: [1],
            colorScheme: "Neutral"
        }
        this.inputs = {
            keyColors: ['#FFFFFF'],
            baseColor: '#FFFFFF',
            colorSpace: 'CAM02',
            ratios: [1]
        }
        this.initialized = false
    }
    shouldUpdate(changedProperties) {
        
    console.log(changedProperties)
      return changedProperties;
      }
    stateChanged(state) {
        console.log(state);
        this.inputs = {
            keyColors: [...state.keyColors],
            baseColor: state.baseColor,
            colorSpace: state.colorSpace,
            ratios: state.contrastStops
        }
        this.ramp.colors =  contrastColors.generateContrastColors({colorKeys: this.inputs.keyColors, base: this.inputs.baseColor, ratios: this.inputs.ratios, colorspace: this.inputs.colorSpace});
        this.ramp.contrasts = this.inputs.ratios;

    }
    static get styles() {
        return css `
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
        }`;
    }
    updateRamp = () => {
        store.dispatch(
            colorRampActions.updateColorRamp(this.ramp)
        )
    }
    _handleBaseColorChange = (e) => {
        store.dispatch(
            baseColorActions.updateColor(
                e.detail.color
            )
        )
    }
    _handleKeyColorChange = (e) => {
        store.dispatch(
            keyColorActions.updateColor(
                e.detail.color, e.detail.key
            )
        )
    }
    _handleClick = e => {
        this._executeAction(e.detail);
    }
    _executeAction = action => {
        switch (action) {
            case 'ADD_KEY_COLOR':
                store.dispatch(
                    keyColorActions.addNewColor(
                        this.inputs.keyColors[this.inputs.keyColors.length - 1],
                    )
                )
                break;
            case 'BULK_KEY_COLOR':
                console.log('Execute BULK');
                break;
            case 'CODE_KEY_COLORS':
                console.log('Execute CODE');
                break;
            case 'CLEAR_KEY_COLORS':
                store.dispatch(
                    keyColorActions.clearKeyColors('#ffffff')
                )
            default:
                break;
        }
    }
    render() {
        return html`<main>
            <key-colors .keyColors=${[...this.inputs.keyColors]} @buttonClick=${this._handleClick} @colorInputChange=${this._handleKeyColorChange}></key-colors>
            <section class="grid">
                <base-color @colorInputChange=${this._handleBaseColorChange} .baseColor=${this.baseColor}></base-color>
                <color-space @shouldDispatch=${this.updateRamp} .colorSpace=${this.inputs.colorSpace}></color-space>
                <contrast-ratios @shouldDispatch=${this.updateRamp} .ratios=${this.inputs.ratios}></contrast-ratios>
                <color-ramp @shouldDispatch=${this.updateRamp} ></color-ramp>
            </section>
            <reference-code></reference-code>
        </main>`
    }
    
} 

customElements.define('adaptive-colors', AdaptiveColors)