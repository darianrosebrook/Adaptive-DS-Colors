import {LitElement, html, css} from 'lit';
import styles from '../styles';
import '../components/colorRampResults';
import '../components/icon';
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
            inputRatios: {type: Array},
            colorResults: {
                colorScheme: {type: String},
                colors: [
                    {
                        contrastDisplay: {type: String},
                        ratio: {type: Number},
                        color: {type: String},
                    }
                ],
                colorStops: {type: Array}
            }
        }
    }
    constructor() {
        super();
        this.inputRatios = [1.00];
        this.colorRamp = {
            colors: [{
                color: '#ffffff',
                contrastDisplay: '#000000',
                ratio: 1
            }],
            colorScheme: "Neutral",
            colorStops: ['100'],
        }
    }
    render() {
        return html`
            <section>
                
            <div><h2>Color ramp</h2></div>
                <div>
                    <input @change=${this._handleChange} type="text" placeholder="Name your color" .value=${this.colorRamp.colorScheme} />
                </div>
                <div>
                    <color-results  .inputRatios=${this.inputRatios} .colorRamp=${this.colorRamp} ></color-results>
                </div>
                <div>
                    <button-m context="TEST_RAMP" buttonText="Test Swatches"></button-m>
                    <button-m context="SET_STYLES" buttonText="Set styles"></button-m>
                </div>
            </section>`
    }
    _handleChange = (e) => {
        const event = new CustomEvent('colorThemeChange', {
            bubbles: true,
            composed: true,
            detail: {value: e.target.value, key: null}
          });
        this.dispatchEvent(event);
    }
    
} 
customElements.define('color-ramp', ColorRamp)