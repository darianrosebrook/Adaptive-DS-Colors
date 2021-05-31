import {LitElement, html, css} from 'lit';
import { store } from '../redux/store.js';
import { connect } from "pwa-helpers";
import { contrastRatioActions, colorRampActions } from '../redux/actions';
import * as contrastColors from '@adobe/leonardo-contrast-colors';
import * as d3start from 'd3';
// Import d3 plugins and add them to the d3 namespace
import * as d3cam02 from 'd3-cam02';
import * as d3hsluv from 'd3-hsluv';
import * as d3hsv from 'd3-hsv';
const d3 = Object.assign({}, d3start, d3cam02,d3hsluv,d3hsv);
import styles from '../styles'
import '../components/button'
import '../components/contrastStop'
import '../components/tooltipTrigger'
import '../components/gradientMap'

function interpolateLumArray(array) {
    let lums = [];
    for(let i=0; i<array.length; i++) {
      lums.push(d3.hsluv(array[i]).v);
    }
    var startLum = Math.min(...lums);
    var endLum = Math.max(...lums);
    var interpolator = d3.interpolateNumber(startLum, endLum);
  
    for (let i=1; i<lums.length - 1; i++) {
      lums[i] = interpolator((i)/(lums.length));
    }
  
    lums.sort(function(a, b){return b-a});

    return lums;
  }
function returnRatioCube(lum) {
    let a = 1.45;
    let b = 0.7375;
    let c = 2.5;
  
    let x = lum/100;
    let exp = ((x * -1 / a) + b);
    let y = Math.pow(exp, 3) * c;
    let r = y * 20 + 1;
  
    if (r > 1) {
      return r;
    }
    if (r < 1 && r >= 0) {
      return 1;
    }
  }
  

class ContrastRatios extends connect(store)(LitElement) {
    static get styles() {
        return [
            styles,
            css`
                div {
                    margin-bottom: .5rem;
                }
                .grid {
                    grid-template-columns: 2fr 1fr;
                }
                .button-container {
                    display: flex;
                    justify-content: space-between;
                }
            `
        ];
    }
    static get properties() {
        return {
            ratios: {type: Array},
            keyColors: {type: Array},
            results: {type: Array}
        }
    }
    constructor() {
        super();
        this.keyColors = ['#ffffff'];
        this.ratios = [1.00];
        this.results = []
    }
    stateChanged(state) {
        this.keyColors = state.keyColors;
        this.results = contrastColors.generateContrastColors({colorKeys: state.keyColors, base: state.baseColor, ratios: state.contrastStops, colorspace: state.colorSpace});
        
      }
    render() {
        return html`
            <section>
                <div class="grid">
                    <div>
                        <div><h2>Contrast ratios</h2><tooltip-trigger></tooltip-trigger></div>
                        <div class="button-container">
                            <button-m data-event="SORT" @click=${this._handleClick}><svg-icon icon="sort"></svg-icon></button-m>
                            <button-m data-event="DISTRIBUTE" @click=${this._handleClick}><svg-icon icon="distribute"></svg-icon></button-m>
                            <button-m data-event="ADD" @click=${this._handleClick}><svg-icon icon="add"></svg-icon></button-m>
                        </div>
                        
                        ${this.ratios.map((item, key) => {
                        return html`
                            <contrast-stop .contrastRatio=${{ratio: item, key}}></contrast-stop>
                    `
                    })} 
                        <button-m buttonText="Clear all" data-event="CLEAR" @click=${this._handleClick}><svg-icon icon="clear"></svg-icon></button-m>
                    </div>
                    <div>
                        <gradient-map></gradient-map>
                    </div>
                
                </div>
            </section>`
    }
    _handleClick = (e) => {
        let target;
        e.target.parentElement.tagName === "BUTTON-M" ?
            target = e.target.parentElement :
            target = e.target;
        this._executeAction(target.dataset.event)
        const shouldDispatch = new CustomEvent('shouldDispatch', {
            bubbles: true,
            composed: true,
            detail: true
          });
          this.dispatchEvent(shouldDispatch);
    }
    _executeAction = action => {
        switch (action) {
            case 'ADD':
                let stopToAdd = 
                this.ratios.length < 21 ? 
                this.ratios.length + 1 :
                21;
                store.dispatch(
                    contrastRatioActions.addNewStop(
                        stopToAdd
                    )
                )
                break;
            case 'SORT':
                store.dispatch(
                    contrastRatioActions.updateRatios(
                        this.ratios.sort(function(a, b){return a-b})
                        )
                )
                break;
            case 'DISTRIBUTE':
                // let sorted = this.ratios.sort(function(a, b){return a-b});
                store.dispatch(
                    contrastRatioActions.updateRatios(
                        this.ratios.sort(function(a, b){return a-b})
                        )
                )
                this._distribute()
                
                store.dispatch(
                    contrastRatioActions.updateRatios(
                        this.ratios
                        )
                )
                break;
            case 'CLEAR':
                store.dispatch(
                    contrastRatioActions.clearContrastStops(1)
                )
            default:
                break;
        }
    }
    _distribute = () => {
        let sorted = this.ratios.sort(function(a, b){return a-b});
        let lums = interpolateLumArray(this.results)
        for(let i=1; i<lums.length -1; i++) {
        sorted[i] = returnRatioCube(lums[i]).toFixed(2);
        }
        
      
      }
}
customElements.define('contrast-ratios', ContrastRatios);