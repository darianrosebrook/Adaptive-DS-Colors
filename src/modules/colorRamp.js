import {LitElement, html, css} from 'lit';
import styles from '../styles'
import '../components/colorRampResults'
import '../components/tooltipTrigger'
import '../components/icon'
class ColorRamp extends LitElement{
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
                    colorStop: {type: String},
                    contrastDisplay: {type: String},
                    contrastRatio: {type: Number},
                    color: {type: String},
                }
            ]
        }
    }
    constructor() {
        super();
        this.ratios = [1.00];
        this.colorResults = [
            {
                colorStop: '100',
                contrastRatio: 1.00,
                color: '#FFFFFF',
                contrastDisplay: '#000000'
            }
        ]
    }
    render() {
        return html`
            <section>
                
            <div><h2>Color ramp</h2><tooltip-trigger></tooltip-trigger></div>
                <div>
                    <input type="text" placeholder="Color Ramp / Red" />
                </div>
                <div>
                    <color-results @colorStopChange=${this._handleChange} .ratios=${this.ratios} .colorResults=${this.colorResults} ></color-results>
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
    // _updateRampContrast = () => {
    //     for (let i = 0; i < this.colorResults.length; i++ ) {
    //         if (contrastColors.luminance(d3.rgb(this.colorResults[i].color).r, d3.rgb(this.colorResults[i].color).g, d3.rgb(this.colorResults[i].color).b) < 0.1848) {
    //             this.contrastDisplay[i] = '#ffffff'
    //           } else {
    //             this.contrastDisplay[i] = '#000000'
    //           }
    //     }
    // }
} 
customElements.define('color-ramp', ColorRamp)