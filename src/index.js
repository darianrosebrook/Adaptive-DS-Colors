import {LitElement, html, css} from 'lit';
import { store } from './redux/store.js';
import { connect } from "pwa-helpers";
import { keyColorActions, baseColorActions, colorSpaceActions, contrastRatioActions, colorRampActions } from './redux/actions';
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

let initialState;

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
const createQueryString = (data) => {
    return Object.keys(data).map(key => {
        let val = data[key]
        if (val !== null && typeof val === 'object') val = createQueryString(val)
        return `${key}=${encodeURIComponent(`${val}`.replace(/\s/g, '_'))}`
    }).join('&')
}
onmessage = (event) => {
    console.log("got this from the plugin code", event.data.pluginMessage)
    switch (event.data.pluginMessage.type) {
        case 'INITIAL_STYLES':
            break;
        case 'INITIAL_STATE':
            initialState = event.data.pluginMessage.payload;
            break
        default:
            break;
    }
}
class AdaptiveColors extends connect(store)(LitElement) {
    render() {
        return html`<main>
            <key-colors 
                .keyColors=${[...this.state.keyColors]}
                @buttonClick=${this._handleClick}
                @handleInputChange=${e => this._handleInputChange(e, 'KEY_COLORS' )}
            ></key-colors>
            <section class="grid">
                <base-color 
                    @handleInputChange=${e => this._handleInputChange(e, 'BASE_COLOR' )} 
                    .baseColor=${this.baseColor}
                ></base-color>
                <color-space 
                    @handleInputChange=${e => this._handleInputChange(e, 'COLOR_SPACE')}
                    .colorSpace=${this.state.colorSpace}
                ></color-space>
                <contrast-ratios 
                    @handleInputChange=${e => this._handleInputChange(e, 'CONTRAST_RATIO' )} 
                    @buttonClick=${this._handleClick} 
                    .ratios=${[...this.state.contrastStops]}
                    .colorResults=${[...this.state.colorRamp.colors]} 
                ></contrast-ratios>
                <color-ramp 
                    @buttonClick=${this._handleClick} 
                    @colorThemeChange=${e => this._handleInputChange(e, 'COLOR_RAMP')} 
                    .colorRamp=${this.state.colorRamp} 
                    .contrastStops=${[...this.state.contrastStops]}
                ></color-ramp>
            </section>
            <!-- <reference-code .referenceCode=${this.referenceCode}></reference-code> -->
        </main>`
    }
    static get properties() {
        return {
            state: {
                keyColors: {type: Array},
                baseColor: {type: String},
                colorSpace: {type: String},
                contrastStops: {type: Array},
                colorRamp: {
                    colorScheme: {type: String},
                    colors: [{
                        contrastDisplay: {type: String},
                        contrastRatio: {type: Number},
                        color: {type: String},
                    }],
                    colorStops: {type: Array},
                }
            },
            newColors: {type: Array},
            referenceCode: {type: String}
        }
    }
    constructor() {
        super();
        this.state = {
            colorRamp: {
                colors: [{
                    color: '#ffffff',
                    contrastDisplay: '#000000',
                    contrastRatio: 1
                }],
                colorScheme: "Neutral",
                colorStops: ['100'],
            },
            contrastStops: [1],
            keyColors: ['#FFFFFF'],
            baseColor: '#FFFFFF',
            colorSpace: 'CAM02',
            contrastStops: [1]
        }
    }
    stateChanged(state) {
        console.log(state);
        this.state = {
            ...state
        }
        this._applyColorsToState(this.state)
        this.referenceCode = createQueryString(this.state);
        parent.postMessage({pluginMessage: {detail: {state: this.state, type: "SET_STATE"} }}, '*')
    }

    static get styles() {
        return css `
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
        }`;
    }


