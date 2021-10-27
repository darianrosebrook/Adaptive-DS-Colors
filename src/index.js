import {LitElement, html, css} from 'lit';
import { store } from './redux/store.js';
import { connect } from "pwa-helpers";
import { colorKeyActions, baseColorActions, colorSpaceActions, contrastRatioActions, colorRampActions } from './redux/actions';
import './modules/colorKeys';
import './modules/baseColor';
import './modules/colorSpace';
import './modules/contrastRatios';
import './modules/colorRamp';
import './modules/referenceCode';
import * as Leonardo from '@adobe/leonardo-contrast-colors';

import * as d3start from 'd3';
import * as d3cam02 from 'd3-cam02';
import * as d3hsluv from 'd3-hsluv';
import * as d3hsv from 'd3-hsv';
const d3 = Object.assign({}, d3start,d3cam02,d3hsluv,d3hsv);


const ensureColorValueIsProperHex = (value, source = "your colors") => {
    let isValid = false;
    if (typeof(value) !== 'string') {
        value = value.toString();
    }
    if (value.length === 4 && value.charAt(0) === '#') {
        value = value.slice(1)
    }
    if (value.startsWith('#') !== true && value.length === 3) {
        value = value.split('').map(v => v + v).join('');
        value = '#' + value;
    }
    if (value.startsWith('#') !== true && value.length === 6) {
        value = '#' + value;
    }

    isValid = /^#([0-9A-F]{3}){1,2}$/i.test(value);
    if (isValid === false) {
        alert(`\'${value}\'` + ' is an invalid HEX code in ' + source)
        return '#FFFFFF'
    }
    return value.toUpperCase();
};

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

    console.log(lums);
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

  let setReferenceCode = (colorKeys, background, ratios, colorSpace, colorScheme, colorStops) => {
    let params = new URLSearchParams();
  
    params.set('colorKeys', colorKeys);
    params.set('base', background.substring(1));
    params.set('ratios', ratios);
    params.set('mode', colorSpace);
    params.set('colorScheme', colorScheme);
    params.set('colorStops', colorStops);
    return params.toString();
  }
