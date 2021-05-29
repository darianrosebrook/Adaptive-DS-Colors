import {LitElement, html, css} from 'lit';
import { store } from '../redux/store.js';
import { connect } from "pwa-helpers";
import * as contrastColors from '@adobe/leonardo-contrast-colors';
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
    }
    stateChanged(state) {
        this.colorResults = state.colorRamp.colorResults;
        this.ratios = state.contrastStops;
        console.log(this.colorResults);
      }
    render() {
        return html`
            <section>
                
            <div><h2>Color ramp</h2><tooltip-trigger></tooltip-trigger></div>
                <div>
                    <input type="text" placeholder="Color Ramp / Red" />
                </div>
                <div>
                    <color-results @colorStopChange=${this._handleChange} .ratios=${this.ratios} .results=${this.colorResults} ></color-results>
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
} 
customElements.define('color-ramp', ColorRamp)