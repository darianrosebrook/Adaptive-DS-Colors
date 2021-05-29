import {LitElement, html, css} from 'lit';
import { store } from '../redux/store.js';
import { connect } from "pwa-helpers";
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
            colorResults: {type: Array}
        }
    }
    constructor() {
        super();
        this.colorResults = ['#ffffff'];
        this.ratios = [1.00];
    }
    stateChanged(state) {
        this.colorResults = state.keyColors;
        this.ratios = state.contrastStops;
      }
    render() {
        return html`
            <section>
                
            <div><h2>Color ramp</h2><tooltip-trigger></tooltip-trigger></div>
                <div>
                    <input type="text" placeholder="Color Ramp / Red" />
                </div>
                <div>
                    <color-results .ratios=${this.ratios} .results=${this.colorResults}></color-results>
                </div>
                <div>
                    <button-m buttonText="Copy"></button-m>
                    <button-m buttonText="Test"></button-m>
                    <button-m buttonText="Set styles"></button-m>
                </div>
            </section>`
    }
} 
customElements.define('color-ramp', ColorRamp)