let getParams = (refCode) => {
    let params = new URLSearchParams(refCode);
    if (!params.has('colorKeys') || !params.has('colorStops') || !params.has('base') || !params.has('ratios') || !params.has('mode')) {
        parent.postMessage({pluginMessage: {detail: {message: '⚠️ Please use the reference codes given by the plugin', type: 'POST_MESSAGE'} }}, '*')
        return
    }   
    let colorKeys, colorStops;
    if(params.has('colorKeys')) {
        let cr = params.get('colorKeys');
        colorKeys = cr.split(',');
    
        if(colorKeys[0] == 0) {
          colorKeys = ['#707070'];
        }
      }
    if(params.has('colorStops')) {
        let cs = params.get('colorStops');
        colorStops = cs.split(',');
    }
      let baseColor;
      if(params.has('base')) {
        baseColor = '#' + params.get('base');
      }
      let inputRatios;
      if(params.has('ratios')) {
        // transform parameter values into array of numbers
        let rat = params.get('ratios');
        inputRatios = rat.split(',');
        inputRatios = inputRatios.map(Number);
      }
      let colorSpace, colorScheme;
      if(params.has('mode')) {
        colorSpace = params.get('mode');
      }
      if(params.has('colorScheme')) {
        colorScheme = params.get('colorScheme');
      }
      return {
          colorKeys,
          baseColor,
          inputRatios,
          colorSpace,
          colorScheme,
          colorStops,
      }
}
class AdaptiveColors extends connect(store)(LitElement) {
    render() {
        return html`<main>
            <key-colors 
                .colorKeys=${[...this.state.colorKeys]}
                @buttonClick=${this._handleClick}
                @handleInputChange=${e => this._handleInputChange(e, 'KEY_COLORS' )}
                @addColorsToKeys=${e => this._handleInputChange(e, 'BULK_STATE_CHANGE')}
            ></key-colors>
            <section class="grid">
                <base-color 
                    @handleInputChange=${e => this._handleInputChange(e, 'BASE_COLOR' )} 
                    .baseColor=${this.state.baseColor}
                ></base-color>
                <color-space 
                    @handleInputChange=${e => this._handleInputChange(e, 'COLOR_SPACE')}
                    .colorSpace=${this.state.colorSpace}
                ></color-space>
                <contrast-ratios 
                    @handleInputChange=${e => this._handleInputChange(e, 'CONTRAST_RATIO' )} 
                    @buttonClick=${this._handleClick} 
                    .ratios=${[...this.state.inputRatios]}
                    .colorResults=${[...this.state.colorRamp.colors]} 
                ></contrast-ratios>
                <color-ramp 
                    @buttonClick=${this._handleClick} 
                    @colorThemeChange=${e => this._handleInputChange(e, 'COLOR_RAMP')} 
                    .colorRamp=${this.state.colorRamp} 
                    .inputRatios=${[...this.state.inputRatios]}
                ></color-ramp>
                <reference-code .referenceCode=${this.referenceCode}>
                </reference-code>
            </section>
        </main>`
    }
    static get properties() {
        return {
            state: {
                colorKeys: {type: Array},
                baseColor: {type: String},
                colorSpace: {type: String},
                inputRatios: {type: Array},
                colorRamp: {
                    colorScheme: {type: String},
                    colors: [{
                        contrastDisplay: {type: String},
                        ratio: {type: Number},
                        color: {type: String},
                    }],
                    outputRatios: {type: Array},
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
                    ratio: 1
                }],
                colorScheme: "Neutral",
                outputRatios: ['100'],
            },
            inputRatios: [1],
            colorKeys: ['#FFFFFF'],
            baseColor: '#FFFFFF',
            colorSpace: 'CAM02'
        }
    }
    connectedCallback() {
        super.connectedCallback();
        window.onmessage = (event) => {
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
    }
    stateChanged(state) {
        console.log('state changed', state)
        this.state = {
            ...state
        }
        this._applyColorsToState(this.state)
        this.referenceCode = setReferenceCode(this.state.colorKeys, this.state.baseColor, this.state.inputRatios, this.state.colorSpace, this.state.colorRamp.colorScheme, this.state.colorRamp.colorStops);
        parent.postMessage({pluginMessage: {detail: {state: this.state, type: "SET_STATE"} }}, '*')
    }

    static get styles() {
        return css `
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
        }
        reference-code {
            grid-column: 1 / span 2;
        }`;
    }


    _handleClick = e => {
        this._executeAction(e.detail);
    }
    _distribute = () => {
        let sorted = this.state.inputRatios.sort(function(a, b){return a-b});
        let colorArray = this.state.colorRamp.colors.map(item => {
            return item.color
        })
        let lums = interpolateLumArray(colorArray)
        for(let i=1; i<lums.length -1; i++) {
        sorted[i] = returnRatioCube(lums[i]).toFixed(2);
        }
        
      
      }
    _generateNewColors = (state) => {
        const background = state.baseColor;
        const bg = d3.color(background).rgb();
        const color = {
            name: state.colorRamp.colorScheme,
            ratios: state.inputRatios,
            colorKeys: state.colorKeys,
            colorspace: state.colorSpace
        }
        color.colorKeys.map((key, index) => {
            color.colorKeys[index] = ensureColorValueIsProperHex(key);
        });
        const uniqueInputs = [...new Set(color.colorKeys)];
        let colorData = new Leonardo.Color(color);
        let theme = new Leonardo.Theme({colors: [colorData], backgroundColor: background, lightness: 100, contrast: 1});
        let newColors = theme._contrastColorValues;

        let n = window.innerHeight - 282;
        let rampData = new Leonardo.createScale({swatches: n, colorKeys: color.colorKeys, colorSpace: color.colorSpace, ratios: color.ratios});
        const outputRatios = [];
        newColors.map(key => {
            var outputRatio = Leonardo.contrast([d3.rgb(key).r, d3.rgb(key).g, d3.rgb(key).b], [bg.r, bg.g, bg.b]);
            outputRatios.push(outputRatio);
        });
        const finalColors = [];
        newColors.map ((key, index) => {
            finalColors.push({
                color: key,
                ratio: outputRatios[index].toFixed(2)
            })
        });
        const finalRamp = {
            name: color.name,
            colorSpace: color.colorspace,
            colorKeys: uniqueInputs,
            baseColor: background,
            inputRatios: color.ratios,
            outputRatios: outputRatios,
            results: finalColors
        }
        return finalRamp;
    }
    _applyColorsToState = (state) => {
        let colorRamp = this._generateNewColors(state)
        console.log('colorRamp', colorRamp);
        let newArray = [];
        for (let i = 0; i < colorRamp.results.length; i++ ) {
            let contrastDisplay;
            let color = colorRamp.results[i].color;
            let colorRGB = d3.rgb(color);
            if (Leonardo.luminance(colorRGB.r, colorRGB.g, colorRGB.b) < 0.1848) {
                contrastDisplay = '#ffffff'
            } else {
                contrastDisplay = '#000000'
            }
            // contrastRatio >= -1 && contrastRatio <= 1 ? (contrastRatio = 1) : null;
            newArray[i] = {
                ...newArray[i], 
                ...colorRamp.results[i],
                contrastDisplay,
            }
        }
        state.colorRamp.colors = newArray;
    }    
    _handleInputChange = (e, changeType) => {
        switch (changeType) {
            case 'BULK_STATE_CHANGE':
                let obj = getParams(e.detail.value)
                if (obj) {
                    
                store.dispatch(
                    colorSpaceActions.updateColorSpace(
                        obj.colorSpace
                    )
                )
                store.dispatch(
                    colorKeyActions.addBulkColor(
                        obj.colorKeys
                    )
                )
                store.dispatch(
                    contrastRatioActions.updateRatios(
                        obj.inputRatios
                    )
                )
                store.dispatch(
                    baseColorActions.updateColor(
                        obj.baseColor
                    )
                )
                store.dispatch(
                    colorRampActions.bulkColorRamp(
                        obj.colorStops, obj.colorScheme
                    )
                )
                } else {
                    console.log('Please use the reference codes given by the plugin');
                }
                break;
            case 'KEY_COLORS':
                store.dispatch(
                    colorKeyActions.updateColor(
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
        switch (action.context) {
            case "TEST_RAMP": 
                parent.postMessage({pluginMessage: {detail: {ramp: this.state.colorRamp, refCode: this.referenceCode.toString(), type: action.context} }}, '*')
                break
            case "SET_STYLES": 
                let confirmed = confirm('⚠️\n\nSetting styles will override existing styles of the same name.\n\nContinue?');
                confirmed ? 
                parent.postMessage({pluginMessage: {detail: {ramp: this.state.colorRamp, refCode: null, type: action.context} }}, '*')
                : parent.postMessage({pluginMessage: {detail: {message: 'Canceled setting styles', type: 'POST_MESSAGE'} }}, '*')
                break
            case "COPY_REFERENCE_CODE":
                
                break
            case 'ADD_KEY_COLOR':
                store.dispatch(
                    colorKeyActions.addNewColor(
                        this.state.colorKeys[this.state.colorKeys.length - 1],
                    )
                )
                break;
            case 'BULK_KEY_COLOR':
                console.log('Execute BULK');
                break;
            case 'REMOVE_KEY_COLOR': 
                store.dispatch(
                    colorKeyActions.clearColorItem(
                        this.state.colorKeys[action.key], action.key
                    )
                )
                break;
            case 'CODE_KEY_COLORS':
                console.log('Execute CODE');
                break;
            case 'CLEAR_KEY_COLORS':
                store.dispatch(
                    colorKeyActions.clearcolorKeys('#ffffff')
                )
                break;
            case 'ADD_RATIOS':
                let stopToAdd;
                if (this.state.inputRatios[this.state.inputRatios.length - 1] == undefined) {
                    stopToAdd = 1
                } else if (this.state.inputRatios[this.state.inputRatios.length - 1] < 21) {
                    stopToAdd = this.state.inputRatios[this.state.inputRatios.length - 1] + 1  
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
                        this.state.inputRatios.length
                    )
                )
                break;
            case 'SORT_RATIOS':
                store.dispatch(
                    contrastRatioActions.updateRatios(
                        this.state.inputRatios.sort(function(a, b){return a-b})
                        )
                )
                break;
            case 'DISTRIBUTE_RATIOS':
                let sorted = this.state.inputRatios.sort(function(a, b){return a-b});
                store.dispatch(
                    contrastRatioActions.updateRatios(
                        this.state.inputRatios.sort(function(a, b){return a-b})
                        )
                )
                this._distribute()
                
                store.dispatch(
                    contrastRatioActions.updateRatios(
                        this.state.inputRatios
                        )
                )
                break;
            case 'CLEAR_RATIOS':
                store.dispatch(
                    contrastRatioActions.clearinputRatios(1)
                )
                store.dispatch(
                    colorRampActions.clearColorStops()
                )
                break;
            case 'REMOVE_RATIO':
                store.dispatch(
                    colorRampActions.clearColorStopItem(
                        this.state.colorRamp.colorStops[action.key], action.key
                    )
                )
                store.dispatch(
                    contrastRatioActions.clearStopItem(
                        this.state.inputRatios[action.key], action.key
                    )
                )
                break;
            default:
                break;
        }
    }
    
} 

customElements.define('adaptive-colors', AdaptiveColors)