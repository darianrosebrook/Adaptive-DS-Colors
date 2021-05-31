import {LitElement, html, css} from 'lit';
import { store } from '../redux/store.js';
import { connect } from "pwa-helpers";
import * as contrastColors from '@adobe/leonardo-contrast-colors';
import * as d3start from 'd3';
// Import d3 plugins and add them to the d3 namespace
import * as d3cam02 from 'd3-cam02';
import * as d3hsluv from 'd3-hsluv';
import * as d3hsv from 'd3-hsv';
const d3 = Object.assign({}, d3start, d3cam02,d3hsluv,d3hsv);
import styles from '../styles'
import '../components/colorRampResults'
import '../components/tooltipTrigger'
import '../components/icon'
class ColorRamp extends connect(store)(LitElement) {
    static get styles() {
        return [
            styles,
            css`
                div {
                    margin-bottom: .5rem;
                }
            `
        ];
    }
    static get properties() {
        return {
            contrastDisplay: {type: Array},
            ratios: {type: Array},
            colorResults: [
                {
                    stop: {type: String},
                    contrast: {type: Number},
                    color: {type: String}
                }
            ]
        }
    }
    constructor() {
        super();
        this.ratios = [1.00];
        this.colorResults = [
            {
                stop: '100',
                contrast: 1.00,
                color: '#FFFFFF'
            }
        ]
        this.contrastDisplay = [];
    }
    stateChanged(state) {
        this.colorResults = state.colorRamp.colorResults;
        this.ratios = state.contrastStops;
        this._updateRampContrast();
      }
    render() {
        return html`
            <section>
                
            <div><h2>Color ramp</h2><tooltip-trigger></tooltip-trigger></div>
                <div>
                    <input type="text" placeholder="Color Ramp / Red" />
                </div>
                <div>
                    <color-results @colorStopChange=${this._handleChange} .ratios=${this.ratios} .colorResults=${{results: this.colorResults, contrastDisplay: this.contrastDisplay}} ></color-results>
                </div>
                <div>
                    <button-m buttonText="Copy"></button-m>
                    <button-m buttonText="Test"></button-m>
                    <button-m buttonText="Set styles"></button-m>
                </div>
            </section>`
    }
    _handleChange = (e) => {
        this.colorResults[e.detail.key].stop = e.detail.value;
    }
    _updateRampContrast = () => {
        for (let i = 0; i < this.colorResults.length; i++ ) {
            if (contrastColors.luminance(d3.rgb(this.colorResults[i].color).r, d3.rgb(this.colorResults[i].color).g, d3.rgb(this.colorResults[i].color).b) < 0.1848) {
                this.contrastDisplay[i] = '#ffffff'
              } else {
                this.contrastDisplay[i] = '#000000'
              }
        }
    }
} 
customElements.define('color-ramp', ColorRamp)