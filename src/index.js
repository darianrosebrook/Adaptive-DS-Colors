import {LitElement, html, css} from 'lit';
import { store } from './redux/store.js';
import { connect } from "pwa-helpers";
import { keyColorActions, baseColorActions, contrastRatioActions, colorRampActions } from './redux/actions';
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
  

class AdaptiveColors extends connect(store)(LitElement) {
    render() {
        return html`<main>
            <key-colors .keyColors=${[...this.inputs.keyColors]} @buttonClick=${this._handleClick} @handleInputChange=${e => this._handleInputChange(e, 'KEY_COLORS' )}></key-colors>
            <section class="grid">
                <base-color @handleInputChange=${e => this._handleInputChange(e, 'BASE_COLOR' )} .baseColor=${this.baseColor}></base-color>
                <color-space @shouldDispatch=${this.updateRamp} .colorSpace=${this.inputs.colorSpace}></color-space>
                <contrast-ratios @handleInputChange=${e => this._handleInputChange(e, 'CONTRAST_RATIO' )} @buttonClick=${this._handleClick} .ratios=${this.inputs.ratios}></contrast-ratios>
                <color-ramp @shouldDispatch=${this.updateRamp} .colorResults=${this.ramp.colors} .ratios=${this.ramp.contrasts}></color-ramp>
            </section>
            <reference-code></reference-code>
        </main>`
    }
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
                colors: [{
                    colorStop: {type: String},
                    contrastDisplay: {type: String},
                    contrastRatio: {type: Number},
                    color: {type: String},
                }],
                contrasts: {type: Array}
            }
        }
    }
    constructor() {
        super();
        this.ramp = {
            colors: [{
                color: '#ffffff',
                contrastDisplay: '#000000',
                colorStop: '100',
                contrastRatio: 1
            }],
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
    stateChanged(state) {
        console.log(state);
        this.inputs = {
            keyColors: [...state.keyColors],
            baseColor: state.baseColor,
            colorSpace: state.colorSpace,
            ratios: [...state.contrastStops]
        }
        this.ramp.contrasts = this.inputs.ratios;

        let newColors = contrastColors.generateContrastColors({colorKeys: this.inputs.keyColors, base: this.inputs.baseColor, ratios: this.inputs.ratios, colorspace: this.inputs.colorSpace});
        
        for (let i = 0; i < newColors.length; i++ ) {
            let contrastDisplay;
            let colorStop = (i + 1) * 100;
            let contrastRatio =  contrastColors.contrast([d3.rgb(newColors[i]).r, d3.rgb(newColors[i]).g, d3.rgb(newColors[i]).b], [d3.rgb(this.inputs.baseColor).r, d3.rgb(this.inputs.baseColor).g, d3.rgb(this.inputs.baseColor).b])
            if (contrastColors.luminance(d3.rgb(newColors[i]).r, d3.rgb(newColors[i]).g, d3.rgb(newColors[i]).b) < 0.1848) {
                contrastDisplay = '#ffffff'
            } else {
                contrastDisplay = '#000000'
            }
            newColors[i] = {
                color: newColors[i],
                contrastRatio: contrastRatio.toFixed(2),
                contrastDisplay,
                colorStop
            }
        }
        this.ramp.colors = newColors

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
    _handleInputChange = (e, changeType) => {
        switch (changeType) {
            case 'KEY_COLORS':
                store.dispatch(
                    keyColorActions.updateColor(
                        e.detail.value, e.detail.key
                    )
                )
                break;
        
            case 'BASE_COLOR':
                store.dispatch(
                    baseColorActions.updateColor(
                        e.detail.value
                    )
                )
                break;
        
            case 'CONTRAST_RATIO':
                store.dispatch(
                    contrastRatioActions.updateStop(
                        e.detail.value, e.detail.key
                    )
                )
                break;
        
            default:
                break;
        }
    }
    _handleKeyColorChange = (e) => {
    }
    _handleRatioInputChange = (e) => {
    }
    _handleClick = e => {
        this._executeAction(e.detail);
    }
    _distribute = () => {
        let sorted = this.inputs.ratios.sort(function(a, b){return a-b});
        let colorArray = this.ramp.colors.map(item => {
            return item.color
        })
        console.log(colorArray)
        let lums = interpolateLumArray(colorArray)
        for(let i=1; i<lums.length -1; i++) {
        sorted[i] = returnRatioCube(lums[i]).toFixed(2);
        }
        
      
      }
    _executeAction = action => {
        console.log(`Start: ${action.context}`, action.key);
        switch (action.context) {
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
                break;
            case 'ADD_RATIOS':
                let stopToAdd = 
                this.inputs.ratios[this.inputs.ratios.length - 1] < 21 ? 
                this.inputs.ratios[this.inputs.ratios.length - 1] + 1 :
                21;
                store.dispatch(
                    contrastRatioActions.addNewStop(
                        stopToAdd
                    )
                )
                break;
            case 'SORT_RATIOS':
                store.dispatch(
                    contrastRatioActions.updateRatios(
                        this.inputs.ratios.sort(function(a, b){return a-b})
                        )
                )
                break;
            case 'DISTRIBUTE_RATIOS':
                let sorted = this.inputs.ratios.sort(function(a, b){return a-b});
                store.dispatch(
                    contrastRatioActions.updateRatios(
                        this.inputs.ratios.sort(function(a, b){return a-b})
                        )
                )
                this._distribute()
                
                store.dispatch(
                    contrastRatioActions.updateRatios(
                        this.inputs.ratios
                        )
                )
                break;
            case 'CLEAR_RATIOS':
                store.dispatch(
                    contrastRatioActions.clearContrastStops(1)
                )
                break;
            case 'REMOVE_RATIO': {
                store.dispatch(
                    contrastRatioActions.clearStopItem(
                        this.inputs.ratios[action.key], action.key
                    )
                )
                break;
            }
            default:
                break;
        }
    }
    
} 

customElements.define('adaptive-colors', AdaptiveColors)