    _handleClick = e => {
        this._executeAction(e.detail);
    }
    _distribute = () => {
        let sorted = this.state.contrastStops.sort(function(a, b){return a-b});
        let colorArray = this.state.colorRamp.colors.map(item => {
            return item.color
        })
        let lums = interpolateLumArray(colorArray)
        for(let i=1; i<lums.length -1; i++) {
        sorted[i] = returnRatioCube(lums[i]).toFixed(2);
        }
        
      
      }
    _generateNewColors = (state) => {
        return contrastColors.generateContrastColors(
            {
                colorKeys: state.keyColors,
                base: state.baseColor,
                ratios: state.contrastStops,
                colorspace: state.colorSpace
            }
        );
    }
    _applyColorsToState = (state) => {
        let array = this._generateNewColors(state)
        let newArray = [];
        for (let i = 0; i < array.length; i++ ) {
            let contrastDisplay;
            let contrastRatio =  contrastColors.contrast(
                [d3.rgb(array[i]).r, 
                d3.rgb(array[i]).g, 
                d3.rgb(array[i]).b], 
                [
                    d3.rgb(this.state.baseColor).r, 
                    d3.rgb(this.state.baseColor).g, 
                    d3.rgb(this.state.baseColor).b
                ]
                )
            if (contrastColors.luminance(d3.rgb(array[i]).r, d3.rgb(array[i]).g, d3.rgb(array[i]).b) < 0.1848) {
                contrastDisplay = '#ffffff'
            } else {
                contrastDisplay = '#000000'
            }
            newArray[i] = {
                ...newArray[i], 
                color: array[i],
                contrastRatio: Math.abs(contrastRatio.toFixed(2)),
                contrastDisplay,
            }
        }
        state.colorRamp.colors = newArray;
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
            case 'COLOR_SPACE':
                store.dispatch(
                    colorSpaceActions.updateColorSpace(
                        e.detail
                    )
                )
                break
            case 'CONTRAST_RATIO':
                store.dispatch(
                    contrastRatioActions.updateStop(
                        e.detail.value, e.detail.key
                    )
                )
                break;
        
            case 'COLOR_RAMP':
                store.dispatch(
                    colorRampActions.updateColorRamp(
                       e.detail.value, e.detail.key
                    )
                )
                break;
        
            default:
                break;
        }
    }
    _executeAction = action => {
        console.log(`Start: ${action.context}`, action.key);
        switch (action.context) {
            case "TEST_RAMP": 
                parent.postMessage({pluginMessage: {detail: {ramp: this.state.colorRamp, referenceCode: null, type: action.context} }}, '*')
                break
            case "SET_STYLES": 
                parent.postMessage({pluginMessage: {detail: {ramp: this.state.colorRamp, referenceCode: null, type: action.context} }}, '*')
                break
            case 'ADD_KEY_COLOR':
                store.dispatch(
                    keyColorActions.addNewColor(
                        this.state.keyColors[this.state.keyColors.length - 1],
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
                let stopToAdd;
                if (this.state.contrastStops[this.state.contrastStops.length - 1] == undefined) {
                    stopToAdd = 1
                } else if (this.state.contrastStops[this.state.contrastStops.length - 1] < 21) {
                    stopToAdd = this.state.contrastStops[this.state.contrastStops.length - 1] + 1  
                }else {
                    stopToAdd = 21
                }
                store.dispatch(
                    contrastRatioActions.addNewStop(
                        stopToAdd
                    )
                )
                store.dispatch(
                    colorRampActions.addColorStop(
                        this.state.contrastStops.length
                    )
                )
                break;
            case 'SORT_RATIOS':
                store.dispatch(
                    contrastRatioActions.updateRatios(
                        this.state.contrastStops.sort(function(a, b){return a-b})
                        )
                )
                break;
            case 'DISTRIBUTE_RATIOS':
                let sorted = this.state.contrastStops.sort(function(a, b){return a-b});
                store.dispatch(
                    contrastRatioActions.updateRatios(
                        this.state.contrastStops.sort(function(a, b){return a-b})
                        )
                )
                this._distribute()
                
                store.dispatch(
                    contrastRatioActions.updateRatios(
                        this.state.contrastStops
                        )
                )
                break;
            case 'CLEAR_RATIOS':
                store.dispatch(
                    contrastRatioActions.clearContrastStops(1)
                )
                store.dispatch(
                    colorRampActions.clearColorStops()
                )
                break;
            case 'REMOVE_RATIO': {
                store.dispatch(
                    colorRampActions.clearColorStopItem(
                        this.state.colorRamp.colorStops[action.key], action.key
                    )
                )
                store.dispatch(
                    contrastRatioActions.clearStopItem(
                        this.state.contrastStops[action.key], action.key
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